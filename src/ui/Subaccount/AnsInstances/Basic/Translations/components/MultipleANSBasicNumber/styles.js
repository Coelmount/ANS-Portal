import { makeStyles } from '@material-ui/core/styles'
import { borderRadius } from '@material-ui/system'

const useStyles = makeStyles(theme => ({
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '20px 24px'
  },
  closeButton: {
    position: 'absolute',
    right: '10px'
  },
  stepStyles: {
    marginTop: '32px',
    marginLeft: 'calc(40px - 24px)',
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: '16px',
    color: theme.palette.grey40
  },
  nextButton: {
    width: '160px',
    marginRight: '32px'
  },
  backButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between'
  },
  infoBoxWrapper: {
    marginTop: 10,
    marginLeft: 40,
    display: 'flex',
    flexDirection: 'row'
  },
  infoBoxContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10
  },
  infoTextTitle: {
    marginTop: 20,
    fontSize: 16
  },
  infoTextRequirement: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 600
  },
  infoTitle: {
    fontFamily: 'MTN',
    fontSize: 18,
    fontWeight: 600
  },
  uploadBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'column'
  },
  uploadFileTitle: {
    fontFamily: 'MTN',
    fontSize: 24,
    fontWeight: 600
  },
  uploadButton: {
    height: 44,
    width: 44,
    minWidth: 44,
    borderRadius: 100,
    marginTop: 30
  },
  uploadInput: {
    display: 'none'
  },
  secondStepTitleBlock: {
    display: 'flex'
  },
  secondStepTitleInfo: {
    marginTop: '32px',
    marginLeft: 10,
    fontFamily: 'MTN',
    fontWeight: 600,
    fontSize: '18px'
  }
}))

export default useStyles