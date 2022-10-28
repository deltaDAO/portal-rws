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
  }
`
interface Partners {
  partners: {
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
}

export default function Partners({
  className
}: {
  className?: string
}): ReactElement {
  const data: Partners = useStaticQuery(homePageHeaderQuery)
  const { partners } = data

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
    </div>
  )
}
