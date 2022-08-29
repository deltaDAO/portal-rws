import React, { ReactElement } from 'react'
import styles from './Partners.module.css'
import classNames from 'classnames/bind'
import { ReactComponent as RWLogo } from '../../images/RW-logo.svg'
import { ReactComponent as GaiaXNetherlandsLogo } from '../../images/gaia-x-netherlands-logo.svg'
import { ReactComponent as DBCLogo } from '../../images/DBC-logo.svg'
import { ReactComponent as DeltaDaoLogo } from '../../images/deltaDAO_Logo_Hoch_RGB_positiv.svg'

const cx = classNames.bind(styles)

export default function Partners({
  className
}: {
  className?: string
}): ReactElement {
  return (
    <div
      className={cx({
        container: true,
        [className]: className
      })}
    >
      <RWLogo />
      <DBCLogo />
      <GaiaXNetherlandsLogo />
      <DeltaDaoLogo />
    </div>
  )
}
