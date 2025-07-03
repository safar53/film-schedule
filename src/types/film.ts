export interface Film {
  id: string
  title: string
  description: string
  genre: string
  language: string
  director: string
  actors: string[]
  startTime: string
  duration: number
}

export interface FilmsState {
  films: Film[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchTerm: string
  currentPage: number
  filmsPerPage: number
  totalFilms: number
}

export interface SearchParams {
  page?: number
  limit?: number
  search?: string
}
