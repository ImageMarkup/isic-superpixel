// Generated file. To retain edits, remove this comment.

import * as isicSuperpixel from '../../../dist/bundles/isic-superpixel.js'

// Use local, vendored WebAssembly module assets
const pipelinesBaseUrl: string | URL = new URL('/pipelines', document.location.origin).href
isicSuperpixel.setPipelinesBaseUrl(pipelinesBaseUrl)
const pipelineWorkerUrl: string | URL | null = new URL('/web-workers/pipeline.worker.js', document.location.origin).href
isicSuperpixel.setPipelineWorkerUrl(pipelineWorkerUrl)

import './isic-superpixel-controller.js'
