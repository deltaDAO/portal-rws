import React, { ReactElement, useState } from 'react'
import { useNavigate } from '@reach/router'
import classNames from 'classnames/bind'
import { addExistingParamsToUrl } from './utils'
import Button from '../../atoms/Button'
import styles from './Filters.module.css'
import {
  FilterByAccessOptions,
  FilterByIsInComplianceOptions,
  FilterByTypeOptions
} from '../../../models/SortAndFilters'

const cx = classNames.bind(styles)

const clearFilters = [{ display: 'Clear', value: '' }]

const serviceFilterItems = [
  { display: 'data sets', value: FilterByTypeOptions.Data },
  { display: 'algorithms', value: FilterByTypeOptions.Algorithm }
]

const accessFilterItems = [
  { display: 'download ', value: FilterByAccessOptions.Download },
  { display: 'compute ', value: FilterByAccessOptions.Compute }
]

const complianceFilterItems = [
  { display: 'in compliance', value: FilterByIsInComplianceOptions.True }
]

export default function FilterPrice({
  serviceType,
  accessType,
  complianceType,
  setServiceType,
  setAccessType,
  setComplianceType,
  addFiltersToUrl,
  className
}: {
  serviceType: string
  accessType: string
  complianceType: string
  setServiceType: React.Dispatch<React.SetStateAction<string>>
  setAccessType: React.Dispatch<React.SetStateAction<string>>
  setComplianceType: React.Dispatch<React.SetStateAction<string>>
  addFiltersToUrl?: boolean
  className?: string
}): ReactElement {
  const navigate = useNavigate()
  const [serviceSelections, setServiceSelections] = useState<string[]>([])
  const [accessSelections, setAccessSelections] = useState<string[]>([])
  const [complianceSelections, setComplianceSelections] = useState<string[]>([])

  async function applyFilter(filter: string, filterType: string) {
    if (filterType === 'accessType') {
      setAccessType(filter)
    } else if (filterType === 'serviceType') {
      setServiceType(filter)
    } else if (filterType === 'complianceType') {
      setComplianceType(filter)
    }

    if (addFiltersToUrl) {
      let urlLocation = ''
      if (filterType.localeCompare('accessType') === 0) {
        urlLocation = await addExistingParamsToUrl(location, ['accessType'])
      } else if (filterType.localeCompare('serviceType') === 0) {
        urlLocation = await addExistingParamsToUrl(location, ['serviceType'])
      } else if (filterType.localeCompare('complianceType') === 0) {
        urlLocation = await addExistingParamsToUrl(location, ['complianceType'])
      }

      if (filter && location.search.indexOf(filterType) === -1) {
        if (filterType === 'accessType') {
          urlLocation = `${urlLocation}&accessType=${filter}`
        } else if (filterType === 'serviceType') {
          urlLocation = `${urlLocation}&serviceType=${filter}`
        } else if (filterType === 'complianceType') {
          urlLocation = `${urlLocation}&complianceType=${filter}`
        }
      }

      navigate(urlLocation)
    }
  }

  async function handleSelectedFilter(isSelected: boolean, value: string) {
    if (
      value === FilterByAccessOptions.Download ||
      value === FilterByAccessOptions.Compute
    ) {
      if (isSelected) {
        if (accessSelections.length > 1) {
          // both selected -> select the other one
          const otherValue = accessFilterItems.find(
            (p) => p.value !== value
          ).value
          await applyFilter(otherValue, 'accessType')
          setAccessSelections([otherValue])
        } else {
          // only the current one selected -> deselect it
          await applyFilter(undefined, 'accessType')
          setAccessSelections([])
        }
      } else {
        if (accessSelections.length) {
          // one already selected -> both selected
          await applyFilter(undefined, 'accessType')
          setAccessSelections(accessFilterItems.map((p) => p.value))
        } else {
          // none selected -> select
          await applyFilter(value, 'accessType')
          setAccessSelections([value])
        }
      }
    } else if (
      value === FilterByTypeOptions.Data ||
      value === FilterByTypeOptions.Algorithm
    ) {
      if (isSelected) {
        if (serviceSelections.length > 1) {
          const otherValue = serviceFilterItems.find(
            (p) => p.value !== value
          ).value
          await applyFilter(otherValue, 'serviceType')
          setServiceSelections([otherValue])
        } else {
          await applyFilter(undefined, 'serviceType')
          setServiceSelections([])
        }
      } else {
        if (serviceSelections.length) {
          await applyFilter(undefined, 'serviceType')
          setServiceSelections(serviceFilterItems.map((p) => p.value))
        } else {
          await applyFilter(value, 'serviceType')
          setServiceSelections([value])
        }
      }
    } else {
      if (isSelected) {
        if (complianceSelections.length > 1) {
          const otherValue = complianceFilterItems.find(
            (p) => p.value !== value
          ).value
          await applyFilter(otherValue, 'complianceType')
          setComplianceSelections([otherValue])
        } else {
          await applyFilter(undefined, 'complianceType')
          setComplianceSelections([])
        }
      } else {
        if (complianceSelections.length) {
          await applyFilter(undefined, 'complianceType')
          setComplianceSelections(serviceFilterItems.map((p) => p.value))
        } else {
          await applyFilter(value, 'complianceType')
          setComplianceSelections([value])
        }
      }
    }
  }

  async function applyClearFilter(addFiltersToUrl: boolean) {
    setServiceSelections([])
    setAccessSelections([])
    setComplianceSelections([])
    setServiceType(undefined)
    setAccessType(undefined)
    setComplianceType(undefined)
    if (addFiltersToUrl) {
      let urlLocation = await addExistingParamsToUrl(location, [
        'accessType',
        'serviceType',
        'complianceType'
      ])
      urlLocation = `${urlLocation}`
      navigate(urlLocation)
    }
  }

  const styleClasses = cx({
    filterList: true,
    [className]: className
  })

  return (
    <div className={styleClasses}>
      <div className={styles.filterType}>
        {serviceFilterItems.map((e, index) => {
          const isServiceSelected =
            e.value === serviceType || serviceSelections.includes(e.value)
          const selectFilter = cx({
            [styles.selected]: isServiceSelected,
            [styles.filter]: true
          })
          return (
            <Button
              size="small"
              style="text"
              key={index}
              className={selectFilter}
              onClick={async () => {
                handleSelectedFilter(isServiceSelected, e.value)
              }}
            >
              {e.display}
            </Button>
          )
        })}
      </div>
      <div className={styles.filterAccess}>
        {accessFilterItems.map((e, index) => {
          const isAccessSelected =
            e.value === accessType || accessSelections.includes(e.value)
          const selectFilter = cx({
            [styles.selected]: isAccessSelected,
            [styles.filter]: true
          })
          return (
            <Button
              size="small"
              style="text"
              key={index}
              className={selectFilter}
              onClick={async () => {
                handleSelectedFilter(isAccessSelected, e.value)
              }}
            >
              {e.display}
            </Button>
          )
        })}
      </div>
      <div>
        {complianceFilterItems.map((e, index) => {
          const isInComplianceSelected =
            e.value === complianceType || complianceSelections.includes(e.value)
          const selectFilter = cx({
            [styles.selected]: isInComplianceSelected,
            [styles.filter]: true
          })
          return (
            <Button
              size="small"
              style="text"
              key={index}
              className={selectFilter}
              onClick={async () => {
                handleSelectedFilter(isInComplianceSelected, e.value)
              }}
            >
              {e.display}
            </Button>
          )
        })}
      </div>
      {clearFilters.map((e, index) => {
        const showClear =
          accessSelections.length > 0 ||
          serviceSelections.length > 0 ||
          complianceSelections.length > 0
        return (
          <Button
            size="small"
            style="text"
            key={index}
            className={showClear ? styles.showClear : styles.hideClear}
            onClick={async () => {
              applyClearFilter(addFiltersToUrl)
            }}
          >
            {e.display}
          </Button>
        )
      })}
    </div>
  )
}
