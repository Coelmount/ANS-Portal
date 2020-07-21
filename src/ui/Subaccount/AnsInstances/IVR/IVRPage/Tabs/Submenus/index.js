import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import has from 'lodash/has'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/ExpansionPanel'
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary'
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails'

import MenuTemplate from 'components/MenuTemplate'
import Loading from 'components/Loading'
import DeleteModal from 'components/DeleteModal'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RemoveIcon from '@material-ui/icons/Clear'

import IVRStore from 'stores/IVR'
import AnnouncementsStore from 'stores/Announcements'
import PhoneNumbersStore from 'stores/PhoneNumbers'
import ConfigStore from 'stores/Config'

import useStyles from './styles'

const Submenus = props => {
  const { t } = props
  const {
    ivr,
    getSubmenus,
    isLoadingSubmenus,
    submenus,
    isLoadingIVR,
    deleteSubmenu,
    isDeletingSubmenu
  } = IVRStore
  const {
    getAnnouncements,
    isLoadingAnnouncements,
    announcements
  } = AnnouncementsStore
  const {
    transformedPhoneNumbers,
    isPhoneNumbersLoading,
    getPhoneNumbers
  } = PhoneNumbersStore
  const { getConfig, isLoadingConfig, config } = ConfigStore
  const classes = useStyles()
  const match = useParams()
  const [showDeleteSubmenu, setShowDeleteSubmenu] = useState(false)
  const [idForDelete, setIdForDelete] = useState(null)

  useEffect(() => {
    getSubmenus(match.customerId, match.groupId, match.ivrId)
    getAnnouncements(match.customerId, match.groupId)
    getPhoneNumbers(match.customerId, match.groupId, 1, 9999)
    getConfig()
  }, [])

  const handleDeleteSubmenus = id => {
    deleteSubmenu(match.customerId, match.groupId, match.ivrId, id, () => {
      setShowDeleteSubmenu(false)
      getSubmenus(match.customerId, match.groupId, match.ivrId)
    })
  }

  if (
    isLoadingSubmenus ||
    isLoadingAnnouncements ||
    isPhoneNumbersLoading ||
    isLoadingIVR ||
    isLoadingConfig
  ) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <Box className={classes.submenusBox}>
        <Button
          onClick={e => {
            setShowDeleteSubmenu(true)
          }}
        />
        {submenus.map((el, index) => (
          <Accordion key={el.submenuId}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.summary}
            >
              <Box className={classes.summaryTitleBox}>
                <Box>{`${index + 1}. ${el.submenuId}`}</Box>
                <Button
                  className={classes.roundButtonDelete}
                  onClick={e => {
                    e.stopPropagation()
                    setShowDeleteSubmenu(true)
                    setIdForDelete(el.submenuId)
                  }}
                >
                  <RemoveIcon />
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <MenuTemplate
                ivrType={ivr.type}
                menuLvl={'submenus'}
                menuType={el.submenuId}
                showTitle
                route={el.submenuId}
                countChild={1}
                announcements={announcements}
                refreshThree={() =>
                  getSubmenus(match.customerId, match.groupId, match.ivrId)
                }
                submenus={submenus}
                phoneNumbers={transformedPhoneNumbers}
                menuName={`${t('submenu')}: ${el.submenuId}`}
                singleLvl
                config={config}
              />
            </AccordionDetails>
          </Accordion>
        ))}
        {showDeleteSubmenu && (
          <DeleteModal
            open={showDeleteSubmenu}
            handleClose={() => setShowDeleteSubmenu(false)}
            deleteInfo={{ name: '', id: idForDelete }}
            deleteSubject={`${t('submenu').toLowerCase()}`}
            isDeleting={isDeletingSubmenu}
            handleDelete={handleDeleteSubmenus}
            action={t('to_delete')}
            titleAction={t(`delete`)}
            identifier={' '}
          />
        )}
      </Box>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(Submenus))
