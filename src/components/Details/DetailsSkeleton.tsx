import styles from './Details.module.css'

function DetailsSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonAvatar}></div>
      <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}></div>
      <div className={`${styles.skeletonLine} ${styles.skeletonLineMedium}`}></div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <div style={{ flex: 1, height: '60px', borderRadius: '12px' }} className={styles.skeletonLine}></div>
        <div style={{ flex: 1, height: '60px', borderRadius: '12px' }} className={styles.skeletonLine}></div>
      </div>
    </div>
  )
}

export default DetailsSkeleton
