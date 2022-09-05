import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Header.module.css'
import Markdown from '../../atoms/Markdown'
import { graphql, useStaticQuery } from 'gatsby'
import Button from '../../atoms/Button'
import { useSiteMetadata } from '../../../hooks/useSiteMetadata'
import Container from '../../atoms/Container'
import { animated, useSpringRef, useTransition } from 'react-spring'

const cx = classNames.bind(styles)
const CAROUSEL_SCROLL_TIMEOUT = 20000

const homePageHeaderQuery = graphql`
  query homePageHeaderQuery {
    content: allFile(
      filter: { relativePath: { eq: "pages/index/header.json" } }
    ) {
      edges {
        node {
          childIndexJson {
            body
            cta {
              label
              link
            }
          }
        }
      }
    }
    carousel: allFile(
      filter: { absolutePath: { regex: "/src/images/headerCarousel/" } }
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

interface HeaderContent {
  content: {
    edges: {
      node: {
        childIndexJson: {
          body: string
          cta: {
            label: string
            link: string
          }[]
        }
      }
    }[]
  }
  carousel: {
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

const translateMovements = {
  fromTranslateLeft: 'translate3d(-100%,-50%,0)',
  fromTranslateRight: 'translate3d(100%,-50%,0)',
  leaveTranslateLeft: 'translate3d(50%,-50%,0)',
  leaveTranslateRight: 'translate3d(-50%,-50%,0)',
  startPosition: 'translate3d(0%,-50%,0)'
}

export default function PageHeader(): ReactElement {
  const data: HeaderContent = useStaticQuery(homePageHeaderQuery)
  const { content, carousel } = data
  const { body, cta } = content.edges[0].node.childIndexJson
  const { siteTagline } = useSiteMetadata()

  const [index, setIndex] = useState(0)

  const { fromTranslateRight, leaveTranslateRight, startPosition } =
    translateMovements

  const scrollImage = useCallback(() => {
    setIndex((state) => (state + 1) % carousel.edges.length)
  }, [carousel.edges])

  useEffect(() => {
    const timer = setTimeout(scrollImage, CAROUSEL_SCROLL_TIMEOUT)
    return () => {
      clearTimeout(timer)
    }
  }, [scrollImage, index])

  const transRef = useSpringRef()
  const moveAndFadeDiv = useTransition(index, {
    ref: transRef,
    keys: null,
    initial: {
      opacity: 1,
      transform: startPosition
    },
    from: {
      opacity: 1,
      transform: fromTranslateRight
    },
    enter: { opacity: 1, transform: startPosition },
    leave: {
      opacity: 1,
      transform: leaveTranslateRight
    },
    config: { mass: 1, tension: 170, friction: 26 }
  })
  useEffect(() => {
    transRef.start()
  }, [index, transRef])

  return (
    <header className={styles.header}>
      {moveAndFadeDiv((style, i) => (
        <animated.div
          key={carousel.edges[i].node.childImageSharp.id}
          style={style}
        >
          <div className={styles.carouselImageContainer}>
            <img
              className={styles.image}
              src={carousel.edges[i].node.childImageSharp.original.src}
              loading="eager"
            />
          </div>
        </animated.div>
      ))}
      <Container className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{siteTagline}</h1>
          {body && <Markdown text={body} className={styles.body} />}
          <div className={styles.actions}>
            {cta.map((e, i) => (
              <Button
                key={e.label}
                style={i % 2 === 0 ? 'primary' : 'ghost'}
                to={e.link}
              >
                {e.label}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.carouselIndicators}>
          {carousel.edges.map((e, i) => (
            <div
              key={e.node.childImageSharp.id}
              className={cx({ indicator: true, active: index === i })}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </Container>
    </header>
  )
}
