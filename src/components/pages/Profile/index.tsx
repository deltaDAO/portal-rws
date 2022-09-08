import React, { ReactElement } from 'react'
import HistoryPage from './History'
import AccountHeader from './Header'
import styles from './index.module.css'
import Container from '../../atoms/Container'

export default function AccountPage({
  accountId
}: {
  accountId: string
}): ReactElement {
  return (
    <Container className={styles.profile}>
      <AccountHeader accountId={accountId} />
      <HistoryPage accountIdentifier={accountId} />
    </Container>
  )
}
