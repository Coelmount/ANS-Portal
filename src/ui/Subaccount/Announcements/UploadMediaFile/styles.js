import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '20px 44px'
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
  updateButton: {
    width: '160px',
    marginRight: '32px'
  },
  backButton: {
    width: '160px',
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
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    transform: 'translate(50%, -50%)',
    right: '50%'
  },
  uploadFileTitle: {
    fontFamily: 'MTN',
    fontSize: 24,
    fontWeight: 600
  },
  uploadFileInfo: {
    fontFamily: 'MTN',
    marginTop: 30
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
    display: 'flex',
    flexDirection: 'column'
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
  },
  inputName: {
    width: 'calc(100% - 20px)',
    '& .MuiOutlinedInput-root': {
      paddingLeft: 40
    }
  },
  audioBoxWrapper: {
    paddingTop: 40,
    paddingBottom: 40,
    borderBottom: `1px solid ${theme.palette.greyE8}`,
    display: 'flex',
    width: '100%'
  },
  inputAudio: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  indexBox: {
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    margin: '0 10px'
  },
  sizeBox: {
    display: 'flex',
    alignItems: 'flex-end',
    width: 80,
    marginBottom: 18
  },
  fakeInput: {
    marginTop: 30,
    backgroundColor: 'white',
    width: 'calc(100% - 20px)',
    height: 56,
    display: 'flex',
    alignItems: 'flex-end',
    border: '1px solid #cbcbcb',
    borderRadius: 4,
    paddingLeft: 12
  },
  fakeInputLabel: {
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    transform: 'translate(-18px, -50px) scale(0.75)',
    color: '#666666',
    padding: '0 8px',
    fontSize: 16
  },
  helperTextContainer: {
    marginLeft: 20
  },
  helperTextWrap: {
    margin: '0px 20px'
  }
}))

export default useStyles
