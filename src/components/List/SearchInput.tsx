import styles from './List.module.css'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      className={styles.search}
      placeholder="Поиск..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchInput
