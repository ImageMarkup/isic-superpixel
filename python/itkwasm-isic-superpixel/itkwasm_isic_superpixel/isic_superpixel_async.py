# Generated file. Do not edit.

import os
from typing import Dict, Tuple, Optional, List, Any

from itkwasm import (
    environment_dispatch,
    Image,
)

async def isic_superpixel_async(
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
    func = environment_dispatch("itkwasm_isic_superpixel", "isic_superpixel_async")
    output = await func(image, num_segments=num_segments, segment_size=segment_size)
    return output
