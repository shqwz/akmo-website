import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const publicDir = path.join(__dirname, '..', 'public', 'products')
const outDir = path.join(__dirname, '..', 'src', 'shared', 'data')

function readSheet(filePath) {
  const wb = XLSX.readFile(filePath)
  const firstSheet = wb.SheetNames[0]
  const ws = wb.Sheets[firstSheet]
  return XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
}

const defectsPath = path.join(publicDir, 'виды дефектов.xlsx')
const specPath = path.join(publicDir, 'спецификация.xlsx')

let defectsRows = []
let specRows = []

try {
  defectsRows = readSheet(defectsPath)
} catch (e) {
  console.error('Defects file:', e.message)
}

try {
  specRows = readSheet(specPath)
} catch (e) {
  console.error('Spec file:', e.message)
}

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, 'xlsxData.json'),
  JSON.stringify({ defects: defectsRows, specification: specRows }, null, 2),
  'utf8'
)
console.log('Written xlsxData.json')
