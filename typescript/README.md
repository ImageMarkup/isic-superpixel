# @itk-wasm/isic-superpixel

[![npm version](https://badge.fury.io/js/@itk-wasm%2Fisic-superpixel.svg)](https://www.npmjs.com/package/@itk-wasm/isic-superpixel)

> Superpixel algorithm for skin cancer images.

## Installation

```sh
npm install @itk-wasm/isic-superpixel
```

## Usage

### Browser interface

Import:

```js
import {
  isicSuperpixel,
  setPipelinesBaseUrl,
  getPipelinesBaseUrl,
  setPipelineWorkerUrl,
  getPipelineWorkerUrl,
} from "@itk-wasm/isic-superpixel"
```

#### isicSuperpixel

*Encode an ITK Image into a High Throughput JPEG2000 codestream*

```ts
async function isicSuperpixel(
  webWorker: null | Worker,
  image: Image,
  options: IsicSuperpixelOptions = {}
) : Promise<IsicSuperpixelResult>
```

| Parameter |   Type  | Description |
| :-------: | :-----: | :---------- |
|  `image`  | *Image* | Input image |

**`IsicSuperpixelOptions` interface:**

|    Property   |    Type   | Description                                                    |
| :-----------: | :-------: | :------------------------------------------------------------- |
| `numSegments` |  *number* | Optional number of segments. Defines segment size if provided. |
| `segmentSize` | *boolean* | Segment size.                                                  |

**`IsicSuperpixelResult` interface:**

|    Property   |   Type   | Description                    |
| :-----------: | :------: | :----------------------------- |
| **webWorker** | *Worker* | WebWorker used for computation |
|    `labels`   |  *Image* | Output label image             |

#### setPipelinesBaseUrl

*Set base URL for WebAssembly assets when vendored.*

```ts
function setPipelinesBaseUrl(
  baseUrl: string | URL
) : void
```

#### getPipelinesBaseUrl

*Get base URL for WebAssembly assets when vendored.*

```ts
function getPipelinesBaseUrl() : string | URL
```

#### setPipelineWorkerUrl

*Set base URL for the itk-wasm pipeline worker script when vendored.*

```ts
function setPipelineWorkerUrl(
  baseUrl: string | URL
) : void
```

#### getPipelineWorkerUrl

*Get base URL for the itk-wasm pipeline worker script when vendored.*

```ts
function getPipelineWorkerUrl() : string | URL
```

### Node interface

Import:

```js
import {
  isicSuperpixelNode,
  setPipelinesBaseUrl,
  getPipelinesBaseUrl,
  setPipelineWorkerUrl,
  getPipelineWorkerUrl,
} from "@itk-wasm/isic-superpixel"
```

#### isicSuperpixelNode

*Encode an ITK Image into a High Throughput JPEG2000 codestream*

```ts
async function isicSuperpixelNode(
  image: Image,
  options: IsicSuperpixelOptions = {}
) : Promise<IsicSuperpixelNodeResult>
```

| Parameter |   Type  | Description |
| :-------: | :-----: | :---------- |
|  `image`  | *Image* | Input image |

**`IsicSuperpixelNodeOptions` interface:**

|    Property   |    Type   | Description                                                    |
| :-----------: | :-------: | :------------------------------------------------------------- |
| `numSegments` |  *number* | Optional number of segments. Defines segment size if provided. |
| `segmentSize` | *boolean* | Segment size.                                                  |

**`IsicSuperpixelNodeResult` interface:**

| Property |   Type  | Description        |
| :------: | :-----: | :----------------- |
| `labels` | *Image* | Output label image |
