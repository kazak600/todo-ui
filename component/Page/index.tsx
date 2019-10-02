import { ReactNode } from 'react'
import styles from './styles.scss'

export default function Page({ children }: { children: ReactNode }) {
  return <div className={styles.page}>{children}</div>
}
