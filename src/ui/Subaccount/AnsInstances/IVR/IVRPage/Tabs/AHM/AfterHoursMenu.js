import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import MenuTemplate from 'components/MenuTemplate'
import Loading from 'components/Loading'

import IVRStore from 'stores/IVR'
import AnnouncementsStore from 'stores/Announcements'
import PhoneNumbersStore from 'stores/PhoneNumbers'
import ConfigStore from 'stores/Config'

const AfterHoursMenu = props => {
  const { t } = props

  const {
    ivr,
    isLoadingIVR,
    getSubmenus,
    submenus,
    isLoadingSubmenus
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

  const match = useParams()

  useEffect(() => {
    getAnnouncements(match.customerId, match.groupId)
    ivr.type === 'Standard' &&
      getSubmenus(match.customerId, match.groupId, match.ivrId)
    getPhoneNumbers(match.customerId, match.groupId, 1, 9999)
    getConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (
    isLoadingIVR ||
    isLoadingAnnouncements ||
    isLoadingSubmenus ||
    isLoadingConfig ||
    isPhoneNumbersLoading
  ) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <MenuTemplate
        ivrType={ivr.type}
        menuType={'afterHours'}
        menuLvl={'menus'}
        showTitle
        route={'main'}
        countChild={1}
        announcements={announcements}
        submenus={submenus}
        phoneNumbers={transformedPhoneNumbers}
        menuName={t('main_ivr')}
        config={config}
      />
    </React.Fragment>
  )
}

export default withNamespaces()(observer(AfterHoursMenu))
