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
    width: '190px',
    marginRight: '32px'
  },
  updateButton: {
    width: '190px'
  },
  backButton: {
    width: '190px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  dialogActionsFirst: {
    height: '110px',
    justifyContent: 'center'
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
  },
  fileBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  fileName: {
    marginRight: 5
  },
  loadingBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  processWrapper: {
    fontFamily: 'MTN',
    fontSize: 18,
    marginTop: 20
  },
  statusesWrapper: {
    display: 'flex',
    fontFamily: 'MTN',
    fontSize: 18,
    fontWeight: 600
  },
  success: {
    color: 'green',
    marginRight: 10
  },
  refused: {
    color: 'blue',
    marginRight: 10
  },
  error: { color: theme.palette.darkRed, marginRight: 10 },
  resultsListWrapper: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
    fontFamily: 'MTN',
    fontSize: 18,
    fontWeight: 500
  },
  listBoxes: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

export default useStyles
