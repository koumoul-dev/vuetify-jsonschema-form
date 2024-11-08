import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import compile from '@koumoul/vjsf-compiler'

try {
  await mkdir('./src/components/compiled')
} catch (e) {
  if (e.code !== 'EEXIST') throw e
}

for (const file of await readdir('./src/schemas')) {
  const parsedFile = path.parse(file)
  if (parsedFile.ext !== '.json') continue
  const schema = JSON.parse(await readFile('./src/schemas/' + file))
  const code = await compile(schema, {})
  await writeFile('./src/components/compiled/vjsf-' + parsedFile.name + '.vue', code)
}