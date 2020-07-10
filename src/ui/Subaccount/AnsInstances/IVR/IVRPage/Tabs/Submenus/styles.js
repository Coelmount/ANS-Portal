import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  submenusBox: {
    marginTop: 30
  },
  summary: {
    borderBottom: '1px solid #eee'
  },
  roundButtonDelete: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  summaryTitleBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export default useStyles
