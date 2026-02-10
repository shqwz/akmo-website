import raw from './xlsxData.json'

function filterEmptyRows(rows) {
  return rows.filter((row) =>
    row.some((cell) => cell !== null && cell !== undefined && String(cell).trim() !== '')
  )
}

/** Спецификация: только 2 столбца (название, параметры), без пустых в конце */
function trimSpecificationRows(rows) {
  return filterEmptyRows(rows).map((row) => row.slice(0, 2))
}

export const defectsRows = filterEmptyRows(raw.defects || [])
export const specificationRows = trimSpecificationRows(raw.specification ?? [])
