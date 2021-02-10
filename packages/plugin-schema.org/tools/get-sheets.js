const fs = require('fs').promises
const path = require('path')
const { util } = require('@citation-js/core')

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

async function main (id, sheets) {
  return Promise.all(sheets.map(async sheet => fs.writeFile(
    path.join(__dirname, 'sheets', sheet + '.json'),
    JSON.stringify(await getSheet(id, sheet))
  )))
}

main(
  '1tE726M3hE2lbg41J0WvGAfW9TbU5wcPDVEbyYRcrGF0',
  [
    'Types',
    'Variables'
  ]
).catch(console.error)
