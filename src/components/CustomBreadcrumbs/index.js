import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Typography } from '@material-ui/core'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import DefaultLayoutStore from 'stores/DefaultLayout'

import useStyles from './styles'

const CustomBreadcrumbs = ({ match, t }) => {
  const { handleCloseNav } = DefaultLayoutStore
  const classes = useStyles()
  const {
    url,
    params: {
      customerId,
      groupId,
      numbersId,
      instanceNumber,
      weekScheduleName,
      holidayScheduleName
    }
  } = match
  const ids = JSON.parse(localStorage.getItem('ids'))

  const isCustomerActive = ids && ids.tenant_id && !ids.group_id
  const isSubaccountActive = ids && ids.tenant_id && ids.group_id

  let itemsAfterCollapseAmount
  const breadcrumbsArr = url.split('/')
  const breadCrumbsAmount = breadcrumbsArr

  if (isCustomerActive) {
    breadcrumbsArr.splice(0, 2)
    itemsAfterCollapseAmount = groupId
      ? breadcrumbsArr.length - 2
      : breadcrumbsArr.length
  } else if (isSubaccountActive) {
    breadcrumbsArr.splice(0, 4)
    itemsAfterCollapseAmount = breadcrumbsArr.length
  } else {
    breadcrumbsArr.splice(0, 1)
    itemsAfterCollapseAmount = groupId
      ? breadcrumbsArr.length - 3
      : breadcrumbsArr.length
  }
  const breadcrumbsAmount = breadcrumbsArr.length

  const systemLevel = (breadcrumb, index) => {
    if (breadcrumbsAmount > 2 && index === 0) {
      return (
        <Link to={`/${breadcrumb}`} className={classes.link} key={breadcrumb}>
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 1 || (breadcrumbsAmount > 4 && index === 2 && numbersId)) {
      return (
        <Link
          to={`/customers/${customerId}/access_numbers`}
          className={classes.link}
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (breadcrumbsAmount > 4 && index === 2) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (
      (breadcrumbsAmount > 4 && index === 3 && !numbersId) ||
      (breadcrumb === 'ans_instances' && breadcrumbsAmount > 5)
    ) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (breadcrumbsAmount > 6 && index === 5 && !numbersId && instanceNumber) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances/basic`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (
      (breadcrumbsAmount > 6 && index === 5 && weekScheduleName) ||
      (breadcrumbsAmount > 5 && index === 4 && !numbersId)
    ) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/schedules/week_schedules`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (breadcrumbsAmount > 6 && index === 5 && holidayScheduleName) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/schedules/holiday_schedules`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }

    return <Typography key={breadcrumb}>{t(breadcrumb)}</Typography>
  }

  const customerLevel = (breadcrumb, index) => {
    if (index === 0) {
      return (
        <Link
          to={`/customers/${customerId}/access_numbers`}
          className={classes.link}
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 1 && breadcrumbsAmount > 2 && numbersId) {
      return (
        <Link
          to={`/customers/${customerId}/access_numbers`}
          className={classes.link}
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 1 && breadcrumbsAmount > 2 && groupId) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts`}
          className={classes.link}
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (
      (index === 2 && breadcrumbsAmount > 3 && groupId) ||
      (index === 3 && breadcrumbsAmount > 4 && groupId)
    ) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances`}
          className={classes.link}
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 4 && breadcrumbsAmount > 5 && groupId && instanceNumber) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances/basic`}
          className={classes.link}
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    return <Typography key={breadcrumb}>{t(breadcrumb)}</Typography>
  }

  const subaccountLevel = (breadcrumb, index) => {
    if (index === 0) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 1 && breadcrumbsAmount > 2) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/${breadcrumb}`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 2 && breadcrumbsAmount > 3 && instanceNumber) {
      return (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances/basic`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    return <Typography key={breadcrumb}>{t(breadcrumb)}</Typography>
  }

  return (
    <Breadcrumbs
      maxItems={itemsAfterCollapseAmount}
      itemsAfterCollapse={itemsAfterCollapseAmount}
      itemsBeforeCollapse={1}
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      className={classes.breadcrumbsWrap}
    >
      {breadcrumbsAmount > 1 &&
        breadcrumbsArr.map((breadcrumb, index) => {
          if (isCustomerActive) return customerLevel(breadcrumb, index)
          else if (isSubaccountActive) return subaccountLevel(breadcrumb, index)
          else return systemLevel(breadcrumb, index)
        })}
      }
    </Breadcrumbs>
  )
}

export default withNamespaces()(withRouter(CustomBreadcrumbs))
