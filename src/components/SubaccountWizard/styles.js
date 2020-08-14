import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: 24,
      color: theme.palette.black
    },
    height: 220,
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  stepStyles: {
    marginTop: 18,
    marginLeft: 40,
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey40
  },
  nextButton: {
    width: 160,
    marginRight: 32,
    fontWeight: 600
  },
  backButton: {
    width: 160,
    marginLeft: 32,
    color: theme.palette.black,
    fontWeight: 600
  },
  dialogActionsSecond: {
    height: 110,
    justifyContent: 'space-between'
  },
  checkInfoBox: {
    marginTop: 10,
    marginLeft: 66,
    display: 'flex',
    alignItems: 'center'
  },
  accountIcon: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginBottom: 10
  },
  adminName: {
    fontSize: 16
  },
  titleContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  checkIcon: {
    marginRight: 5
  },
  boldText: {
    fontWeight: 600,
    marginRight: 5
  },
  regularText: {
    marginRight: 5
  },
  iconRoundBox: {
    marginRight: 5,
    background: '#F4F4F4',
    height: 30,
    width: 30,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  supportText: {
    marginTop: 8,
    marginLeft: 112
  },
  boldMTNText: {
    fontWeight: 600,
    marginRight: 5,
    fontFamily: 'MTN'
  },
  wrapperBox: {
    padding: '5px 0 5px 5px',
    height: 40,
    marginRight: 5,
    background: '#F4F4F4',
    display: 'flex',
    alignItems: 'center'
  },
  iconMainRoundBox: {
    marginRight: 5,
    background: '#FFCC00',
    height: 30,
    width: 30,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepper: {
    '& .MuiMobileStepper-dotActive': {
      background: '#00678F'
    },
    '& .MuiMobileStepper-dot': {
      marginRight: 16,
      width: 10,
      height: 10
    },
    alignSelf: 'center'
  },
  mainContent: { flexGrow: 1 },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  boldMTNTextSecondary: {
    fontWeight: 600,
    marginRight: 5,
    fontFamily: 'MTN',
    color: '#00678F'
  },
  checkInfoBoxNoIcon: {
    marginTop: 36,
    marginLeft: 112,
    display: 'flex',
    alignItems: 'center'
  },
  dialogActionsTS: {
    height: 110,
    justifyContent: 'center'
  },
  instructionBox: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 122,
    marginTop: 18
  },
  roundBoxTS: {
    width: 45,
    height: 45,
    borderRadius: 100,
    background: '#fff',
    boxShadow: '0px 8px 4px rgba(204, 204, 204, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topLine: {
    '&:before': {
      content: '""',
      height: 24,
      border: 'solid 1px #00678F',
      position: 'absolute',
      top: 82
    }
  },
  bottomLine: {
    '&:before': {
      content: '""',
      height: 24,
      border: 'solid 1px #00678F',
      position: 'absolute',
      bottom: 82
    }
  },
  bottomTextAdvanced: {
    color: '#00678F',
    position: 'absolute',
    marginTop: 24,
    marginLeft: -10
  },
  bottomTextIVR: {
    color: '#00678F',
    position: 'absolute',
    marginTop: 24,
    marginLeft: 14
  },
  topTextTBR: {
    color: '#00678F',
    position: 'absolute',
    marginTop: -46,
    marginLeft: -38
  },
  topTextBasic: {
    color: '#00678F',
    position: 'absolute',
    marginTop: -46,
    marginLeft: 6
  },
  ansInstanceBox: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  instanceBox: {
    width: 114,
    height: 104,
    marginTop: 20,
    background: '#fff',
    boxShadow: '0px 4px 16px rgba(196, 196, 196, 0.25)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 18
  },
  borderInstance: {
    borderBottom: '4px solid #FFCC00'
  },
  textInstance: {
    marginTop: 16,
    fontFamily: 'MTN',
    textAlign: 'center',
    fontSize: 14
  },
  iconsInstance: {
    width: 26,
    height: 26
  },
  instanceInfoBox: {
    marginTop: 20,
    marginLeft: 40,
    textAlign: 'justify',
    marginRight: 30
  },
  tabsBox: {
    position: 'relative',
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 40,
    marginRight: 30
  },
  tabs: {
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
    borderRight: '0.5px solid #CCCCCC',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  lastTab: {
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  bottomRoundIcon: {
    color: '#00678F',
    position: 'absolute',
    bottom: 62,
    width: 20,
    height: 20,
    borderRadius: 20,
    background: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(204, 204, 204, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topRoundIcon: {
    color: '#00678F',
    position: 'absolute',
    top: 62,
    width: 20,
    height: 20,
    borderRadius: 20,
    background: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(204, 204, 204, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomInfoBox: {
    position: 'absolute',
    display: 'flex',
    bottom: 40
  },
  topInfoBox: {
    position: 'absolute',
    display: 'flex',
    top: 40
  }
}))

export default useStyles
