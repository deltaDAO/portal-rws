import React, { ReactElement } from 'react'
import { PageProps } from 'gatsby'
import PageAbout from '../components/pages/About'
import Page from '../components/templates/Page'

export default function PageGatsbyAbout(props: PageProps): ReactElement {
  return (
    <Page uri={props.uri}>
      <PageAbout />
    </Page>
  )
}
