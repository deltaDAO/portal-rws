import React, { ReactElement } from 'react'
import styles from './Footer.module.css'
import Markdown from '../atoms/Markdown'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { Link } from 'gatsby'
import { useUserPreferences } from '../../providers/UserPreferences'
import Button from '../atoms/Button'
import { useGdprMetadata } from '../../hooks/useGdprMetadata'
import Logo from '../atoms/Logo'
import Container from '../atoms/Container'

export default function Footer(): ReactElement {
  const { copyright, appConfig, footer } = useSiteMetadata()
  const { setShowPPC } = useUserPreferences()
  const { privacyPolicySlug } = useUserPreferences()

  const cookies = useGdprMetadata()

  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <Logo inverted />
        </div>
        <div className={styles.content}>
          <div className={styles.links}>
            {footer.links.map((e) => (
              <Button
                key={e.label}
                style="text"
                className={styles.link}
                to={e.link}
              >
                {e.label}
              </Button>
            ))}
          </div>
          <div className={styles.copyrightContainer}>
            <div className={styles.copyright}>
              <span>
                <Markdown text={footer.designedBy} />
              </span>
              <span>
                <Markdown text={`&copy; ${year} ${copyright}`} />
              </span>
            </div>
            <div className={styles.legal}>
              <Link to="/imprint">Imprint</Link>
              {' — '}
              <Link to={privacyPolicySlug}>Privacy</Link>
              {appConfig.privacyPreferenceCenter === 'true' && (
                <>
                  {' — '}
                  <Button
                    style="text"
                    size="small"
                    className="link"
                    onClick={() => {
                      setShowPPC(true)
                    }}
                  >
                    {cookies.optionalCookies ? 'Cookie Settings' : 'Cookies'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
