import styles from './App.module.css';
import Header from './components/Header';
import Task from './components/Task/Task';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <Task />
      </main>
    </div>
  )
}

export default App
