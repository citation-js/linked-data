const fs = require('fs').promises
const path = require('path')
const { util } = require('@citation-js/core')

const types = new Set(require('./types'))
const properties = new Set()

function groupMappings (mappings) {
  const groups = {}

  for (const mapping of mappings) {
    if (!mapping['schema.org']) {
      continue
    }

    if (mapping.CSL in groups) {
      groups[mapping.CSL].push(mapping)
    } else {
      groups[mapping.CSL] = [mapping]
    }

    if (mapping.subject) {
      for (const type of mapping.subject.split(', ')) {
        types.add(type)
      }
    }
    if (mapping.object) {
      for (const type of mapping.object.split(', ')) {
        types.add(type)
      }
    }

    for (const property of mapping['schema.org'].split(/(?:, | \/ )/)) {
      properties.add(property.replace(/^\^/, ''))
    }
  }

  return groups
}

const typeMap = Object.entries(require('../src/types.json').toSource)
function makeWhen (schemaTypes) {
  schemaTypes = schemaTypes.filter(type => type !== 'Thing' && type !== 'CreativeWork')
  const schemaTypeSet = new Set(schemaTypes)
  const cslTypes = typeMap
    .filter(([csl, schema]) => schemaTypeSet.has(schema))
    .map(([csl]) => csl)
    .filter((csl, index, list) => list.indexOf(csl) === index)

  return {
    source: { '@type': schemaTypes },
    target: { type: cslTypes }
  }
}

function serializeArray (array) {
  if (array.length > 1) {
    return `['${array.join('\', \'')}']`
  } else if (array.length > 0) {
    return `'${array[0]}'`
  } else {
    return 'undefined'
  }
}

function serializeObject (object, indentation = 0) {
  const lines = ['{']

  for (const prop in object) {
    const value = serializeValue(object[prop], indentation + 1)

    if (value === 'undefined') { continue }

    if (!/^[A-Za-z_]+$/.test(prop)) {
      lines.push(`  '${prop}': ${value},`)
    } else {
      lines.push(`  ${prop}: ${value},`)
    }
  }

  if (lines.length === 1) { return 'undefined' }

  lines.push(lines.pop().slice(0, -1))

  return lines
    .concat('}')
    .map((line, i) => i ? '  '.repeat(indentation) + line : line)
    .join('\n')
}

function serializeValue (value, indentation) {
  if (value instanceof Code) {
    return value.toString()
  } else if (Array.isArray(value)) {
    return serializeArray(value)
  } else if (typeof value === 'object') {
    return serializeObject(value, indentation)
  } else if (typeof value === 'string') {
    return `'${value}'`
  } else {
    return value + ''
  }
}

class Code {
  constructor (code) {
    this.code = code
  }

  toString () {
    return this.code
  }
}

function serializeMapping (mapping) {
  return '  ' + serializeObject(
    {
      source: mapping.source,
      target: mapping.target,
      when: mapping.when,
      convert: mapping.convert && new Code('Converters.' + mapping.convert)
    },
    1
  ) + ','
}

async function main () {
  const data = require('./sheets/Variables.json')
  const csl = groupMappings(data)

  const converters = {}
  const converterTargets = {}
  const mappings = []

  for (const group in csl) {
    const [name, part] = group.split('-')

    const had = []
    const groupMappings = []
    for (const mapping of csl[group]) {
      const source = mapping['schema.org'].split(', ')
      const when = makeWhen(mapping.subject.split(', '))
      for (const h of had) {
        when.source[h] = false
        when.target = false
      }

      had.push(...source)
      groupMappings.push({ source, target: [mapping.CSL], when })
    }

    if (part === '*' || (part && groupMappings[0].source[0].startsWith('* / '))) {
      const target = converterTargets[name] || (converterTargets[name] = [])
      const convert = converters[name.toUpperCase()] || (converters[name.toUpperCase()] = [])

      if (part === '*') {
        for (const mapping of groupMappings) {
          mapping.target = target
          mapping.convert = name.toUpperCase()
          mappings.push(mapping)
        }
      } else {
        target.push(group)
        convert.push(...groupMappings)
      }
    } else {
      mappings.push(...groupMappings)
    }
  }

  const serializedMappings = mappings.map(serializeMapping)
  serializedMappings.push(serializedMappings.pop().slice(0, -1))

  await fs.writeFile(
    path.join(__dirname, 'mapping.js'),
    `export default [
${serializedMappings.join('\n')}
]`
  )
  await fs.writeFile(
    path.join(__dirname, 'types.json'),
    JSON.stringify(Array.from(types))
  )
  await fs.writeFile(
    path.join(__dirname, 'properties.json'),
    JSON.stringify(Array.from(properties))
  )
}

main().catch(console.error)
