import { useState, useCallback, useEffect } from 'react'
import type { User } from './types'
import List from './components/List/List'
import Details from './components/Details/Details'
import styles from './App.module.css'

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [showDetails, setShowDetails] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.body.className = darkMode ? 'dark' : ''
  }, [darkMode])

  const handleSelect = useCallback((id: number, name: string) => {
    setSelectedUser((prev: User | null) => {
      if (prev?.id === id) return prev
      return { id, name }
    })
    if (isMobile) setShowDetails(true)
  }, [isMobile])

  const handleUsersLoaded = useCallback((users: User[]) => {
    if (firstLoad && users.length > 0) {
      setSelectedUser(users[0])
      setFirstLoad(false)
    }
  }, [firstLoad])

  const toggleDarkMode = () => setDarkMode((prev: boolean) => !prev)
  const handleBack = () => setShowDetails(false)

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <button className={styles.themeToggle} onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      <div className={`${styles.listPanel} ${isMobile && showDetails ? styles.hidden : ''}`}>
        <List onSelect={handleSelect} selectedId={selectedUser?.id ?? null} onUsersLoaded={handleUsersLoaded} />
      </div>
      <div className={`${styles.detailsPanel} ${isMobile && showDetails ? styles.active : ''}`}>
        {isMobile && showDetails && (
          <button className={styles.backButton} onClick={handleBack}>
            ← Назад
          </button>
        )}
        <Details info={selectedUser} />
      </div>
    </div>
  )
}

export default App