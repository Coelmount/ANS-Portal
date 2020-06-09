import React, { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import globalize from 'globalize'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'

import CustomContainer from 'components/CustomContainer'
import ExtendedTitleBlock from 'components/ExtendedTitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import AddPeriodModal from './components/AddPeriodModal'
import EditScheduleModal from './components/EditScheduleModal'

import * as dates from './dates'
import useStyles from './styles'
import 'react-big-calendar/lib/sass/styles.scss'
import editSvg from 'source/images/svg/edit-blue.svg'

const WeekSchedule = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const {
    getWeekSchedule,
    isWeekScheduleLoading,
    weekSchedulePeriods,
    setDefaultPeriods,
    findPeriodAndSetToEdit
  } = WeekSchedulesStore

  const [isAddPeriodModalOpen, setIsAddPeriodModalOpen] = useState(false)
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false)
  const [isSinglePeriodEditActive, setIsSinglePeriodEditActive] = useState(
    false
  )
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentPeriod, setCurrentPeriod] = useState(null)

  const isPeriodPopoverOpen = Boolean(anchorEl)
  const popoverId = isPeriodPopoverOpen ? 'period-popover' : undefined
  console.log(isPeriodPopoverOpen, popoverId, 'pop data')

  useEffect(() => {
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  }, [])

  // Add period(s)
  const handleOpenAddPeriodModal = () => {
    setIsAddPeriodModalOpen(true)
    setDefaultPeriods()
  }

  const handleCloseAddPeriodModal = () => {
    setIsAddPeriodModalOpen(false)
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  }

  // Periods and single edit modal open (isSinglePeriodEditActive === TRUE => open single)
  const handleEditScheduleClick = () => {
    setIsEditScheduleModalOpen(true)
  }

  const handleCloseEditScheduleModal = () => {
    setIsEditScheduleModalOpen(false)
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
    setDefaultPeriods()
    setIsSinglePeriodEditActive(false)
  }

  // Single event edit
  const handleEventClick = (event, e) => {
    setAnchorEl(e.currentTarget)
    // setIsEditScheduleModalOpen(true)
    // setIsSinglePeriodEditActive(true)
    // findPeriodAndSetToEdit(event)
  }

  const handlePopoverOpen = event => {
    console.log(event, 'event')
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const ExtraTitleBlock = (
    <Box className={classes.extraTitleBlock}>
      <Box className={classes.editIconWrap}>
        <img src={editSvg} className={classes.editIcon} alt='edit' />
      </Box>
    </Box>
  )

  const EventComponent = ({ event, title }) => {
    console.log(currentPeriod, 'currentPeriod')
    console.log(title, 'title')
    return (
      <Box>
        {/* {isPopoverOpen && (
          <Box style={{ position: 'absolute', top: '50%', right: '50%' }}>
            popover
          </Box>
        )} */}

        {/* <Box>
          <Popover
            id={popoverId}
            open={true}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
          >
            <Box>POPOVER MODAL</Box>
          </Popover>
        </Box> */}

        <p>title</p>
        {currentPeriod && title === currentPeriod && <div>modal</div>}
      </Box>
    )
  }

  const titleData = {
    mainText: `${t('week_schedules')}: ${match.weekScheduleName}`,
    iconCapture: t('add_slot'),
    Icon: <AddOutlinedIcon />,
    titleIcon: <img src={editSvg} className={classes.editIcon} alt='edit' />
  }

  // const events = [
  //   {
  //     id: 3,
  //     title: 'Meeting',
  //     start: new Date(2020, 5, 10, 10, 30),
  //     end: new Date(2020, 5, 10, 12, 30),
  //     desc: 'Pre-meeting meeting, to prepare for the meeting'
  //   }
  // ]

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        // backgroundColor: 'lightblue'
      }
    })

  const globalizeLocalizer = localizer(globalize)

  let formats = {
    dayFormat: 'ddd'
  }

  return (
    <Fragment>
      {isWeekScheduleLoading ? (
        <Loading />
      ) : (
        <Box
          onClick={event => console.log(event, 'click event')}
          className={classes.root}
        >
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <ExtendedTitleBlock
                titleData={titleData}
                handleClick={handleOpenAddPeriodModal}
                handleTitleIconClick={handleEditScheduleClick}
              />
            </CustomContainer>
            <Calendar
              events={weekSchedulePeriods}
              view='week'
              toolbar={false}
              formats={formats}
              defaultDate={new Date(2020, 5, 7)}
              components={{
                timeSlotWrapper: ColoredDateCellWrapper,
                event: EventComponent
                // event: EventWrapper
              }}
              localizer={globalizeLocalizer}
              onSelectEvent={(event, e) => {
                handleEventClick(event, e)
                setCurrentPeriod(event.title)
              }}

              // onSelectEvent={event => }
              // step={60}
              // showMultiDayTimes={false}
              // max={dates.add(
              //   dates.endOf(new Date(2015, 17, 1), 'day'),
              //   -1,
              //   'hours'
              // )}
            />
            {isAddPeriodModalOpen && (
              <AddPeriodModal
                open={isAddPeriodModalOpen}
                handleClose={handleCloseAddPeriodModal}
              />
            )}
            {isEditScheduleModalOpen && (
              <EditScheduleModal
                open={isEditScheduleModalOpen}
                handleClose={handleCloseEditScheduleModal}
                isSinglePeriodEditActive={isSinglePeriodEditActive}
              />
            )}
            {/* {isPopoverOpen && (
              <Box style={{ position: 'absolute', top: '50%', right: '50%' }}>
                popover
              </Box>
            )} */}
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(WeekSchedule)
