# Cinema Salon Film Schedule

A modern web interface for managing cinema salon film schedules built with React, Redux Toolkit, and TypeScript.

## Features

- **Film Display**: View films in a clean, responsive table format
- **Search & Filter**: Search films by title with debounced input
- **Pagination**: Navigate through film listings with configurable page sizes
- **Detailed View**: Click info icons to view comprehensive film details in a modal
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Smooth loading indicators and error handling
- **Modern UI**: Beautiful gradient background and clean component design

## Tech Stack

- **React 19** - Modern React with hooks
- **Redux Toolkit** - State management with createSlice and createAsyncThunk
- **TypeScript** - Type-safe development
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with responsive design

## API Integration

The application integrates with [mockapi.io](https://mockapi.io) to simulate a backend API:

- **Endpoint**: `https://68652afc5b5d8d033980055b.mockapi.io/api/v1/films`
- **Features**: GET requests with pagination and search parameters
- **Data Structure**: Films with title, genre, startTime, duration, description, director, language, and actors

## Project Structure

```
src/
├── components/          # React components
│   ├── Films.tsx       # Main films component
│   ├── FilmTable.tsx   # Table display component
│   ├── FilmModal.tsx   # Detailed film modal
│   ├── SearchBar.tsx   # Search input component
│   ├── Pagination.tsx  # Pagination controls
│   └── *.css          # Component styles
├── store/              # Redux store
│   ├── store.ts       # Store configuration
│   └── filmsSlice.ts  # Films state management
├── types/              # TypeScript interfaces
│   └── film.ts        # Film data types
├── hooks/              # Custom hooks
│   └── redux.ts       # Typed Redux hooks
└── App.tsx            # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd film schedule
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Film Table

- Displays films in a responsive table format
- Shows title, genre, start time, and duration
- Info icon for each film opens detailed modal
- Loading spinner and empty state handling

### Search Functionality

- Debounced search input (300ms delay)
- Searches through film titles
- Resets pagination when searching
- Real-time filtering

### Pagination

- Configurable films per page (5, 10, 20, 50)
- Smart page number display with ellipsis
- Previous/Next navigation buttons
- Responsive design for mobile devices

### Film Modal

- Detailed film information display
- Formatted time and duration display
- Responsive layout with poster support
- Click outside to close functionality

### Error Handling

- Network error display
- Retry functionality
- Loading states
- Graceful fallbacks

## State Management

The application uses Redux Toolkit for state management:

- **Films State**: Stores film data, loading status, and pagination info
- **Async Actions**: Handles API calls with loading and error states
- **Search State**: Manages search term and triggers API calls
- **Pagination State**: Tracks current page and films per page

## Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Flexible table layouts
- Adaptive modal sizing
- Touch-friendly buttons
- Optimized typography scaling

## Future Enhancements

Potential improvements and additional features:

- Filter by genre or language
- Sort by start time or duration
- Advanced search filters
- Film ratings and reviews
- Booking functionality
- Admin panel for film management
- Dark mode toggle
- Accessibility improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
