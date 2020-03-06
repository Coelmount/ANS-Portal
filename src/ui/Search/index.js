import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CallIcon from '@material-ui/icons/Call'
import Table from '@material-ui/core/Table'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Input from 'components/Input'
import PhoneNumberInput from 'components/PhoneNumberInput'

const useStyles = makeStyles(theme => ({
  searchPageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%'
  },
  searchTitleWraper: {
    display: 'flex',
    marginTop: '30px',
    marginLeft: '50px',
    alignSelf: 'flex-start'
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
    color: 'black'
  },
  searchTitle: {
    fontSize: '25px',
    fontFamily: 'MTN',
    fontWeight: 'bold',
    marginLeft: '5px'
  },
  searchByWrapper: {
    width: 600,
    height: 54,
    marginTop: 60,
    marginBottom: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    borderRadius: 30,
    boxShadow: '0px 4px 12px rgba(204, 204, 204, 0.25)',

    '&:hover': {
      cursor: 'pointer'
    }
  },
  searchByButton: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 18
  },
  hashSign: {
    fontSize: '25px',
    color: '#666666',
    fontWeight: 500
  },
  searchByTitle: {
    marginLeft: '10px',
    fontFamily: 'Open sans',
    fontStyle: 'normal',
    fontWeight: 600
  },
  searchByActive: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    borderRadius: 30,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 18
  },
  searchResultTitle: {
    fontFamily: 'MTN',
    /* font-style: normal; */
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    color: '#666666',
    alignSelf: 'flex-start',
    marginTop: '60px',
    marginLeft: '50px'
  },
  table: {
    marginLeft: 100,
    marginTop: 50,
    maxWidth: 500,
    borderBottom: 'none'
  }
}))
const Search = () => {
  const classes = useStyles()
  const [searchById, setSearchById] = useState(true)
  const [inputValue, setInputValue] = useState('')
  return (
    <Box className={classes.searchPageWrapper}>
      <Box className={classes.searchTitleWraper}>
        <SearchIcon className={classes.searchIcon} />
        <Typography className={classes.searchTitle}>Search</Typography>
      </Box>
      {searchById ? (
        <>
          <Box className={classes.searchByWrapper}>
            <Typography
              className={classes.searchByActive}
              onClick={() => {
                setSearchById(true)
              }}
            >
              <Typography className={classes.hashSign}>#</Typography>
              <Typography className={classes.searchByTitle}>
                Customer/ Subaccount ID
              </Typography>
            </Typography>
            <Typography
              className={classes.searchByButton}
              onClick={() => {
                setSearchById(false)
              }}
            >
              <CallIcon style={classes.icon} />
              <Typography className={classes.searchByTitle}>
                Phone Number
              </Typography>
            </Typography>
          </Box>
          <Input
            icon='#'
            onChange={e => {
              setInputValue(e.target.value)
            }}
          />
          <Typography className={classes.searchResultTitle}>
            SEARCH RESULT
          </Typography>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <Typography className={classes.searchByTitle}>
                  Customer/ Subaccount ID
                </Typography>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell styles={classes.tableCell}>gbuihboiybi</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Box className={classes.searchByWrapper}>
            <Typography
              className={classes.searchByButton}
              onClick={() => {
                setSearchById(true)
              }}
            >
              <Typography className={classes.hashSign}>#</Typography>
              <Typography className={classes.searchByTitle}>
                Customer/ Subaccount ID
              </Typography>
            </Typography>
            <Typography
              className={classes.searchByActive}
              onClick={() => {
                setSearchById(false)
              }}
            >
              <CallIcon style={classes.icon} />
              <Typography className={classes.searchByTitle}>
                {' '}
                Phone Number
              </Typography>
            </Typography>
          </Box>
          <PhoneNumberInput
            icon={<CallIcon />}
            onChange={e => {
              setInputValue(e)
            }}
          />
          <Typography className={classes.searchResultTitle}>
            SEARCH RESULT
          </Typography>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <Typography className={classes.searchByTitle}>
                  Phone Number
                </Typography>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell styles={classes.tableCell}>gbuihboiybi</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  )
}

export default Search
