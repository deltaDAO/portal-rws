import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { ReactComponent as GaiaX } from '../../images/gaia-x-logo.svg'
import styles from './Partners.module.css'
import Container from '../atoms/Container'
import Logo from '../atoms/Logo'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const query = graphql`
  {
    partners: allFile(
      filter: { absolutePath: { regex: "/src/images/partners/" } }
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

interface Logos {
  partners: {
    edges: {
      node: {
        childImageSharp: {
          id: string
          original: { src: string }
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
  const data: Logos = useStaticQuery(query)
  const { partners } = data
  return (
    <div
      className={cx({
        container: true,
        [className]: className
      })}
    >
      {partners?.edges.map((logo) => (
        <img
          key={logo.node.childImageSharp.id}
          className={styles.logo}
          src={logo.node.childImageSharp.original.src}
        />
      ))}
      <GaiaX />
      <div className={styles.oceanLogo}>
        <Logo />
      </div>
    </div>
  )
}
