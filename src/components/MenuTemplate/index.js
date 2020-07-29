import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { useSpring, animated } from 'react-spring'
import has from 'lodash/has'
import cloneDeep from 'lodash/cloneDeep'
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
import Tooltip from '@material-ui/core/Tooltip'
import PhoneInput from 'react-phone-input-2'

import { fade, makeStyles, withStyles } from '@material-ui/core/styles'

import EditIcon from 'source/images/svg/edit-blue.svg'
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined'
import ClearIcon from '@material-ui/icons/Clear'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

import AudioPlayer from 'components/AudioPlayer'
import Loading from 'components/Loading'
import EditGreeting from './EditGreeting'
import CustomSelect from 'components/Select'
import AddSubmenu from './AddSubmenu'

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
    deleteItemFromKeys,
    id,
    menuLvl,
    ivrType,
    announcements,
    submenus,
    phoneNumbers,
    config,
    ...rest
  } = props

  const [openCreateSubmenu, setOpenCreateSubmenu] = useState(false)

  const getActionData = () => {
    switch (menuItem.action) {
      case 'Go To Submenu':
        return (
          <Select
            value={menuItem.parameter ? menuItem.parameter : ''}
            onClick={e => {
              e.stopPropagation()
            }}
            variant='outlined'
            disabled={disabledFields}
            className={classes.actionSelect}
            onChange={e => handleChangeSubmenu(e.target.value)}
          >
            <MenuItem key={'create'} value={'create'}>
              {t('create_submenu')}
            </MenuItem>
            {submenus.map(el => (
              <MenuItem key={el.submenuId} value={el.submenuId}>
                {el.submenuId}
              </MenuItem>
            ))}
          </Select>
        )
      case 'Transfer To Number With Prompt':
        return (
          <PhoneInput
            value={menuItem.parameter ? menuItem.parameter : ''}
            onClick={e => {
              e.stopPropagation()
            }}
            placeholder={''}
            containerClass={classes.inputNumber}
            disabled={disabledFields}
            onChange={value => changeKeysMenu(id, 'parameter', value)}
          />
          // <Select
          //   value={menuItem.parameter ? menuItem.parameter : ''}
          //   onClick={e => {
          //     e.stopPropagation()
          //   }}
          //   variant='outlined'
          //   disabled={disabledFields}
          //   className={classes.actionSelect}
          //   onChange={e => changeKeysMenu(id, 'parameter', e.target.value)}
          // >
          //   {phoneNumbers.map(el => (
          //     <MenuItem key={el.phoneNumber} value={el.phoneNumber}>
          //       {el.phoneNumber}
          //     </MenuItem>
          //   ))}
          // </Select>
        )
      case 'Transfer To Number':
        return (
          <PhoneInput
            value={menuItem.parameter ? menuItem.parameter : ''}
            onClick={e => {
              e.stopPropagation()
            }}
            placeholder={''}
            containerClass={classes.inputNumber}
            disabled={disabledFields}
            onChange={value => changeKeysMenu(id, 'parameter', value)}
          />
        )
      case 'Play Announcement':
        return (
          <CustomSelect
            value={
              has(menuItem, 'parameter.name') ? menuItem.parameter.name : ''
            }
            onClick={e => {
              e.stopPropagation()
            }}
            variant='outlined'
            disabled={disabledFields}
            selectStyles={classes.select}
            onChange={e => changeKeysMenu(id, 'announcement', e.target.value)}
            options={announcements.map(el => ({
              value: el.name,
              label: el.name
            }))}
            icon={<VolumeUpOutlinedIcon />}
          />
          //   {announcements.map(el => (
          //     <MenuItem key={el.name} value={el.name}>
          //       {el.name}
          //     </MenuItem>
          //   ))}
          // </Select>
        )
      case 'Repeat Menu':
        return null
      case 'Exit':
        return null
      case 'Back To Parent Menu':
        return null
      default:
        return null
    }
  }

  const getOptionsForAction = () => {
    let options = []
    const ivtType = ''

    if (ivrType === 'Basic') {
      options = actions.filter(
        el =>
          el.action !== 'Go To Submenu' && el.action !== 'Back To Parent Menu'
      )
    } else if (menuLvl === 'menus') {
      options = actions.filter(el => el.action !== 'Back To Parent Menu')
    } else {
      options = actions
    }
    return options
  }

  const handleChangeSubmenu = menu => {
    if (menu === 'create') {
      setOpenCreateSubmenu(true)
      return
    }
    changeKeysMenu(id, 'parameter', menu)
  }

  return (
    <React.Fragment>
      <TreeItem
        {...rest}
        className={classes.treeItem}
        TransitionComponent={TransitionComponent}
        label={
          <Grid container spacing={1}>
            <Grid item xs={'auto'} className={classes.gridItem}>
              {index === 0 && t('keys')}
              <TextField
                onClick={e => {
                  e.stopPropagation()
                }}
                color='primary'
                variant='outlined'
                value={menuItem.key}
                className={classes.keyInput}
                disabled={disabledFields}
                onChange={e => changeKeysMenu(id, 'key', e.target.value)}
              />
            </Grid>
            <Grid item xs={'auto'} className={classes.gridItem}>
              {index === 0 && t('description')}
              <TextField
                onClick={e => {
                  e.stopPropagation()
                }}
                color='primary'
                variant='outlined'
                value={menuItem.description}
                className={classes.descriptionInput}
                disabled={disabledFields}
                onChange={e =>
                  changeKeysMenu(id, 'description', e.target.value)
                }
              />
            </Grid>
            <Grid item xs={'auto'} className={classes.gridItem}>
              {index === 0 && t('action')}
              <Select
                onClick={e => {
                  e.stopPropagation()
                }}
                value={menuItem.action}
                variant='outlined'
                className={classes.actionSelect}
                disabled={disabledFields}
                onChange={e => changeKeysMenu(id, 'action', e.target.value)}
              >
                {getOptionsForAction().map(act => (
                  <MenuItem key={act.action} value={act.action}>
                    {act.action}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={'auto'} className={classes.gridItem}>
              {index === 0 && t('action_data')}
              <Box className={classes.deleteBox}>
                {/* <Select
              value={menuItem.parameter}
              variant='outlined'
              disabled={disabledFields}
              className={classes.actionDataSelect}
            ></Select> */}
                {/* <TextField
                onClick={e => {
                  e.stopPropagation()
                }}
                value={menuItem.parameter}
                variant='outlined'
                className={classes.descriptionInput}
                disabled={disabledFields}
                onChange={e => changeKeysMenu(id, 'parameter', e.target.value)}
              /> */}
                <Box className={classes.actionDataBox}>{getActionData()}</Box>
                {!disabledFields && (
                  <Button
                    variant={'contained'}
                    className={classes.deleteKeyButton}
                    onClick={() => deleteItemFromKeys(id)}
                  >
                    <ClearIcon />
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        }
      />
      <AddSubmenu
        open={openCreateSubmenu}
        handleClose={() => setOpenCreateSubmenu(false)}
        setSubmenu={submenu => changeKeysMenu(id, 'parameter', submenu)}
        config={config}
      />
    </React.Fragment>
  )
}

const MenuTemplate = props => {
  const {
    t,
    showTitle,
    menuType,
    menuLvl,
    route,
    countChild,
    refreshThree,
    ivrType,
    announcements,
    submenus,
    phoneNumbers,
    menuName,
    singleLvl,
    config
  } = props
  const classes = useStyles()
  const [stateMenu, setStateMenu] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [isEditGreeting, setIsEditGreeting] = useState(false)

  const match = useParams()

  const {
    putUpdateIVRMenu,
    getGreetingAnnouncement,
    announcement,
    isLoadingAnnouncement,
    isLoadingMenu,
    menu,
    getMenu
  } = IVRStore

  useEffect(() => {
    getMenu(
      match.customerId,
      match.groupId,
      match.ivrId,
      menuLvl,
      menuType,
      route
    )
  }, [])

  useEffect(() => {
    setStateMenu(cloneDeep(menu[route]))
  }, [menu])

  const updateMenu = () => {
    const clearData = []
    for (let i = 0; i < stateMenu.keys.length; i++) {
      if (clearData.some(el => el.key === stateMenu.keys[i].key)) {
        const index = clearData.findIndex(
          el => el.key === stateMenu.keys[i].key
        )
        clearData.splice(index, 1)
        clearData.push(stateMenu.keys[i])
        continue
      }
      clearData.push(stateMenu.keys[i])
    }

    putUpdateIVRMenu(
      match.customerId,
      match.groupId,
      match.ivrId,
      menuLvl,
      menuType,
      {
        ...stateMenu,
        keys: clearData
      },
      successEdit
    )
  }

  const successEdit = () => {
    setIsEdit(false)
    getMenu(
      match.customerId,
      match.groupId,
      match.ivrId,
      menuLvl,
      menuType,
      route
    )
    refreshThree && refreshThree()
  }

  const changeKeysMenu = (id, field, value) => {
    const indexByKey = stateMenu.keys.findIndex(el => el.key === value)
    if (
      (field === 'key' && !/^[\d\#\*]$/.test(value) && value !== '') ||
      (stateMenu.keys.some(el => el.key === value) &&
        stateMenu.keys[indexByKey].action !== null)
    ) {
      return
    }
    const index = stateMenu.keys.findIndex(el => el.id === id)
    const keysMenu = cloneDeep(stateMenu.keys)
    if (field === 'key' && stateMenu.keys[index].key) {
      const prevKey = { ...keysMenu[index] }
      keysMenu[index].action = null
      keysMenu.splice(index, 0, {
        ...prevKey,
        key: value,
        id: keysMenu.length + 1 + Math.random()
      })
      setStateMenu({
        ...stateMenu,
        keys: keysMenu
      })
      return
    }
    if (field === 'announcement') {
      keysMenu[index].parameter = { name: value }
      setStateMenu({
        ...stateMenu,
        keys: keysMenu
      })
    }
    keysMenu[index][field] = value
    setStateMenu({
      ...stateMenu,
      keys: keysMenu
    })
  }

  const addKey = () => {
    const keysMenu = cloneDeep(stateMenu.keys)
    const id = keysMenu.length + 1 + Math.random()
    keysMenu.push({ key: '', description: '', action: '', parameter: '', id })
    setStateMenu({ ...stateMenu, keys: keysMenu })
  }

  const deleteItemFromKeys = id => {
    const keysMenu = cloneDeep(stateMenu.keys)
    const index = keysMenu.findIndex(el => el.id === id)
    keysMenu[index].action = null
    setStateMenu({ ...stateMenu, keys: keysMenu })
  }

  const closeEditGreeting = () => {
    refreshThree
      ? refreshThree()
      : getMenu(
          match.customerId,
          match.groupId,
          match.ivrId,
          menuLvl,
          menuType,
          route
        )
    setIsEditGreeting(false)
  }

  if (!stateMenu || stateMenu.isLoading) {
    return <Loading />
  }

  return (
    <Box className={!(countChild % 2) ? classes.secondTree : classes.tree}>
      {showTitle && (
        <Box className={classes.titleBox}>
          <Box>{menuName}</Box>
          {isEdit ? (
            <Box className={classes.editControlsButtons}>
              <Box className={classes.editControlsButtons}>
                <Button
                  variant={'contained'}
                  className={classes.roundEditControlsButton}
                  onClick={() => {
                    setIsEdit(false)
                    setStateMenu(cloneDeep(menu[route]))
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
            <Box className={classes.editButtonBox}>
              <Button
                variant={'contained'}
                color={'primary'}
                className={classes.roundButton}
                onClick={() => setIsEdit(true)}
              >
                <img src={EditIcon} alt='EditIcon' />
              </Button>
              <Box>{t('edit')}</Box>
            </Box>
          )}
        </Box>
      )}
      {has(stateMenu, 'announcementSelection') && (
        <Box className={classes.greetingBox}>
          <VolumeUpOutlinedIcon className={classes.volumeIcon} />
          <Box>{t('greeting')}:</Box>
          <Box className={classes.audioBox}>
            {has(stateMenu, 'announcementSelection') &&
            stateMenu.announcementSelection === 'Default' ? (
              <div>{stateMenu.announcementSelection}</div>
            ) : (
              <AudioPlayer
                titleComponent={
                  <div>
                    {has(stateMenu, 'audioFile.name') &&
                      stateMenu.audioFile.name}
                  </div>
                }
                url={announcement}
                isLoading={isLoadingAnnouncement}
                height={50}
                getAnnouncement={() =>
                  getGreetingAnnouncement(
                    match.customerId,
                    match.groupId,
                    stateMenu.audioFile.name
                  )
                }
              />
            )}
          </Box>
          <Button
            className={classes.roundButtonEdit}
            onClick={() => setIsEditGreeting(true)}
          >
            <img src={EditIcon} alt='EditIcon' />
          </Button>
          {isEditGreeting && (
            <EditGreeting
              open={isEditGreeting}
              handleClose={closeEditGreeting}
              announcements={announcements}
              menuLvl={menuLvl}
              menuType={menuType}
              defaultGreeting={stateMenu.announcementSelection}
              defaultAudioFile={
                has(stateMenu, 'audioFile.name') ? stateMenu.audioFile.name : ''
              }
              keys={stateMenu.keys}
            />
          )}
        </Box>
      )}
      <Box></Box>
      <Box>
        <Tooltip title={isEdit ? '' : t('menu_edit_tooltip')}>
          <TreeView
            key={route}
            className={classes.root}
            defaultCollapseIcon={isEdit || singleLvl ? null : <MinusSquare />}
            defaultExpandIcon={isEdit || singleLvl ? null : <PlusSquare />}
            defaultEndIcon={null}
          >
            {has(stateMenu, 'keys') &&
              stateMenu.keys
                .filter(el => el.action !== null)
                .map((el, i) => (
                  <StyledTreeItem
                    disabledFields={!isEdit}
                    t={t}
                    index={i}
                    classes={classes}
                    menuItem={el}
                    nodeId={el.key}
                    label={el.key}
                    key={el.id}
                    id={el.id}
                    actions={
                      has(config, 'group.ivr.allowed_actions')
                        ? config.group.ivr.allowed_actions
                        : []
                    }
                    changeKeysMenu={changeKeysMenu}
                    deleteItemFromKeys={deleteItemFromKeys}
                    menuLvl={menuLvl}
                    ivrType={ivrType}
                    announcements={announcements}
                    submenus={submenus}
                    phoneNumbers={phoneNumbers}
                    config={config}
                  >
                    {el.action === 'Go To Submenu' && el.parameter && (
                      <MenuTemplate
                        menuLvl={'submenus'}
                        menuType={el.parameter}
                        route={route + el.key}
                        t={t}
                        countChild={countChild + 1}
                        showTitle
                        refreshThree={successEdit}
                        announcements={announcements}
                        submenus={submenus}
                        phoneNumbers={phoneNumbers}
                        menuName={`${t('submenu')}: ${el.parameter}`}
                        config={config}
                      />
                    )}
                  </StyledTreeItem>
                ))}
          </TreeView>
        </Tooltip>
        {isEdit && (
          <Box className={classes.addItemBlock}>
            <Box>
              <Button
                variant={'contained'}
                color={'primary'}
                className={classes.roundEditControlsButton}
                onClick={addKey}
                disabled={
                  stateMenu.keys.filter(el => el.action !== null).length >= 12
                }
              >
                <AddIcon />
              </Button>
              {t('add')}
            </Box>
            <Box className={classes.keyInfoBox}>{t('add_key_info')}</Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

MenuTemplate.defaultProps = {
  showTitle: false,
  singleLvl: false
}

export default withNamespaces()(observer(MenuTemplate))
