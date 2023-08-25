# itkwasm-isic-superpixel-emscripten

[![PyPI version](https://badge.fury.io/py/itkwasm-isic-superpixel-emscripten.svg)](https://badge.fury.io/py/itkwasm-isic-superpixel-emscripten)

Superpixel algorithm for skin cancer images. Emscripten implementation.

This package provides the Emscripten WebAssembly implementation. It is usually not called directly. Please use the [`itkwasm-isic-superpixel`](https://pypi.org/project/itkwasm-isic-superpixel/) instead.


## Installation

```sh
import micropip
await micropip.install('itkwasm-isic-superpixel-emscripten')
```

## Development

```sh
pip install hatch
hatch run download-pyodide
hatch run test
```
