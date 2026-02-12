import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './TableModal.module.css'

function trimEmptyTrailingColumns(rows) {
  if (!rows?.length) return rows
  const maxCols = Math.max(...rows.map((r) => r.length))
  if (maxCols <= 0) return rows
  let lastUsedCol = -1
  for (let c = 0; c < maxCols; c++) {
    const hasData = rows.some(
      (row) =>
        row[c] !== null &&
        row[c] !== undefined &&
        String(row[c]).trim() !== ''
    )
    if (hasData) lastUsedCol = c
  }
  const colCount = lastUsedCol + 1
  if (colCount >= maxCols) return rows
  return rows.map((row) => row.slice(0, colCount))
}

export default function TableModal({ title, rows, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (title != null) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [title, onClose])

  if (title == null) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const trimmed = trimEmptyTrailingColumns(rows)
  const headerRow = trimmed[0] || []
  const bodyRows = trimmed.slice(1)

  const isRowEmpty = (row) =>
    !row?.length ||
    !row.some(
      (cell) =>
        cell !== null &&
        cell !== undefined &&
        String(cell).trim() !== ''
    )

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {headerRow.map((cell, i) => (
                  <th key={i}>{String(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr
                  key={ri}
                  className={isRowEmpty(row) ? styles.rowEmpty : undefined}
                >
                  {headerRow.map((_, ci) => (
                    <td key={ci}>{String(row[ci] ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  )
}
