import React, { ReactElement } from 'react'
import { useAsset } from '../../../providers/Asset'
import { useWeb3 } from '../../../providers/Web3'
import ExplorerLink from '../../atoms/ExplorerLink'
import Publisher from '../../atoms/Publisher'
import AddToken from '../../atoms/AddToken'
import Time from '../../atoms/Time'
import AssetType from '../../atoms/AssetType'
import styles from './MetaMain.module.css'
import VerifiedBadge from '../../atoms/VerifiedBadge'
import {
  IVerifiablePresentation,
  ServiceMetadataMarket
} from '../../../@types/MetaData'

export default function MetaMain(): ReactElement {
  const {
    ddo,
    owner,
    type,
    isAssetNetwork,
    isServiceSelfDescriptionVerified,
    isVerifyingSD,
    verifiedServiceProviderName
  } = useAsset()
  const { web3ProviderInfo } = useWeb3()
  const { attributes } = ddo?.findServiceByType(
    'metadata'
  ) as ServiceMetadataMarket
  const sd = attributes.additionalInformation?.serviceSelfDescription
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const legalName = sd?.raw
    ? (sd.raw as IVerifiablePresentation).verifiableCredential[2]
        .credentialSubject['gax-trust-framework:legalName']['@value']
    : ddo?.publicKey[0].owner
  const isCompute = Boolean(ddo?.findServiceByType('compute'))
  const accessType = isCompute ? 'compute' : 'access'
  const blockscoutNetworks = [1287, 2021000, 2021001, 44787, 246, 1285]
  const isBlockscoutExplorer = blockscoutNetworks.includes(ddo?.chainId)

  return (
    <aside className={styles.meta}>
      <header className={styles.asset}>
        <AssetType
          type={type}
          accessType={accessType}
          className={styles.assetType}
        />
        <ExplorerLink
          className={styles.datatoken}
          networkId={ddo?.chainId}
          path={
            isBlockscoutExplorer
              ? `tokens/${ddo?.dataToken}`
              : `token/${ddo?.dataToken}`
          }
        >
          {`${ddo?.dataTokenInfo.name} — ${ddo?.dataTokenInfo.symbol}`}
        </ExplorerLink>

        {web3ProviderInfo?.name === 'MetaMask' && isAssetNetwork && (
          <span className={styles.addWrap}>
            <AddToken
              address={ddo?.dataTokenInfo.address}
              symbol={ddo?.dataTokenInfo.symbol}
              logo="https://raw.githubusercontent.com/oceanprotocol/art/main/logo/datatoken.png"
              text={`Add ${ddo?.dataTokenInfo.symbol} to wallet`}
              className={styles.add}
              minimal
            />
          </span>
        )}
      </header>

      <div className={styles.publisherInfo}>
        <div className={styles.byline}>
          Published By{' '}
          <Publisher
            account={owner}
            verifiedServiceProviderName={
              isServiceSelfDescriptionVerified
                ? legalName
                : `${ddo.publicKey[0].owner} (unverified)`
            }
          />
          <p>
            <Time date={ddo?.created} relative />
            {ddo?.created !== ddo?.updated && (
              <>
                {' — '}
                <span className={styles.updated}>
                  updated <Time date={ddo?.updated} relative />
                </span>
              </>
            )}
          </p>
        </div>
        {(isVerifyingSD || isServiceSelfDescriptionVerified) && (
          <VerifiedBadge
            text="Service Self-Description"
            isLoading={isVerifyingSD}
            timestamp={isServiceSelfDescriptionVerified}
          />
        )}
      </div>
    </aside>
  )
}
