import React from 'react'
import { withNamespaces } from 'react-i18next'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import SearchIcon from '@material-ui/icons/Search'
import { Typography } from '@material-ui/core'

const rowsPerPageNumbers = [5, 10, 15, 25, 50, 100]

const CustomersTableToolbar = props => {
  const { classes, rowsPerPage, setRowsPerPage, setQuery, t } = props

  const handleSearch = e => {
    const value = e.target.value.toLowerCase()
    setQuery(value)
  }
  return (
    <div className={classes.toolbarWrap}>
      <div className={classes.searchWrap}>
        <input
          className={classes.searchInput}
          placeholder={t('search_input_placeholder')}
          onChange={handleSearch}
        />
        <SearchIcon className={classes.searchIcon} />
      </div>

      <div className={classes.perPageWrap}>
        <Select
          value={rowsPerPage}
          onChange={e => setRowsPerPage(e.target.value)}
          IconComponent={ArrowDropDownIcon}
          className={classes.perPageSelect}
        >
          {rowsPerPageNumbers.map(number => (
            <MenuItem value={number} key={`${number}`}>
              {number}
            </MenuItem>
          ))}
        </Select>
        <Typography className={classes.perPageText}>{t('per_page')}</Typography>
      </div>
    </div>
  )
}

export default withNamespaces()(CustomersTableToolbar)
