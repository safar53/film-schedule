import React from 'react'
import moment from 'moment'

import {Film} from 'types/film'
import {getText} from '@utils/textLoader'
import styles from './FilmModal.module.scss'

interface FilmModalProps {
  film: Film | null
  isOpen: boolean
  onClose: () => void
}

const FilmModal: React.FC<FilmModalProps> = ({film, isOpen, onClose}) => {
  const text = getText()

  if (!isOpen || !film) return null

  const formatTime = (timeString: string) => {
    return moment(timeString).format('LLL')
  }

  const formatDuration = (minutes: number) => {
    return moment
      .utc(moment.duration(minutes, 'minutes').asMilliseconds())
      .format('HH:mm')
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{film.title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.filmDetails}>
            <div className={styles.detailRow}>
              <strong>{text.modal.details.genre}</strong> {film.genre}
            </div>

            <div className={styles.detailRow}>
              <strong>{text.modal.details.startTime}</strong>{' '}
              {formatTime(film.startTime)}
            </div>

            <div className={styles.detailRow}>
              <strong>{text.modal.details.duration}</strong>{' '}
              {formatDuration(film.duration)}
            </div>

            <div className={styles.detailRow}>
              <strong>{text.modal.details.director}</strong> {film.director}
            </div>

            <div className={styles.detailRow}>
              <strong>{text.modal.details.language}</strong> {film.language}
            </div>

            <div className={styles.detailRow}>
              <strong>{text.modal.details.actors}</strong>{' '}
              {film.actors.join(', ')}
            </div>

            <div className={`${styles.detailRow} ${styles.description}`}>
              <strong>{text.modal.details.description}</strong>
              <p>{film.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilmModal
