# itkwasm-isic-superpixel-wasi

[![PyPI version](https://badge.fury.io/py/itkwasm-isic-superpixel-wasi.svg)](https://badge.fury.io/py/itkwasm-isic-superpixel-wasi)

Superpixel algorithm for skin cancer images. WASI implementation.

This package provides the WASI WebAssembly implementation. It is usually not called directly. Please use [`itkwasm-isic-superpixel`](https://pypi.org/project/itkwasm-isic-superpixel/) instead.


## Installation

```sh
pip install itkwasm-isic-superpixel-wasi
```

## Development

```sh
pip install pytest itkwasm-compare-images itk-io
pip install -e .
pytest

# or
pip install hatch
hatch run test
```
