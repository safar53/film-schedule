import React, {useEffect, useState, useMemo} from 'react'
import {useAppDispatch, useAppSelector} from '@hooks/redux'

import {fetchFilms, setSearchTerm} from '@store/filmsSlice'
import SearchBar from './SearchBar'
import FilmTable from './FilmTable'
import FilmModal from './FilmModal'
import Pagination from './Pagination'
import {Film} from 'types/film'
import {getText} from '@utils/textLoader'
import styles from './Films.module.scss'

const Films: React.FC = () => {
  const dispatch = useAppDispatch()
  const {films, status, error, searchTerm} = useAppSelector(
    state => state.films
  )

  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')

  const [currentPage, setCurrentPage] = useState(1)
  const [filmsPerPage, setFilmsPerPage] = useState(10)

  const genres = useMemo(
    () => Array.from(new Set(films.map(f => f.genre))).sort(),
    [films]
  )
  const languages = useMemo(
    () => Array.from(new Set(films.map(f => f.language))).sort(),
    [films]
  )

  const filteredFilms = useMemo(() => {
    return films.filter(film => {
      const matchesLanguage = selectedLanguage
        ? film.language === selectedLanguage
        : true
      const matchesGenre = selectedGenre ? film.genre === selectedGenre : true
      return matchesLanguage && matchesGenre
    })
  }, [films, selectedLanguage, selectedGenre])

  const totalPages = Math.ceil(filteredFilms.length / filmsPerPage)
  const startIndex = (currentPage - 1) * filmsPerPage
  const endIndex = startIndex + filmsPerPage
  const currentFilms = filteredFilms.slice(startIndex, endIndex)

  const showError = Boolean(error && !searchTerm)

  const text = getText()

  useEffect(() => {
    dispatch(
      fetchFilms({
        search: searchTerm || undefined,
      })
    )
  }, [dispatch, searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedLanguage, selectedGenre, searchTerm, filmsPerPage])

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFilmsPerPageChange = (perPage: number) => {
    setFilmsPerPage(perPage)
  }

  const handleInfoClick = (film: Film) => {
    setSelectedFilm(film)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedFilm(null)
  }

  if (showError) {
    return (
      <div className={styles.errorContainer}>
        <h2>{text?.error?.title || 'Error loading films'}</h2>
        <p>{error?.toString()}</p>
        <button
          onClick={() =>
            dispatch(
              fetchFilms({
                page: currentPage,
                limit: filmsPerPage,
                search: searchTerm || undefined,
              })
            )
          }
          className={styles.retryButton}
        >
          {text?.error?.retry || 'Retry'}
        </button>
      </div>
    )
  }

  return (
    <div className={styles.filmsContainer}>
      <div className={styles.filmsHeader}>
        <h1>{text.app.title}</h1>
        <p>{text.app.subtitle}</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className={styles.filtersRow}>
        <label>
          Language:
          <select
            value={selectedLanguage}
            onChange={e => {
              setSelectedLanguage(e.target.value)
            }}
            className={styles.filterSelect}
          >
            <option value="">All</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>
        <label>
          Genre:
          <select
            value={selectedGenre}
            onChange={e => {
              setSelectedGenre(e.target.value)
            }}
            className={styles.filterSelect}
          >
            <option value="">All</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!showError && status !== 'failed' ? (
        status === 'loading' ? (
          <FilmTable
            films={currentFilms}
            onInfoClick={handleInfoClick}
            isLoading={true}
          />
        ) : (
          currentFilms.length > 0 && (
            <>
              <FilmTable
                films={currentFilms}
                onInfoClick={handleInfoClick}
                isLoading={false}
              />
              {status === 'succeeded' &&
                filteredFilms.length >= filmsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    filmsPerPage={filmsPerPage}
                    onFilmsPerPageChange={handleFilmsPerPageChange}
                  />
                )}
            </>
          )
        )
      ) : (
        <div className={styles.emptyState}>
          <p>{text.empty.text}</p>
        </div>
      )}

      <FilmModal
        film={selectedFilm}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Films
