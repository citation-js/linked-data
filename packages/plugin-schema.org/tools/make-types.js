const fs = require('fs').promises
const path = require('path')
const { util } = require('@citation-js/core')

const spreadsheet = '1tE726M3hE2lbg41J0WvGAfW9TbU5wcPDVEbyYRcrGF0'
const sheet = 'Types'

function zip (a, b) {
  return a.map((a, i) => [a, b[i]])
}

async function getSheet (id, sheet) {
  const csv = await util.fetchFileAsync(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${sheet}`)
  const rows = csv
    .trim()
    .split('\n')
    .map(line => line
      .match(/(?<=^|,)("[^"]*"|[^",]+)?(?=,|$)/g)
      .map(value => value.replace(/^"|"$/g, ''))
    )
  const header = rows.shift().filter(Boolean)

  return rows.reduce((a, b) => a.concat(Object.fromEntries(zip(header, b))), [])
}

async function main () {
  const data = await getSheet(spreadsheet, sheet)
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
