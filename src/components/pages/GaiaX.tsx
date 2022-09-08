import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactElement } from 'react'
import Button from '../atoms/Button'
import Container from '../atoms/Container'
import Markdown from '../atoms/Markdown'
import styles from './GaiaX.module.css'
import { ReactComponent as GaiaXLogo } from '../../images/gaia-x-logo.svg'
import { ReactComponent as GearIcon } from '../../images/gear_icon.svg'
import { ReactComponent as ShoppingCartIcon } from '../../images/shopping_cart.svg'
import { ReactComponent as FMDMLogo } from '../../images/fmdm-logo.svg'

const icons = {
  gear: <GearIcon />,
  cart: <ShoppingCartIcon />,
  logo: <FMDMLogo />
}

const gaiaXPageQuery = graphql`
  query gaiaXPageQuery {
    content: allFile(
      filter: { relativePath: { eq: "pages/aboutGaiaX.json" } }
    ) {
      edges {
        node {
          childPagesJson {
            title
            topSection {
              text
              interactivity {
                image {
                  childImageSharp {
                    original {
                      src
                    }
                  }
                }
                link
              }
              cta {
                label
                link
              }
            }
            hero {
              header
              points
            }
            footer {
              text
              disclaimer
              cards {
                title
                body
                icon
              }
            }
            image {
              childImageSharp {
                original {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
interface GaiaXContent {
  content: {
    edges: {
      node: {
        childPagesJson: {
          title: string
          topSection: {
            text: string
            interactivity: {
              image: {
                childImageSharp: {
                  original: {
                    src: string
                  }
                }
              }
              link: string
            }
            cta: {
              label: string
              link: string
            }
          }[]
          hero: {
            header: string
            points: string[]
          }
          footer: {
            text: string
            disclaimer: string
            cards: {
              title: string
              body: string
              icon: keyof typeof icons
            }[]
          }
          image: {
            childImageSharp: {
              original: {
                src: string
              }
            }
          }
        }
      }
    }[]
  }
}

export default function GaiaXPage(): ReactElement {
  const data: GaiaXContent = useStaticQuery(gaiaXPageQuery)
  const { content } = data
  const { title, topSection, hero, footer, image } =
    content.edges[0].node.childPagesJson

  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        <img
          src={image.childImageSharp.original.src}
          className={styles.image}
        />
      </div>
      <Container className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {topSection.map((section, i) => (
          <div key={i} className={styles.section}>
            <a
              className={styles.desktopInteractivity}
              href={section.interactivity.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={section.interactivity.image.childImageSharp.original.src}
              />
            </a>
            <div className={styles.sectionText}>
              <Markdown text={section.text} />
              <a
                className={styles.mobileInteractivity}
                href={section.interactivity.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={section.interactivity.image.childImageSharp.original.src}
                />
              </a>
              <Button
                style="primary"
                href={section.cta.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {section.cta.label}
              </Button>
            </div>
          </div>
        ))}
      </Container>
      <div className={styles.heroWrapper}>
        <Container className={styles.heroContainer}>
          <Markdown className={styles.heroHeader} text={hero.header} />
          <ul>
            {hero.points.map((point, i) => (
              <li key={i}>
                <Markdown text={point} />
              </li>
            ))}
          </ul>
        </Container>
      </div>
      <Container className={styles.footerContainer}>
        <Markdown text={footer.text} />
        <div className={styles.gaiaXContainer}>
          <a
            href="https://www.gxfs.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GaiaXLogo />
          </a>
        </div>
        <div className={styles.cardsContainer}>
          {footer.cards.map((card) => (
            <div key={card.icon} className={styles.card}>
              {icons[card.icon]}
              <h4>{card.title}</h4>
              <Markdown text={card.body} />
            </div>
          ))}
        </div>
        <Markdown className={styles.disclaimer} text={footer.disclaimer} />
      </Container>
    </div>
  )
}
