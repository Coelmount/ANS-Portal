import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '33px 0px 0px 100px',
    maxWidth: '1600px',
    background: theme.palette.active.main,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '26px !important'
    },
    [theme.breakpoints.down(735)]: {
      paddingLeft: '10px !important'
    },
    [theme.breakpoints.between(600, 675)]: {
      paddingLeft: '0px !important'
    }
  },
  detailsBlock: {
    paddingLeft: 24,
    marginBottom: 20
  },
  detailsFieldsWrap: {
    display: 'flex',
    paddingLeft: 42,
    alignItems: 'center',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(735)]: {
      paddingLeft: 5
    },
    [theme.breakpoints.down('xm')]: {
      paddingLeft: 5
    }
  },
  fieldTitleBlock: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 205,
    fontWeight: 500,
    marginRight: 15,
    whiteSpace: 'nowrap',
    '& > svg': {
      marginRight: 14
    },
    [theme.breakpoints.down(735)]: {
      marginRight: 10
    },
    [theme.breakpoints.between(600, 675)]: {
      minWidth: 180
    }
  },
  expansionBlockRow: {
    display: 'flex'
  },
  blockTitle: {
    fontFamily: 'MTN',
    fontSize: 18,
    fontWeight: 600,
    whiteSpace: 'nowrap'
  },
  detailsBlockTitle: {
    marginBottom: 20,
    fontFamily: 'MTN',
    fontSize: 18,
    fontWeight: 600
  },
  expandMoreIconWrap: {
    width: 30,
    height: 30,
    boxShadow: '0px 2px 4px rgba(196, 196, 196, 0.25)',
    background: 'white',
    borderRadius: 20
  },
  expandMoreIcon: {
    color: theme.palette.active.blue
  },
  expansionPannel: {
    background: theme.palette.active.main,
    width: '60%',
    borderTop: `1px solid ${theme.palette.greyE8}`
  }
}))

export default useStyles
