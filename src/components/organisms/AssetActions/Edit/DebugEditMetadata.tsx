import { DDO } from '@oceanprotocol/lib'
import React, { ReactElement, useEffect, useState } from 'react'
import { MetadataPublishFormDataset } from '../../../../@types/MetaData'
import { transformPublishFormToMetadata } from '../../../../utils/metadata'
import DebugOutput from '../../../atoms/DebugOutput'

export default function Debug({
  values,
  ddo
}: {
  values: Partial<MetadataPublishFormDataset>
  ddo: DDO
}): ReactElement {
  const [newDdo, setNewDdo] = useState({})
  useEffect(() => {
    transformPublishFormToMetadata(values, ddo).then((data) =>
      setNewDdo({
        '@context': 'https://w3id.org/did/v1',
        service: [
          {
            index: 0,
            type: 'metadata',
            attributes: { ...data }
          }
        ]
      })
    )
  })

  return (
    <>
      <DebugOutput title="Collected Form Values" output={values} />
      <DebugOutput title="Transformed DDO Values" output={newDdo} />
    </>
  )
}
