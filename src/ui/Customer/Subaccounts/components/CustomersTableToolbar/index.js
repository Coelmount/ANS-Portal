import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'

import { withNamespaces } from 'react-i18next'

const rowsPerPageNumbers = [5, 10, 15, 25, 50, 100]

const CustomersTableToolbar = props => {
  const { classes, rowsPerPage, setRowsPerPage, setQuery, t } = props

  const handleSearch = e => {
    const value = e.target.value.toLowerCase()
    setQuery(value)
  }
  return (
    <div className={classes.toolbarWrap}>
      <input
        className={classes.searchInput}
        placeholder={t('search_input_placeholder')}
        onChange={handleSearch}
      ></input>
      <div className={classes.perPageWrap}>
        <Select
          value={rowsPerPage}
          onChange={e => setRowsPerPage(e.target.value)}
          IconComponent={ExpandMoreOutlinedIcon}
          className={classes.perPageSelect}
        >
          {rowsPerPageNumbers.map(number => (
            <MenuItem value={number} key={`${number}`}>
              {number}
            </MenuItem>
          ))}
        </Select>
        <p>{t('per_page')}</p>
      </div>
    </div>
  )
}

export default withNamespaces()(CustomersTableToolbar)
