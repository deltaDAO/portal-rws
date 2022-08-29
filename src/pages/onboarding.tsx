import React, { ReactElement } from 'react'
import { PageProps } from 'gatsby'
import Page from '../components/templates/Page'
import OnboardingSection from '../components/pages/Home/Onboarding'

export default function PageGatsbyOnboarding(props: PageProps): ReactElement {
  return (
    <Page uri={props.uri}>
      <OnboardingSection />
    </Page>
  )
}
