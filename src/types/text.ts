export interface AppText {
  app: {
    title: string
    subtitle: string
  }
  error: {
    title: string
    retry: string
  }
  loading: {
    text: string
  }
  empty: {
    text: string
  }
  table: {
    headers: {
      title: string
      genre: string
      startTime: string
      duration: string
      actions: string
    }
    actions: {
      viewDetails: string
    }
  }
  modal: {
    details: {
      genre: string
      startTime: string
      duration: string
      director: string
      language: string
      actors: string
      description: string
    }
  }
  search: {
    placeholder: string
  }
  pagination: {
    filmsPerPage: string
    previous: string
    next: string
    options: {
      '5': string
      '10': string
      '20': string
      '50': string
    }
  }
}
