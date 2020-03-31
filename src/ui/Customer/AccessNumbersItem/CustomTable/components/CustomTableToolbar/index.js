import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import SearchIcon from '@material-ui/icons/Search'

import deleteIcon from 'source/images/svg/delete-icon.svg'

const rowsPerPageNumbers = [5, 10, 15, 25, 50, 100]

const CustomTableToolbar = props => {
  const {
    classes,
    rowsPerPage,
    setRowsPerPage,
    setQuery,
    isFullVersion,
    t
  } = props

  const handleSearch = e => {
    const value = e.target.value.toLowerCase()
    setQuery(value)
  }
  return (
    <div className={classes.toolbarWrap}>
      {isFullVersion && (
        <Fragment>
          <div className={classes.searchWrap}>
            <input
              className={classes.searchInput}
              placeholder={t('search_input_placeholder')}
              onChange={handleSearch}
            />
            <SearchIcon className={classes.searchIcon} />
          </div>

          <Box className={classes.addCustomerWrap}>
            {/* <Box className={classes.addIconWrap} onClick={handleOpen}> */}
            <Box className={classes.addIconWrap}>
              <img src={deleteIcon} alt='delete icon'></img>
            </Box>
            <Typography className={classes.addCustomerTitle}>
              {t('deassign_selected_numbers')}
            </Typography>
          </Box>
        </Fragment>
      )}
    </div>
  )
}

export default withNamespaces()(CustomTableToolbar)
