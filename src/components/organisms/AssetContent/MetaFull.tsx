import React, { ReactElement } from 'react'
import MetaItem from './MetaItem'
import styles from './MetaFull.module.css'
import Publisher from '../../atoms/Publisher'
import { useAsset } from '../../../providers/Asset'
import { getLegalName } from '../../../utils/metadata'

export default function MetaFull(): ReactElement {
  const { ddo, type, isServiceSelfDescriptionVerified } = useAsset()
  const { algorithm } = ddo.findServiceByType('metadata').attributes.main
  const legalName = getLegalName(ddo)
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
