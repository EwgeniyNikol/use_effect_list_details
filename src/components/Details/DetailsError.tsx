import styles from './Details.module.css'

interface DetailsErrorProps {
  message: string
}

function DetailsError({ message }: DetailsErrorProps) {
  return (
    <div className={styles.error}>
      <div className={styles.errorIcon}>⚠️</div>
      <p>{message}</p>
    </div>
  )
}

export default DetailsError
