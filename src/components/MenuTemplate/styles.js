import { fade, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  secondTree: {
    marginTop: 10,
    padding: 10,
    background: '#F4F4F4'
  },
  tree: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    background: '#F9F9F9'
  },
  roundButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 25,
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    borderLeft: '4px solid #00678F'
  },
  greetingBox: {
    width: '100%',
    height: 84,
    paddingLeft: 44,
    display: 'flex',
    alignItems: 'center'
  },
  audioBox: {
    width: 476,
    height: 46,
    background: 'white',
    marginRight: 16,
    marginLeft: 16,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  roundButtonEdit: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  volumeIcon: {
    marginRight: 10
  },
  menuControlButtons: {
    width: 24,
    height: 24,
    background: '#FFFFFF',
    boxShadow: '0px 2px 4px rgba(204, 204, 204, 0.25)',
    borderRadius: 3
  },
  keyInput: {
    '&.MuiFormControl-root': {
      width: 50,
      height: 50
    },
    '& .MuiInputBase-root': {
      height: 50
    }
  },
  descriptionInput: {
    '&.MuiFormControl-root': {
      width: 254,
      height: 50
    },
    '& .MuiInputBase-root': {
      height: 50
    }
  },
  actionSelect: {
    '&.MuiInputBase-root': {
      width: 254,
      height: 50,
      backgroundColor: 'white'
    }
  },
  actionDataSelect: {
    '&.MuiInputBase-root': {
      width: 254,
      height: 50
    }
  },
  treeItem: {
    marginTop: 14,
    '&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    '& .MuiTreeItem-label:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    '& .MuiTreeItem-group': {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
    },
    '&:first-child > .MuiTreeItem-content > .MuiTreeItem-iconContainer': {
      marginTop: 22
    }
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  // firstTreeIconItem: {
  //   '& .MuiTreeItem-iconContainer': {
  //     marginTop: 22
  //   }
  // },
  editControlsButtons: {
    display: 'flex',
    fontFamily: 'MTN',
    alignItems: 'center',
    marginLeft: 30
  },
  roundEditControlsButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    marginRight: 5
  },
  deleteKeyButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    background: 'white',
    marginLeft: 12
  },
  deleteBox: {
    display: 'flex',
    alignItems: 'center'
  },
  addItemBlock: {
    marginLeft: 24,
    marginTop: 24
  },
  keyInfoBox: {
    marginTop: 20
  },
  rootEditGreeting: {
    '& .MuiDialog-paperWidthSm': {
      width: '650px'
    },
    '& .MuiDialog-paperScrollPaper': {
      height: 540
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  dialogActions: {
    height: '110px',
    justifyContent: 'space-between'
  },
  cancelButton: {
    width: '160px',
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  assignButton: {
    width: '160px',
    marginRight: '32px'
  },
  radioForm: {
    background: 'transparent'
  },
  radioIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 100,
    boxShadow: '0px 2px 4px #C4C4C4'
  },
  checkedRadioIcon: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 100,
    boxShadow: '0px 2px 4px #C4C4C4',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#FFCC00,#FFCC00 40%,transparent 50%)',
      content: '""'
    }
  },
  select: {
    width: 254,
    height: 50
  },
  personalBox: {
    display: 'flex'
  },
  actionDataBox: {
    width: 254,
    height: 50
  }
}))

export default useStyles
