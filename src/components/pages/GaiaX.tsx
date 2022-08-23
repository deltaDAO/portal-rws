import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactElement } from 'react'
import Container from '../atoms/Container'
import Markdown from '../atoms/Markdown'
import HighlightBox from '../molecules/HighlightBox'
import styles from './GaiaX.module.css'

const gaiaXPageQuery = graphql`
  query gaiaXPageQuery {
    content: allFile(
      filter: { relativePath: { eq: "pages/aboutGaiaX.json" } }
    ) {
      edges {
        node {
          childPagesJson {
            title
            body
            sections {
              title
              text
            }
            actions {
              icon
              title
              body
              buttonLabel
              link
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
          body: string
          sections: {
            title: string
            text: string
          }[]
          actions: {
            icon: 'eye' | 'catalogue'
            title: string
            body: string
            buttonLabel: string
            link: string
          }[]
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
  const { title, body, sections, actions, image } =
    content.edges[0].node.childPagesJson

  return (
    <Container className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <Markdown className={styles.body} text={body} />
        {sections.map((section, i) => (
          <div key={i} className={styles.section}>
            <span>{section.title}</span>
            <Markdown className={styles.sectionText} text={section.text} />
          </div>
        ))}
      </div>
      <div className={styles.media}>
        <img
          src={image.childImageSharp.original.src}
          className={styles.image}
        />
        <div className={styles.actions}>
          {actions.map((action) => (
            <HighlightBox
              key={action.title}
              icon={action.icon}
              title={action.title}
              body={action.body}
              buttonLabel={action.buttonLabel}
              link={action.link}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
