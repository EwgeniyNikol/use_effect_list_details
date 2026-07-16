import type { UserDetails } from '../../types'
import styles from './Details.module.css'

interface DetailsCardProps {
  data: UserDetails
}

function DetailsCard({ data }: DetailsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img src={data.avatar} alt={data.name} className={styles.avatar} />
      </div>
      <h2 className={styles.name}>{data.name}</h2>
      <p className={styles.position}>{data.details.position}</p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Компания</span>
          <span className={styles.value}>{data.details.company}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Город</span>
          <span className={styles.value}>{data.details.city}</span>
        </div>
      </div>
    </div>
  )
}

export default DetailsCard