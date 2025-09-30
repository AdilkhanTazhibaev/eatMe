import glob from 'fast-glob'
import fs from 'node:fs/promises'

const files = await glob('src/api/generated/**/*.ts')

await Promise.all(
  files.map(async (file) => {
    const txt = await fs.readFile(file, 'utf8')
    if (txt.startsWith('// @ts-nocheck')) return
    await fs.writeFile(file, `// @ts-nocheck\n${txt}`)
  }),
)

console.log(`🔧  patched ${files.length} generated files`)
