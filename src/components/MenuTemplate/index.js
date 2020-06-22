import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { useSpring, animated } from 'react-spring'
import has from 'lodash/has'
import classnames from 'classnames'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useParams } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import SvgIcon from '@material-ui/core/SvgIcon'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { fade, makeStyles, withStyles } from '@material-ui/core/styles'

import EditIcon from 'source/images/svg/edit-blue.svg'
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined'
import ClearIcon from '@material-ui/icons/Clear'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'

import ConfigStore from 'stores/Config'
import IVRStore from 'stores/IVR'

import useStyles from './styles'
import Loading from 'components/Loading'

const MinusSquare = props => {
  const classes = useStyles()
  return (
    <Box className={classes.menuControlButtons}>
      <SvgIcon fontSize='inherit' style={{ width: 24, height: 24 }} {...props}>
        <RemoveIcon />
        {/* <path d='M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z' /> */}
      </SvgIcon>
    </Box>
  )
}

const PlusSquare = props => {
  const classes = useStyles()
  return (
    <Box className={classes.menuControlButtons}>
      <SvgIcon fontSize='inherit' style={{ width: 24, height: 24 }} {...props}>
        <AddIcon />
        {/* <path d='M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z' /> */}
      </SvgIcon>
    </Box>
  )
}

const CloseSquare = props => {
  const classes = useStyles()
  return (
    <Box className={classes.menuControlButtons}>
      <SvgIcon
        className='close'
        fontSize='inherit'
        style={{ width: 24, height: 24, opacity: 0.3 }}
        {...props}
      >
        <ClearIcon />
        {/* <path d='M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z' /> */}
      </SvgIcon>
    </Box>
  )
}

const TransitionComponent = props => {
  console.log(1, props)
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  })

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  )
}

const StyledTreeItem = props => {
  const {
    classes,
    menuItem,
    actions,
    index,
    changeKeysMenu,
    t,
    disabledFields,
    ...rest
  } = props

  return (
    <TreeItem
      {...rest}
      className={classnames(classes.treeItem, {
        [classes.firstTreeIconItem]: index === 0
      })}
      TransitionComponent={TransitionComponent}
      label={
        <Grid container spacing={1}>
          <Grid item xs={'auto'} className={classes.gridItem}>
            {index === 0 && t('keys')}
            <TextField
              color='primary'
              variant='outlined'
              value={menuItem.key}
              className={classes.keyInput}
              disabled={disabledFields}
              onChange={e => changeKeysMenu(index, 'key', e.target.value)}
            />
          </Grid>
          <Grid item xs={'auto'} className={classes.gridItem}>
            {index === 0 && t('description')}
            <TextField
              color='primary'
              variant='outlined'
              value={menuItem.description}
              className={classes.descriptionInput}
              disabled={disabledFields}
              onChange={e =>
                changeKeysMenu(index, 'description', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={'auto'} className={classes.gridItem}>
            {index === 0 && t('action')}
            <Select
              value={menuItem.action}
              variant='outlined'
              className={classes.actionSelect}
              disabled={disabledFields}
              onChange={e => changeKeysMenu(index, 'action', e.target.value)}
            >
              {actions.map(act => (
                <MenuItem key={act.action} value={act.action}>
                  {act.action}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={'auto'} className={classes.gridItem}>
            {index === 0 && t('action_data')}
            {/* <Select
              value={menuItem.parameter}
              variant='outlined'
              disabled={disabledFields}
              className={classes.actionDataSelect}
            ></Select> */}
            <TextField
              value={menuItem.parameter}
              variant='outlined'
              className={classes.descriptionInput}
              disabled={disabledFields}
              onChange={e => changeKeysMenu(index, 'parameter', e.target.value)}
            />
          </Grid>
        </Grid>
      }
    />
  )
}

const MenuTemplate = props => {
  const { t, menu, showTitle, menuType } = props
  const classes = useStyles()
  const [stateMenu, setStateMenu] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const match = useParams()

  const { getConfig, isLoadingConfig, config } = ConfigStore
  const { putUpdateIVRMenu } = IVRStore

  useEffect(() => {
    getConfig()
    setStateMenu(toJS(menu))
  }, [])

  const changeKeysMenu = (index, field, value) => {
    if (field === 'key' && !/^[\d\#\*]$/.test(value) && value !== '') {
      return
    }
    const newMenu = { ...stateMenu }
    newMenu.keys[index][field] = value
    setStateMenu(newMenu)
  }

  const updateMenu = () => {
    let data = {}
    switch (menuType) {
      case 'business_hours':
        data = {
          businessHoursMenu: { ...stateMenu }
        }
        break
      case 'after_hours':
        data = {
          afterHoursMenu: { ...stateMenu }
        }
        break
      case 'holidays':
        data = {
          holidayMenu: { ...stateMenu }
        }
        break
      default:
        return
    }
    putUpdateIVRMenu(
      match.customerId,
      match.groupId,
      match.ivrId,
      menuType,
      data
    )
  }

  if (isLoadingConfig) {
    return <Loading />
  }

  return (
    <React.Fragment>
      {showTitle && (
        <Box className={classes.titleBox}>
          <Input />
          {isEdit ? (
            <Box className={classes.editControlsButtons}>
              <Box className={classes.editControlsButtons}>
                <Button
                  variant={'contained'}
                  className={classes.roundEditControlsButton}
                  onClick={() => {
                    setIsEdit(false)
                    setStateMenu(toJS(menu))
                  }}
                >
                  <ClearIcon />
                </Button>
                <Box>{t('cancel')}</Box>
              </Box>
              <Box className={classes.editControlsButtons}>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  className={classes.roundEditControlsButton}
                  onClick={() => updateMenu()}
                >
                  <CheckIcon />
                </Button>
                <Box>{t('save')}</Box>
              </Box>
            </Box>
          ) : (
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.roundButton}
              onClick={() => setIsEdit(true)}
            >
              <img src={EditIcon} alt='EditIcon' />
            </Button>
          )}
        </Box>
      )}
      <Box className={classes.greetingBox}>
        <VolumeUpOutlinedIcon className={classes.volumeIcon} />
        <Box>{t('greeting')}:</Box>
        <Box className={classes.audioBox}>{menu.announcementSelection}</Box>
        <Button className={classes.roundButtonEdit}>
          <img src={EditIcon} alt='EditIcon' />
        </Button>
      </Box>
      <Box></Box>
      <Box>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
        >
          {has(stateMenu, 'keys') &&
            stateMenu.keys.map((el, i) => (
              <StyledTreeItem
                disabledFields={!isEdit}
                t={t}
                index={i}
                classes={classes}
                menuItem={el}
                nodeId={el.key}
                label={el.key}
                key={i}
                actions={config.group.ivr.allowed_actions}
                changeKeysMenu={changeKeysMenu}
              ></StyledTreeItem>
            ))}
        </TreeView>
      </Box>
    </React.Fragment>
  )
}

MenuTemplate.defaultProps = {
  showTitle: false
}

export default withNamespaces()(observer(MenuTemplate))
