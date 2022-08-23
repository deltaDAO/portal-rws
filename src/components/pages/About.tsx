import { graphql, useStaticQuery } from 'gatsby'
import React, { ReactElement } from 'react'
import Container from '../atoms/Container'
import Markdown from '../atoms/Markdown'
import Partners from '../organisms/Partners'
import styles from './About.module.css'

const aboutPageQuery = graphql`
  query aboutPageQuery {
    content: allFile(filter: { relativePath: { eq: "pages/aboutDemo.json" } }) {
      edges {
        node {
          childPagesJson {
            header {
              title
              body
            }
            footer {
              title
              body
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
interface AboutContent {
  content: {
    edges: {
      node: {
        childPagesJson: {
          header: {
            title: string
            body: string
          }
          footer: {
            title: string
            body: string
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

export default function AboutPage(): ReactElement {
  const data: AboutContent = useStaticQuery(aboutPageQuery)
  const { content } = data
  const { header, footer, image } = content.edges[0].node.childPagesJson

  return (
    <Container className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{header.title}</h2>
        <Markdown className={styles.body} text={header.body} />
        <div className={styles.partnersContainer}>
          <span>Partners</span>
          <Partners className={styles.partners} />
        </div>
        <h2 className={styles.title}>{footer.title}</h2>
        <Markdown className={styles.body} text={footer.body} />
      </div>
      <div className={styles.media}>
        <img
          src={image.childImageSharp.original.src}
          className={styles.image}
        />
      </div>
    </Container>
  )
}
