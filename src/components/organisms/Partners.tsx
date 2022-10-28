import React, { ReactElement } from 'react'
import styles from './Partners.module.css'
import classNames from 'classnames/bind'
import { graphql, useStaticQuery } from 'gatsby'

const cx = classNames.bind(styles)

const homePageHeaderQuery = graphql`
  query PartnersQuery {
    partners: allFile(
      filter: { absolutePath: { regex: "/src/images/partners/" } }
      sort: { fields: [base] }
    ) {
      edges {
        node {
          childImageSharp {
            id
            original {
              src
            }
          }
        }
      }
    }
    extra: allFile(
      filter: { absolutePath: { regex: "/src/images/extra-logos/" } }
      sort: { fields: [base] }
    ) {
      edges {
        node {
          childImageSharp {
            id
            original {
              src
            }
          }
        }
      }
    }
  }
`

interface LogoStructure {
  edges: {
    node: {
      childImageSharp: {
        id: string
        original: {
          src: string
        }
      }
    }
  }[]
}

interface Partners {
  partners: LogoStructure
  extra: LogoStructure
}

export default function Partners({
  extended,
  className
}: {
  extended?: boolean
  className?: string
}): ReactElement {
  const data: Partners = useStaticQuery(homePageHeaderQuery)
  const { partners, extra } = data

  return (
    <div
      className={cx({
        container: true,
        [className]: className
      })}
    >
      {partners.edges.map((e) => (
        <img
          key={e.node.childImageSharp.id}
          className={styles.logo}
          src={e.node.childImageSharp.original.src}
        />
      ))}
      {extended &&
        extra.edges.map((e) => (
          <img
            key={e.node.childImageSharp.id}
            className={styles.logo}
            src={e.node.childImageSharp.original.src}
          />
        ))}
    </div>
  )
}
