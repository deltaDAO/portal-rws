import React, { ReactElement } from 'react'
import MetaItem from './MetaItem'
import styles from './MetaFull.module.css'
import Publisher from '../../atoms/Publisher'
import { useAsset } from '../../../providers/Asset'
import {
  IVerifiablePresentation,
  ServiceMetadataMarket
} from '../../../@types/MetaData'

export default function MetaFull(): ReactElement {
  const { ddo, type, isServiceSelfDescriptionVerified } = useAsset()
  const { attributes } = ddo.findServiceByType(
    'metadata'
  ) as ServiceMetadataMarket
  const { algorithm } = attributes.main
  // It shouldn't be undefined anymore
  const sd = attributes.additionalInformation?.serviceSelfDescription
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const legalName = sd?.raw
    ? (sd.raw as IVerifiablePresentation).verifiableCredential[2]
        .credentialSubject['gax-trust-framework:legalName']['@value']
    : ddo?.publicKey[0].owner
  function DockerImage() {
    const { image, tag } = algorithm.container
    return <span>{`${image}:${tag}`}</span>
  }

  return (
    <div className={styles.metaFull}>
      <MetaItem
        title="Owner"
        content={
          <Publisher
            account={ddo?.publicKey[0].owner}
            verifiedServiceProviderName={
              isServiceSelfDescriptionVerified
                ? legalName
                : `${ddo.publicKey[0].owner} (unverified)`
            }
          />
        }
      />

      {type === 'algorithm' && algorithm && (
        <MetaItem title="Docker Image" content={<DockerImage />} />
      )}
      <MetaItem title="DID" content={<code>{ddo?.id}</code>} />
    </div>
  )
}
