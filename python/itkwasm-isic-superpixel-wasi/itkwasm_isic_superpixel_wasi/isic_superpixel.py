# Generated file. To retain edits, remove this comment.

# Generated file. Do not edit.

from pathlib import Path, PurePosixPath
import os
from typing import Dict, Tuple, Optional, List, Any

from importlib_resources import files as file_resources

_pipeline = None

from itkwasm import (
    InterfaceTypes,
    PipelineOutput,
    PipelineInput,
    Pipeline,
    Image,
)

def isic_superpixel(
    image: Image,
    num_segments: int = 1000,
    segment_size: int = 0,
) -> Image:
    """Superpixel algorithm for skin cancer images

    :param image: Input image
    :type  image: Image

    :param num_segments: Optional number of segments. Defines segment size if provided.
    :type  num_segments: int

    :param segment_size: Segment size.
    :type  segment_size: int

    :return: Output label image
    :rtype:  Image
    """
    global _pipeline
    if _pipeline is None:
        _pipeline = Pipeline(file_resources('itkwasm_isic_superpixel_wasi').joinpath(Path('wasm_modules') / Path('isic-superpixel.wasi.wasm')))

    pipeline_outputs: List[PipelineOutput] = [
        PipelineOutput(InterfaceTypes.Image),
    ]

    pipeline_inputs: List[PipelineInput] = [
        PipelineInput(InterfaceTypes.Image, image),
    ]

    args: List[str] = ['--memory-io',]
    # Inputs
    args.append('0')
    # Outputs
    args.append('0')
    # Options
    if num_segments:
        args.append('--num-segments')
        args.append(str(num_segments))

    if segment_size:
        args.append('--segment-size')
        args.append(str(segment_size))


    outputs = _pipeline.run(args, pipeline_outputs, pipeline_inputs)

    result = outputs[0].data
    return result

