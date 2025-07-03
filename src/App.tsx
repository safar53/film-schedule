import {Provider} from 'react-redux'
import {store} from './store/store'
import Films from './components/Films'
import styles from './App.module.scss'

function App() {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Films />
      </div>
    </Provider>
  )
}

export default App
