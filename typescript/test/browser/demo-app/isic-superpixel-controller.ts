// Generated file. To retain edits, remove this comment.

import { readImageFile, copyImage } from 'itk-wasm'
import { writeImageArrayBuffer, copyImage } from 'itk-wasm'
import * as isicSuperpixel from '../../../dist/bundles/isic-superpixel.js'
import isicSuperpixelLoadSampleInputs from "./isic-superpixel-load-sample-inputs.js"

class IsicSuperpixelModel {

  inputs: Map<string, any>
  options: Map<string, any>
  outputs: Map<string, any>

  constructor() {
    this.inputs = new Map()
    this.options = new Map()
    this.outputs = new Map()
    }
  }


class IsicSuperpixelController  {

  constructor(loadSampleInputs) {
    this.loadSampleInputs = loadSampleInputs

    this.model = new IsicSuperpixelModel()
    const model = this.model

    this.webWorker = null

    if (loadSampleInputs) {
      const loadSampleInputsButton = document.querySelector("#isicSuperpixelInputs [name=loadSampleInputs]")
      loadSampleInputsButton.setAttribute('style', 'display: block-inline;')
      loadSampleInputsButton.addEventListener('click', async (event) => {
        loadSampleInputsButton.loading = true
        await loadSampleInputs(model)
        loadSampleInputsButton.loading = false
      })
    }

    // ----------------------------------------------
    // Inputs
    const imageElement = document.querySelector('#isicSuperpixelInputs input[name=image-file]')
    imageElement.addEventListener('change', async (event) => {
        const dataTransfer = event.dataTransfer
        const files = event.target.files || dataTransfer.files

        const { image, webWorker } = await readImageFile(null, files[0])
        webWorker.terminate()
        model.inputs.set("image", image)
        const details = document.getElementById("isicSuperpixel-image-details")
        details.innerHTML = `<pre>${globalThis.escapeHtml(JSON.stringify(image, globalThis.interfaceTypeJsonReplacer, 2))}</pre>`
        details.disabled = false
    })

    // ----------------------------------------------
    // Options
    const numSegmentsElement = document.querySelector('#isicSuperpixelInputs sl-input[name=num-segments]')
    numSegmentsElement.addEventListener('sl-change', (event) => {
        model.options.set("numSegments", parseInt(numSegmentsElement.value))
    })

    const segmentSizeElement = document.querySelector('#isicSuperpixelInputs sl-input[name=segment-size]')
    segmentSizeElement.addEventListener('sl-change', (event) => {
        model.options.set("segmentSize", parseInt(segmentSizeElement.value))
    })

    // ----------------------------------------------
    // Outputs
    const labelsOutputDownload = document.querySelector('#isicSuperpixelOutputs sl-button[name=labels-download]')
    labelsOutputDownload.addEventListener('click', async (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (model.outputs.has("labels")) {
            const labelsDownloadFormat = document.getElementById('labels-output-format')
            const downloadFormat = labelsDownloadFormat.value || 'nrrd'
            const fileName = `labels.${downloadFormat}`
            const { webWorker, arrayBuffer } = await writeImageArrayBuffer(null, copyImage(model.outputs.get("labels")), fileName)

            webWorker.terminate()
            globalThis.downloadFile(arrayBuffer, fileName)
        }
    })

    const runButton = document.querySelector('#isicSuperpixelInputs sl-button[name="run"]')
    runButton.addEventListener('click', async (event) => {
      event.preventDefault()

      if(!model.inputs.has('image')) {
        globalThis.notify("Required input not provided", "image", "danger", "exclamation-octagon")
        return
      }


      try {
        runButton.loading = true
        const t0 = performance.now()

        const { webWorker, labels, } = await isicSuperpixel.isicSuperpixel(this.webWorker,
          copyImage(model.inputs.get('image')),
          Object.fromEntries(model.options.entries())
        )

        const t1 = performance.now()
        globalThis.notify("isicSuperpixel successfully completed", `in ${t1 - t0} milliseconds.`, "success", "rocket-fill")
        this.webWorker = webWorker

        model.outputs.set("labels", labels)
        labelsOutputDownload.variant = "success"
        labelsOutputDownload.disabled = false
        const labelsDetails = document.getElementById("isicSuperpixel-labels-details")
        labelsDetails.innerHTML = `<pre>${globalThis.escapeHtml(JSON.stringify(labels, globalThis.interfaceTypeJsonReplacer, 2))}</pre>`
        labelsDetails.disabled = false
        const labelsOutput = document.getElementById('isicSuperpixel-labels-details')
      } catch (error) {
        globalThis.notify("Error while running pipeline", error.toString(), "danger", "exclamation-octagon")
        throw error
      } finally {
        runButton.loading = false
      }
    })
  }
}

const isicSuperpixelController = new IsicSuperpixelController(isicSuperpixelLoadSampleInputs)
