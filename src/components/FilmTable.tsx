import React from 'react'
import moment from 'moment'

import {Film} from 'types/film'
import {getText} from '@utils/textLoader'
import styles from './FilmTable.module.scss'

interface FilmTableProps {
  films: Film[]
  onInfoClick: (film: Film) => void
  isLoading: boolean
}

const FilmTable: React.FC<FilmTableProps> = ({
  films,
  onInfoClick,
  isLoading,
}) => {
  const text = getText()

  const formatTime = (timeString: string) => {
    return moment(timeString).format('HH:mm')
  }

  const formatDuration = (minutes: number) => {
    return moment
      .utc(moment.duration(minutes, 'minutes').asMilliseconds())
      .format('HH:mm')
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>{text.loading.text}</p>
      </div>
    )
  }

  if (films.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>{text.empty.text}</p>
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.filmTable}>
        <thead>
          <tr>
            <th>{text.table.headers.title}</th>
            <th>{text.table.headers.genre}</th>
            <th>{text.table.headers.startTime}</th>
            <th>{text.table.headers.duration}</th>
            <th>{text.table.headers.actions}</th>
          </tr>
        </thead>
        <tbody>
          {films.map(film => (
            <tr key={film.id}>
              <td>{film.title}</td>
              <td>{film.genre}</td>
              <td>{formatTime(film.startTime)}</td>
              <td>{formatDuration(film.duration)}</td>
              <td>
                <button
                  className={styles.infoButton}
                  onClick={() => onInfoClick(film)}
                  title={text.table.actions.viewDetails}
                >
                  ℹ️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FilmTable
