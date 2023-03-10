import React, { ReactElement, useEffect, useState } from 'react'
import { MetadataPublishFormDataset } from '../../../@types/MetaData'
import DebugOutput from '../../atoms/DebugOutput'
import styles from './index.module.css'
import { transformPublishFormToMetadata } from '../../../utils/metadata'

export default function Debug({
  values
}: {
  values: Partial<MetadataPublishFormDataset>
}): ReactElement {
  const [ddo, setDdo] = useState({})
  useEffect(() => {
    transformPublishFormToMetadata(values).then((data) =>
      setDdo({
        '@context': 'https://w3id.org/did/v1',
        dataTokenInfo: {
          ...values.dataTokenOptions
        },
        service: [
          {
            index: 0,
            type: 'metadata',
            attributes: { ...data }
          },
          {
            index: 1,
            type: values.access,
            serviceEndpoint: values.providerUri,
            attributes: {}
          }
        ]
      })
    )
  })

  return (
    <div className={styles.grid}>
      <DebugOutput title="Collected Form Values" output={values} />
      <DebugOutput title="Transformed DDO Values" output={ddo} />
    </div>
  )
}
