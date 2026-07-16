import styles from './List.module.css'

interface ListItemProps {
  name: string
  isActive: boolean
  onClick: () => void
  onFocus: () => void
}

function ListItem({ name, isActive, onClick, onFocus }: ListItemProps) {
  return (
    <li
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      tabIndex={0}
      onFocus={onFocus}
    >
      {name}
    </li>
  )
}

export default ListItem
