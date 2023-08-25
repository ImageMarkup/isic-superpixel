// Generated file. To retain edits, remove this comment.

import {
  Image,
  InterfaceTypes,
  PipelineOutput,
  PipelineInput,
  runPipeline
} from 'itk-wasm'

import IsicSuperpixelOptions from './isic-superpixel-options.js'
import IsicSuperpixelResult from './isic-superpixel-result.js'


import { getPipelinesBaseUrl } from './pipelines-base-url.js'
import { getPipelineWorkerUrl } from './pipeline-worker-url.js'

/**
 * Superpixel algorithm for skin cancer images
 *
 * @param {Image} image - Input image
 * @param {IsicSuperpixelOptions} options - options object
 *
 * @returns {Promise<IsicSuperpixelResult>} - result object
 */
async function isicSuperpixel(
  webWorker: null | Worker,
  image: Image,
  options: IsicSuperpixelOptions = {}
) : Promise<IsicSuperpixelResult> {

  const desiredOutputs: Array<PipelineOutput> = [
    { type: InterfaceTypes.Image },
  ]

  const inputs: Array<PipelineInput> = [
    { type: InterfaceTypes.Image, data: image },
  ]

  const args = []
  // Inputs
  const imageName = '0'
  args.push(imageName as string)

  // Outputs
  const labelsName = '0'
  args.push(labelsName)

  // Options
  args.push('--memory-io')
  if (typeof options.numSegments !== "undefined") {
    args.push('--num-segments', options.numSegments.toString())

  }
  if (typeof options.segmentSize !== "undefined") {
    args.push('--segment-size', options.segmentSize.toString())

  }

  const pipelinePath = 'isic-superpixel'

  const {
    webWorker: usedWebWorker,
    returnValue,
    stderr,
    outputs
  } = await runPipeline(webWorker, pipelinePath, args, desiredOutputs, inputs, { pipelineBaseUrl: getPipelinesBaseUrl(), pipelineWorkerUrl: getPipelineWorkerUrl() })
  if (returnValue !== 0) {
    throw new Error(stderr)
  }

  const result = {
    webWorker: usedWebWorker as Worker,
    labels: outputs[0].data as Image,
  }
  return result
}

export default isicSuperpixel
