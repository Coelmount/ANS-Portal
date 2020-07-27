import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  },
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '25px 44px'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    '& > span > svg': {
      width: 25,
      height: 25
    }
  },
  dialogContent: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
    '& > div': {
      marginBottom: 30,
      width: 392
    }
  },
  dialogActions: {
    height: '110px',
    justifyContent: 'space-between'
  },
  backButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  nextButton: {
    width: '160px',
    marginRight: '32px'
  },
  noAnswerWrap: {
    display: 'flex'
  },
  noAnswerTitle: {
    marginLeft: 10
  },
  amountSkipRingsWrap: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      width: 261
    }
  },
  amountSkipRingsLeftTitle: {
    marginRight: 10,
    fontSize: 16,
    whiteSpace: 'nowrap'
  },
  amountSkipRingsRightTitle: {
    marginLeft: 10,
    fontSize: 16
  }
}))

export default useStyles
