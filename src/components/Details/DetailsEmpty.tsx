import styles from './Details.module.css'

function DetailsEmpty() {
  return (
    <div className={styles.placeholder}>
      <div className={styles.placeholderIcon}>👤</div>
      <p>Выберите пользователя из списка</p>
    </div>
  )
}

export default DetailsEmpty
