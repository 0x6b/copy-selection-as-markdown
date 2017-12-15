const {clippy: {path}} = require('octicons')
const {writeFileSync}  = require('fs')
const {resolve}        = require('path')
const {parseString}    = require('xml2js')

const colors = {default: '#222222', highlight: '#45a1ff'}

const createIcon = (path, color) => {
  return new Promise((resolve, reject) => {
    parseString(path, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(`<svg version="1.1" width="16" height="16" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><path fill="${color}" d="${result.path.$.d}"/></svg>`)
    })
  })
}

['default', 'highlight'].forEach(async (type) => {
  const data     = await createIcon(path, colors[type])
  const filename = resolve(__dirname, `${type}.svg`)
  writeFileSync(filename, data)
  console.log(`Generate ${type} icon at ${filename}`)
})
