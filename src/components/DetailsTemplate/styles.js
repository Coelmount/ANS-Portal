import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '33px 0px 0px 42px',
    maxWidth: '1600px',
    background: theme.palette.active.main,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 2
    }
  },
  detailsBlock: {
    marginBottom: 20
  },
  detailsFieldsWrap: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  },
  fieldTitleBlock: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 205,
    marginRight: 15,
    whiteSpace: 'nowrap',
    marginBottom: 5,
    color: theme.palette.grey40,
    fontWeight: 600,
    '& > svg': {
      marginRight: 14
    },
    '& > p': {
      fontWeight: 600
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 160
    }
  },
  firstBlockFields: {
    paddingLeft: 42
  },
  panelDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 42
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
    marginBottom: 24,
    fontFamily: 'MTN',
    fontSize: 18,
    fontWeight: 600,
    padding: '0 24px 0 24px'
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
    width: '50%',
    borderTop: `1px solid ${theme.palette.greyE8}`,
    [theme.breakpoints.down(1250)]: {
      width: '70%'
    },
    [theme.breakpoints.down(890)]: {
      width: '90%'
    },
    [theme.breakpoints.down(740)]: {
      width: '100%'
    }
  }
}))

export default useStyles
