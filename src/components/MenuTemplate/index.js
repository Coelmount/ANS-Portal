import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import EditIcon from 'source/images/svg/edit-blue.svg'

import useStyles from './styles'

const MenuTemplate = props => {
  const { menu } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <Box className={classes.titleBox}>
        <Input />
        <Button
          variant={'contained'}
          color={'primary'}
          className={classes.roundButton}
        >
          <img src={EditIcon} alt='EditIcon' />
        </Button>
      </Box>
      <Box></Box>
      <Box></Box>
    </React.Fragment>
  )
}

export default MenuTemplate
