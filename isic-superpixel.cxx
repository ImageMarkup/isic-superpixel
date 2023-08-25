/*=========================================================================
 *
 *  Copyright NumFOCUS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         https://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *=========================================================================*/
#include "itkPipeline.h"
#include "itkInputImage.h"
#include "itkOutputImage.h"
#include "itkImage.h"
#include "itkRGBAPixel.h"
#include "itkVector.h"
#include "itkVectorImage.h"
#include "itkSupportInputImageTypes.h"
#include "itkSLICImageFilter.h"

#include <cmath>

template<typename TImage>
class PipelineFunctor
{
public:
  int operator()(itk::wasm::Pipeline & pipeline)
  {
    using ImageType = TImage;

    constexpr unsigned int Dimension = ImageType::ImageDimension;

    using InputImageType = itk::wasm::InputImage<ImageType>;
    InputImageType inputImage;
    pipeline.add_option("image", inputImage, "Input image")->type_name("INPUT_IMAGE")->required();

    size_t numSegments = 1000;
    pipeline.add_option("-n,--num-segments", numSegments, "Optional number of segments. Defines segment size if provided.");

    size_t segmentSize = 0;
    pipeline.add_option("-s,--segment-size", segmentSize, "Segment size.");

    using LabelImageType = itk::Image<uint16_t, Dimension>;

    using OutputImageType = itk::wasm::OutputImage<LabelImageType>;
    OutputImageType outputImage;
    pipeline.add_option("labels", outputImage, "Output label image")->type_name("OUTPUT_IMAGE")->required();

    ITK_WASM_PARSE(pipeline);

    typename ImageType::ConstPointer image = inputImage.Get();

    auto slicFilter = itk::SLICImageFilter<ImageType, LabelImageType>::New();
    slicFilter->SetInput(image);

    if (numSegments > 0)
    {
      const size_t sizeTotal = image->GetLargestPossibleRegion().GetNumberOfPixels();
      segmentSize = static_cast<size_t>(std::sqrt(static_cast<double>(sizeTotal) / static_cast<double>(numSegments)));
    }

    slicFilter->SetSuperGridSize(segmentSize);

    slicFilter->SetMaximumNumberOfIterations(20);
    slicFilter->SetInitializationPerturbation(true);
    slicFilter->SetSpatialProximityWeight(50.0);
    slicFilter->SetEnforceConnectivity(true);

    ITK_WASM_CATCH_EXCEPTION(pipeline, slicFilter->Update());

    typename LabelImageType::ConstPointer labelImage = slicFilter->GetOutput();
    outputImage.Set(labelImage);

    return EXIT_SUCCESS;
  }
};

int main( int argc, char * argv[] )
{
  itk::wasm::Pipeline pipeline("isic-superpixel", "Superpixel algorithm for skin cancer images", argc, argv);

  return itk::wasm::SupportInputImageTypes<PipelineFunctor,
    uint8_t,
    itk::VariableLengthVector<uint8_t>,
    itk::RGBPixel<uint8_t>,
    itk::RGBAPixel<uint8_t>,
    uint16_t,
    int16_t>::Dimensions<2U>("image", pipeline);
}
