import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

import EditIcon from 'source/images/svg/edit-blue.svg'
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined'

import useStyles from './styles'

const MenuTemplate = props => {
  const { t, menu, showTitle } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      {showTitle && (
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
      )}
      <Box className={classes.greetingBox}>
        <VolumeUpOutlinedIcon />
        <Box>{t('greeting')}:</Box>
        <Box className={classes.audioBox}></Box>
      </Box>
      <Box></Box>
    </React.Fragment>
  )
}

MenuTemplate.defaultProps = {
  showTitle: false
}

export default withNamespaces(MenuTemplate)
