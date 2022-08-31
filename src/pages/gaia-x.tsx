import React, { ReactElement } from 'react'
import { PageProps } from 'gatsby'
import PageGaiaX from '../components/pages/GaiaX'
import Page from '../components/templates/Page'

export default function PageGatsbyAbout(props: PageProps): ReactElement {
  return (
    <Page uri={props.uri}>
      <PageGaiaX />
    </Page>
  )
}
