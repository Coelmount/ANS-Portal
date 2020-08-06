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
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '20px 40px'
  },
  closeButton: {
    position: 'absolute',
    right: '28px',
    top: 21,
    '& svg': {
      width: 27,
      height: 27
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
  modalContent: {
    paddingTop: 43,
    paddingLeft: 39
  },
  nameInput: {
    marginBottom: 30
  },
  modalContent: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 32
  },
  formWrap: {
    width: 500,
    height: 370,
    border: `1px solid ${theme.palette.silver}`,
    borderRadius: 3
  },
  formTitleWrap: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    padding: '0px 22px',
    background: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
    borderRadius: 3
  },
  formTitleLabel: {
    fontSize: 16,
    fontWeight: 600
  },
  formContentWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 36,
    '& > div': {
      marginBottom: 30
    }
  }
}))

export default useStyles
