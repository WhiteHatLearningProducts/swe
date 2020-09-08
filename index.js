const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const doc = require('rehype-document')
const format = require('rehype-format')
const html = require('rehype-stringify')
const report = require('vfile-reporter')
const fs = require('fs')
const path = require('path')
const tree = require('./lib/main')

unified()
  .use(markdown)
  .use(remark2rehype)
  .use(doc, {title: 'SWE L4 Overview'})
  .use(format)
  .use(html)
  .process('# SWE L4 Overview', async function (err, file) {
    fs.writeFile(path.join(__dirname, 'docs', 'index.html'), String(file), () => {
      console.error(report(err || file))
    })
  })

tree()