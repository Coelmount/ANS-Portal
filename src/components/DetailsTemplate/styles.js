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
    [theme.breakpoints.down(700)]: {
      paddingLeft: '10px !important'
    },
    [theme.breakpoints.between(600, 675)]: {
      paddingLeft: '10px !important'
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
    },
    [theme.breakpoints.down(435)]: {
      paddingLeft: 5,
      minWidth: 180
    }
  },
  firstBlockFields: {
    paddingLeft: 66,
    [theme.breakpoints.between(600, 675)]: {
      paddingLeft: 0
    },
    [theme.breakpoints.down(435)]: {
      paddingLeft: 15
    }
  },
  panelDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 62,
    [theme.breakpoints.between(600, 675)]: {
      paddingLeft: 0
    },
    [theme.breakpoints.down(435)]: {
      paddingLeft: 10
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
    marginBottom: 24,
    fontFamily: 'MTN',
    fontSize: 18,
    fontWeight: 600,
    padding: '0 24px 0 24px',
    [theme.breakpoints.between(600, 675)]: {
      paddingLeft: 0
    },
    [theme.breakpoints.down(435)]: {
      paddingLeft: 15
    }
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
