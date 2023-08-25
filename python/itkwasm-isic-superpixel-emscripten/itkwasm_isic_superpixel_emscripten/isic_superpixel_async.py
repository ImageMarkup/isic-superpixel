# Generated file. To retain edits, remove this comment.

# Generated file. Do not edit.

from pathlib import Path
import os
from typing import Dict, Tuple, Optional, List, Any

from .js_package import js_package

from itkwasm.pyodide import (
    to_js,
    to_py,
    js_resources
)
from itkwasm import (
    InterfaceTypes,
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
    js_module = await js_package.js_module
    web_worker = js_resources.web_worker

    kwargs = {}
    if num_segments:
        kwargs["numSegments"] = to_js(num_segments)
    if segment_size:
        kwargs["segmentSize"] = to_js(segment_size)

    outputs = await js_module.isicSuperpixel(web_worker, to_js(image), **kwargs)

    output_web_worker = None
    output_list = []
    outputs_object_map = outputs.as_object_map()
    for output_name in outputs.object_keys():
        if output_name == 'webWorker':
            output_web_worker = outputs_object_map[output_name]
        else:
            output_list.append(to_py(outputs_object_map[output_name]))

    js_resources.web_worker = output_web_worker

    if len(output_list) == 1:
        return output_list[0]
    return tuple(output_list)
