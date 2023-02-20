import React from 'react'
import Dotdotdot from 'react-dotdotdot'
import Price from '../atoms/Price'
import { DDO } from '@oceanprotocol/lib'
import removeMarkdown from 'remove-markdown'
import Publisher from '../atoms/Publisher'
import AssetType from '../atoms/AssetType'
import NetworkName from '../atoms/NetworkName'
import styles from './AssetTeaser.module.css'
import LinkOpener from '../molecules/LinkOpener'
import { BestPrice } from '../../models/BestPrice'
import Loader from '../atoms/Loader'
import classNames from 'classnames/bind'
import { ServiceMetadataMarket } from '../../@types/MetaData'

const cx = classNames.bind(styles)

declare type AssetTeaserProps = {
  ddo: DDO
  price?: BestPrice
  noPublisher?: boolean
}

const AssetTeaser: React.FC<AssetTeaserProps> = ({
  ddo,
  price,
  noPublisher
}: AssetTeaserProps) => {
  const { attributes } = ddo.findServiceByType(
    'metadata'
  ) as ServiceMetadataMarket
  const isCompliant = attributes.additionalInformation.compliance.gx
  const { name, type, author } = attributes.main
  const { dataTokenInfo } = ddo
  const isCompute = Boolean(ddo?.findServiceByType('compute'))
  const accessType = isCompute ? 'compute' : 'access'
  const { owner } = ddo.publicKey[0]

  return (
    <article className={`${styles.teaser} ${styles[type]}`}>
      <LinkOpener uri={`/asset/${ddo.id}`} className={styles.link}>
        <>
          <header className={styles.header}>
            <div className={styles.symbol}>{dataTokenInfo?.symbol}</div>
            <Dotdotdot clamp={3}>
              <h1 className={styles.title}>{name}</h1>
            </Dotdotdot>
            <Publisher
              account={owner}
              verifiedServiceProviderName={isCompliant ? author : undefined}
              minimal
              className={styles.publisher}
            />
          </header>

          <AssetType
            type={type}
            accessType={accessType}
            className={cx({
              typeDetails: true,
              algo: type === 'algorithm',
              dataset: type === 'dataset'
            })}
          />

          <div className={styles.content}>
            <Dotdotdot tagName="p" clamp={3}>
              {removeMarkdown(
                attributes?.additionalInformation?.description?.substring(
                  0,
                  300
                ) || ''
              )}
            </Dotdotdot>
          </div>

          <footer className={styles.foot}>
            {price ? (
              <Price price={price} small />
            ) : (
              <Loader style="gradient" dimensions={{ width: 64, height: 16 }} />
            )}
            <div className={styles.network}>
              <NetworkName networkId={ddo.chainId} />
            </div>
          </footer>
        </>
      </LinkOpener>
    </article>
  )
}

export default AssetTeaser
