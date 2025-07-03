import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {SearchParams, Film} from 'types/film'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async (params: SearchParams = {}, {rejectWithValue}) => {
    try {
      const queryParams = new URLSearchParams()
      if (params.search) queryParams.append('search', params.search)
      const response = await axios.get(
        `${API_BASE_URL}?${queryParams.toString()}`
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

interface FilmsSliceState {
  films: Film[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchTerm: string
}

const initialState: FilmsSliceState = {
  films: [],
  status: 'idle',
  error: null,
  searchTerm: '',
}

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilms.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.films = action.payload
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const {setSearchTerm} = filmsSlice.actions
export default filmsSlice.reducer
