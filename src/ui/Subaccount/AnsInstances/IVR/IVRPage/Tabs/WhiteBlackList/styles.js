import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  mainBox: {
    width: '50%',
    marginTop: 40
  },
  formControl: {
    width: '100%',
    background: 'transparent'
  },
  radioGroup: {
    flexDirection: 'row'
  },
  formControlLabel: {
    display: 'flex',
    alignItems: 'center'
  },
  icons: {
    marginRight: 8
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
  checkboxCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'inherit',
    paddingTop: 10
  },
  roundButtonDelete: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  deleteSelectedButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0
  },
  deleteIcon: {
    width: 14,
    height: 16
  },
  checkbox: {
    boxShadow: '0px 2px 4px rgba(204, 204, 204, 0.25)',
    width: '18px',
    height: '18px',
    marginRight: '-14px',
    padding: 0,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiIconButton-root': {
      padding: 0
    }
  },
  tableBox: {
    marginTop: 40
  }
}))

export default useStyles
