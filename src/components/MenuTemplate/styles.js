import { fade, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
    marginTop: 10,
    marginBottom: 10,
    borderLeft: '4px solid #00678F',
    paddingLeft: 10
  },
  greetingBox: {
    width: '100%',
    height: 94,
    borderBottom: '1px solid #E8E8E8',
    paddingLeft: 44,
    display: 'flex',
    alignItems: 'center'
  },
  audioBox: {
    width: 476,
    height: 46,
    background: 'white',
    marginRight: 16,
    marginLeft: 16
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
      height: 50
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
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    '& .MuiTreeItem-group': {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
    }
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  firstTreeIconItem: {
    '& .MuiTreeItem-iconContainer': {
      marginTop: 22
    }
  }
}))

export default useStyles
