import React, {useState, useEffect} from 'react'

import {getText} from '@utils/textLoader'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  onSearch: (term: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch, placeholder}) => {
  const text = getText()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={placeholder || text.search.placeholder}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>
    </div>
  )
}

export default SearchBar
