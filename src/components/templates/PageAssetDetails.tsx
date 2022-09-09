import React, { useState, useEffect, ReactElement } from 'react'
import { Router } from '@reach/router'
import AssetContent from '../organisms/AssetContent'
import Page from './Page'
import Alert from '../atoms/Alert'
import Loader from '../atoms/Loader'
import { useAsset } from '../../providers/Asset'
import Container from '../atoms/Container'

export default function PageTemplateAssetDetails({
  uri
}: {
  uri: string
}): ReactElement {
  const { ddo, title, error, isInPurgatory, loading, isAssetNetworkAllowed } =
    useAsset()
  const [pageTitle, setPageTitle] = useState<string>()

  useEffect(() => {
    if (!ddo || error) {
      setPageTitle('Could not retrieve asset')
      return
    }

    setPageTitle(isInPurgatory ? '' : title)
  }, [ddo, error, isInPurgatory, title])

  return ddo && pageTitle !== undefined && !loading && isAssetNetworkAllowed ? (
    <Page title={pageTitle} uri={uri}>
      <Container>
        <Router basepath="/asset">
          <AssetContent path=":did" />
        </Router>
      </Container>
    </Page>
  ) : error || !isAssetNetworkAllowed ? (
    <Page title={pageTitle} noPageHeader uri={uri}>
      <Container>
        <Alert
          title={pageTitle}
          text={error || 'This asset was published in an unsupported network'}
          state="error"
        />
      </Container>
    </Page>
  ) : (
    <Page title={undefined} uri={uri}>
      <Container>
        <Loader />
      </Container>
    </Page>
  )
}
