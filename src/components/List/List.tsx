import { useEffect, useState, useRef } from 'react'
import type { User } from '@/types'
import SearchInput from './SearchInput'
import ListItem from './ListItem'
import styles from './List.module.css'

interface ListProps {
  onSelect: (id: number, name: string) => void
  selectedId: number | null
  onUsersLoaded?: (users: User[]) => void
}

function List({ onSelect, selectedId, onUsersLoaded }: ListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(
          'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
        )
        if (!response.ok) {
          throw new Error('Не удалось загрузить список пользователей')
        }
        const data = await response.json()
        setUsers(data)
        if (onUsersLoaded) onUsersLoaded(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [onUsersLoaded])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusIndex(prev => Math.min(prev + 1, filteredUsers.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && focusIndex >= 0) {
      const user = filteredUsers[focusIndex]
      if (user) onSelect(user.id, user.name)
    }
  }

  useEffect(() => {
    if (focusIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('li')
      if (items[focusIndex]) {
        (items[focusIndex] as HTMLElement).focus()
      }
    }
  }, [focusIndex])

  if (loading) {
    return <div className={styles.message}>Загрузка списка...</div>
  }

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <ul className={styles.list} ref={listRef} onKeyDown={handleKeyDown}>
        {filteredUsers.map((user, index) => (
          <ListItem
            key={user.id}
            name={user.name}
            isActive={selectedId === user.id}
            onClick={() => onSelect(user.id, user.name)}
            onFocus={() => setFocusIndex(index)}
          />
        ))}
        {filteredUsers.length === 0 && (
          <li className={styles.empty}>Ничего не найдено</li>
        )}
      </ul>
    </>
  )
}

export default List