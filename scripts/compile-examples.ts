import path from 'path'
import { mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs'
import ejs from 'ejs'
import { compile } from '../src/compile'
import examples from '../doc/examples'

const compBaseDir = path.join(__dirname, '../doc/components/compiled')
rmSync(compBaseDir, { recursive: true, force: true })
mkdirSync(compBaseDir)

const pageBaseDir = path.join(__dirname, '../doc/pages/compiled')
rmSync(pageBaseDir, { recursive: true, force: true })
mkdirSync(pageBaseDir)
const pageTemplate = readFileSync(path.join(__dirname, 'compiled-example-page.vue.ejs'), 'utf8')

for (const exampleSuite of examples) {
  mkdirSync(path.join(compBaseDir, exampleSuite.id))
  mkdirSync(path.join(pageBaseDir, exampleSuite.id))
  for (const example of exampleSuite.examples) {
    const compCode = compile(example.schema, '~/../src/components')
    writeFileSync(path.join(compBaseDir, exampleSuite.id, example.id + '.vue'), compCode)

    const pageCode = ejs.render(pageTemplate, { exampleSuite, example })
    writeFileSync(path.join(pageBaseDir, exampleSuite.id, example.id + '.vue'), pageCode)
  }
}
