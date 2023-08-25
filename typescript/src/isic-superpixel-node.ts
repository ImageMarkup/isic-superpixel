// Generated file. To retain edits, remove this comment.

import {
  Image,
  InterfaceTypes,
  PipelineOutput,
  PipelineInput,
  runPipelineNode
} from 'itk-wasm'

import IsicSuperpixelOptions from './isic-superpixel-options.js'
import IsicSuperpixelNodeResult from './isic-superpixel-node-result.js'


import path from 'path'

/**
 * Superpixel algorithm for skin cancer images
 *
 * @param {Image} image - Input image
 * @param {IsicSuperpixelOptions} options - options object
 *
 * @returns {Promise<IsicSuperpixelNodeResult>} - result object
 */
async function isicSuperpixelNode(
  image: Image,
  options: IsicSuperpixelOptions = {}
) : Promise<IsicSuperpixelNodeResult> {

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

  const pipelinePath = path.join(path.dirname(import.meta.url.substring(7)), '..', 'pipelines', 'isic-superpixel')

  const {
    returnValue,
    stderr,
    outputs
  } = await runPipelineNode(pipelinePath, args, desiredOutputs, inputs)
  if (returnValue !== 0) {
    throw new Error(stderr)
  }

  const result = {
    labels: outputs[0].data as Image,
  }
  return result
}

export default isicSuperpixelNode
