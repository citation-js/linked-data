const fs = require('fs').promises
const path = require('path')
const { util } = require('@citation-js/core')

async function main () {
  const data = require('./sheets/Types.json')
  const output = {
    toTarget: {},
    toSource: {}
  }
  const types = new Set()

  for (const mapping of data) {
    const csl = mapping.CSL

    // Skip CSL 1.0.2 for now
    if (csl === 'classic') {
      break
    }

    const input = mapping['accept as input'].split(', ').concat(mapping['schema.org'])
    const outputType = mapping['prefer output']

    for (const type of input.concat(outputType)) {
      if (type) {
        types.add(type)
      }
    }

    if (mapping.peripheral) { continue }

    for (const type of input) {
      if (type) {
        output.toTarget[type] = csl
      }
    }

    if (outputType) {
      output.toSource[csl] = outputType
    }
  }

  await fs.writeFile(
    path.join(__dirname, '..', 'src', 'types.json'),
    JSON.stringify(output, null, 2)
  )

  await fs.writeFile(
    path.join(__dirname, 'types.json'),
    JSON.stringify(Array.from(types))
  )
}

main().catch(console.error)
