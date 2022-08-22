import React, { ReactElement } from 'react'
import { ReactComponent as LogoAssetFull } from '@oceanprotocol/art/logo/logo.svg'
import { ReactComponent as LogoAssetBranding } from '../../images/fmdm-logo.svg'
import { ReactComponent as LogoAssetBrandingInverted } from '../../images/fmdm-logo-white.svg'
import { ReactComponent as LogoAsset } from '../../images/ocean-logo.svg'
import styles from './Logo.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function Logo({
  noWordmark,
  branding,
  inverted
}: {
  noWordmark?: boolean
  branding?: boolean
  inverted?: boolean
}): ReactElement {
  const styleClasses = cx({
    logo: !branding && !inverted,
    branding: branding || inverted
  })

  return branding ? (
    <LogoAssetBranding className={styleClasses} />
  ) : inverted ? (
    <LogoAssetBrandingInverted className={styleClasses} />
  ) : noWordmark ? (
    <LogoAsset className={styleClasses} />
  ) : (
    <LogoAssetFull className={styleClasses} />
  )
}
