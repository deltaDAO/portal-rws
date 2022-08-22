import React, { ReactElement, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Markdown from '../atoms/Markdown'
import styles from './HomeContent.module.css'
import classNames from 'classnames/bind'
import Button from '../atoms/Button'
import Container from '../atoms/Container'
import InteractiveModalImage from '../molecules/InteractiveModalImage'
import { ReactComponent as Checkmark } from '../../images/checkmark.svg'
import { ReactComponent as Eye } from '../../images/eye.svg'

const cx = classNames.bind(styles)

const query = graphql`
{
  file(absolutePath: {regex: "/content\\.json/"}) {
    childIndexJson {
      content {
        teaser {
          title
          text
        }
        points {
          text
        }
        firstTimeVisiting {
          title
          text
          buttonLabel
        }
      }
    }
  }
}
`
interface HomeContentData {
  file: {
    childIndexJson: {
      content: {
        teaser: {
          title: string
          text: string
        }
        points: {
          text: string
        }[]
        firstTimeVisiting: {
          title: string
          text: string
          buttonLabel: string
        }
      }
    }
  }
}

export default function HomeContent(): ReactElement {
  const data: HomeContentData = useStaticQuery(query)
  const { teaser, points, firstTimeVisiting } = data.file.childIndexJson.content

  return (
    <Container>
      <h2>{teaser.title}</h2>
      <div className={styles.container}>
        <div className={styles.teaser}>
          <Markdown text={teaser.text} />
        </div>
        <div className={styles.secondarySection}>
          <div className={styles.points}>
            {points.map((point, i) => (
              <span key={i}>
                <Checkmark className={styles.checkmark} />
                <Markdown className={styles.pointText} text={point.text} />
              </span>
            ))}
          </div>
          <div className={styles.onboarding}>
            <span className={styles.heading}>
              <Eye className={styles.eye} />
              <h3>{firstTimeVisiting.title}</h3>
            </span>
            <Markdown text={firstTimeVisiting.text} />
            <Button>{firstTimeVisiting.buttonLabel}</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
