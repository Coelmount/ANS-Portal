import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import SearchIcon from '@material-ui/icons/Search'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import clearResultIcon from 'source/images/svg/clear-result.svg'

const rowsPerPageNumbers = [5, 10, 15, 25, 50, 100]

const CustomTableToolbar = (props) => {
  const {
    classes,
    defaultClasses,
    rowsPerPage,
    setRowsPerPage,
    query,
    setQuery,
    t,
    showSearchBar,
    showPagination,
    extraToolbarBlock
  } = props

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setQuery(value)
  }
  return (
    <div className={`${defaultClasses.toolbarWrap} ${classes.toolbarWrap}`}>
      {showSearchBar && (
        <div className={`${defaultClasses.searchWrap} ${classes.searchWrap}`}>
          <input
            value={query}
            className={`${defaultClasses.searchInput} ${classes.searchInput}`}
            placeholder={t('search_input_placeholder')}
            onChange={handleSearch}
          />
          <img
            src={clearResultIcon}
            onClick={() => setQuery('')}
            className={defaultClasses.clearResultIcon}
            alt='clear result icon'
          ></img>
        </div>
      )}
      {extraToolbarBlock && extraToolbarBlock()}
      {showPagination && (
        <div className={`${defaultClasses.perPageWrap} ${classes.perPageWrap}`}>
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            IconComponent={ArrowDropDownIcon}
            className={`${defaultClasses.perPageSelect} ${classes.perPageSelect}`}
          >
            {rowsPerPageNumbers.map((number) => (
              <MenuItem value={number} key={`${number}`}>
                {number}
              </MenuItem>
            ))}
          </Select>
          <Typography
            className={`${defaultClasses.perPageText} ${classes.perPageText}`}
          >
            {t('per_page')}
          </Typography>
        </div>
      )}
    </div>
  )
}

CustomTableToolbar.propTypes = {
  showSearchBar: PropTypes.bool,
  showPagination: PropTypes.bool,
  extraToolbarBlock: PropTypes.func
}

CustomTableToolbar.defaultProps = {
  showSearchBar: true,
  showPagination: true,
  extraToolbarBlock: null
}

export default withNamespaces()(CustomTableToolbar)
