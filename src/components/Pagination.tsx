import React from 'react'

import {getText} from '@utils/textLoader'
import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  filmsPerPage: number
  onFilmsPerPageChange: (perPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  filmsPerPage,
  onFilmsPerPageChange,
}) => {
  const text = getText()

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        <span>{text.pagination.filmsPerPage}</span>
        <select
          value={filmsPerPage}
          onChange={e => onFilmsPerPageChange(Number(e.target.value))}
          className={styles.filmsPerPageSelect}
        >
          <option value={5}>{text.pagination.options['5']}</option>
          <option value={10}>{text.pagination.options['10']}</option>
          <option value={20}>{text.pagination.options['20']}</option>
          <option value={50}>{text.pagination.options['50']}</option>
        </select>
      </div>

      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {text.pagination.previous}
        </button>

        <div className={styles.pageNumbers}>
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className={styles.pageEllipsis}>...</span>
              ) : (
                <button
                  className={`${styles.pageButton} ${
                    currentPage === page ? styles.active : ''
                  }`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {text.pagination.next}
        </button>
      </div>
    </div>
  )
}

export default Pagination
