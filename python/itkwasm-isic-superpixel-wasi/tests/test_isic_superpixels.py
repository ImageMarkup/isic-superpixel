from pathlib import Path
from dataclasses import asdict

import pytest

from itkwasm_compare_images import compare_images
from itkwasm import Image
import itk

from itkwasm_isic_superpixel_wasi import isic_superpixel

def test_isic_superpixels():

    input_filename = 'ISIC_0016082.JPG'
    input_filepath = Path(__file__).parent.parent.parent.parent / 'test' / 'data' / 'input' / input_filename
    input_image = itk.imread(input_filepath)

    input_image_dict = itk.dict_from_image(input_image)
    input_image = Image(**input_image_dict)

    labels = isic_superpixel(input_image)

    output_dir = Path(__file__).parent.parent.parent.parent  / 'test' / 'data' / 'output'
    output_dir.mkdir(parents=True, exist_ok=True)
    output_filename = output_dir / input_filename.replace('.JPG', '_superpixels.png')

    labels = itk.image_from_dict(asdict(labels))
    itk.imwrite(labels, output_filename)

    expected_filename = Path(__file__).parent.parent.parent.parent / 'test' / 'data' / 'baseline' / input_filename.replace('.JPG', '_superpixels.png')
    expected = itk.imread(expected_filename)
    expected_dict = itk.dict_from_image(expected)
    expected = Image(**expected_dict)
    labels_dict = itk.dict_from_image(labels)
    labels = Image(**labels_dict)

    metrics, diff, diffuchar = compare_images(labels, baseline_images=[expected,])
    assert metrics['almostEqual']