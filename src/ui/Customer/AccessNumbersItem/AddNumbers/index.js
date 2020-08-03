import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import numbersStore from 'stores/Numbers'
import AssignedNumbersStore from 'stores/AssignedNumbers'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import SuccessPage from './SuccessPage'
import FirstStepSub from './FirstStepSub'
import SuccessPageSub from './SuccessPageSub'
import FirstStepNFN from './FirstStepNFN'
import SecondStepNFNFailed from './SecondStepNFNFailed'
import SecondStepNFNSuccess from './SecondStepNFNSuccess'
import AddedListStep from './AddedListStep'
import Loading from 'components/Loading'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  }
}))

const CreateCustomer = props => {
  const { open, handleClose, step, changeStep } = props
  const {
    getAvailableNumbers,
    availableNumbers,
    getReservedNumbers,
    reservedNumbers,
    isLoadingReservedNumbers,
    postResevedNumbersToCustomer,
    postAddedNumbersToSubaccaunt,
    setDefaultValue
  } = numbersStore
  const { currentEntitlement } = AssignedNumbersStore
  const classes = useStyles()
  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [addedNumbers, setAddedNumber] = useState([])
  const [selectAllAddedNumbers, setSelectAllAddedNumbers] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [addedNumbersSub, setAddedNumberSub] = useState([])
  const [queryAvalibleNumbers, setQueryAvalibleNumbers] = useState({
    range_size: '',
    number_type: '',
    country_code: '',
    numbers_of_results: ''
  })
  const match = useParams()

  const clearQueryParameters = () => {
    setQueryAvalibleNumbers({
      range_size: '',
      number_type: '',
      country_code: '',
      numbers_of_results: ''
    })
  }

  useEffect(() => {
    setDefaultValue()
  }, [])

  useEffect(() => {
    getReservedNumbers(
      match.customerId,
      currentEntitlement.country_code,
      currentEntitlement.number_type
    ).then(() => {
      setNumbers(reservedNumbers)
    })
  }, [reservedNumbers.length])

  const searchAvalibleNumbers = () => {
    getAvailableNumbers(queryAvalibleNumbers).then(() => changeStep(2))
  }

  const selectNumbers = (checked, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.nsn === number)
    newNumbers[index].checked = checked
    if (newNumbers.every(el => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setNumbers(newNumbers)
  }

  const handleSelectAll = () => {
    const newNumbers = numbers.map(el => ({ ...el, checked: !selectAll }))
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
  }

  const changeHover = (newHover, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.nsn === number)
    newNumbers[index].hover = newHover
    setNumbers(newNumbers)
  }

  const postAddNumbersToCustomer = () => {
    const newNumbers = [...numbers]
    const dataForPost = newNumbers
      .filter(number => number.checked)
      .map(el => ({
        country_code: `${el.country_code}`,
        range: [Number(el.nsn), Number(el.nsn)],
        service_capabilities: currentEntitlement.service_capabilities
      }))
    postResevedNumbersToCustomer(
      match.customerId,
      dataForPost,
      changeStep,
      3,
      setAddedNumber
    )
  }

  const selectNumbersAdded = (checked, number) => {
    const newNumbers = [...addedNumbers]
    const index = addedNumbers.findIndex(el => el.phoneNumber === number)
    newNumbers[index].checked = checked
    if (newNumbers.every(el => el.checked)) {
      setSelectAllAddedNumbers(true)
    } else {
      setSelectAllAddedNumbers(false)
    }
    setAddedNumber(newNumbers)
  }

  const handleSelectAllAdded = () => {
    const newNumbers = addedNumbers.map(el => ({
      ...el,
      checked: !selectAllAddedNumbers
    }))
    setAddedNumber(newNumbers)
    setSelectAllAddedNumbers(!selectAllAddedNumbers)
  }

  const changeHoverAddedNumbers = (newHover, number) => {
    const newNumbers = [...addedNumbers]
    const index = addedNumbers.findIndex(el => el.phoneNumber === number)
    newNumbers[index].hover = newHover
    setAddedNumber(newNumbers)
  }

  const postAssignNumbersToSubaccaunt = () => {
    const newNumbers = [...addedNumbers]
    const dataForPost = newNumbers
      .filter(number => number.checked)
      .map(el => ({
        range: [
          Number(el.phoneNumber.slice(currentEntitlement.country_code.length)),
          Number(el.phoneNumber.slice(currentEntitlement.country_code.length))
        ],
        country_code: `${currentEntitlement.country_code}`
      }))
    postAddedNumbersToSubaccaunt(
      match.customerId,
      selectedGroup,
      dataForPost,
      handleClose
    )
  }

  if (isLoadingReservedNumbers) {
    return (
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <Loading />
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      {numbers.length ? (
        <Steps
          step={step}
          handleClose={handleClose}
          changeStep={changeStep}
          numbers={numbers}
          selectNumbers={selectNumbers}
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
          postAddNumbersToCustomer={postAddNumbersToCustomer}
          addedNumbers={addedNumbers}
          selectAllAddedNumbers={selectAllAddedNumbers}
          selectNumbersAdded={selectNumbersAdded}
          handleSelectAllAdded={handleSelectAllAdded}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          postAssignNumbersToSubaccaunt={postAssignNumbersToSubaccaunt}
          addedNumbersSub={addedNumbersSub}
          changeHover={changeHover}
          changeHoverAddedNumbers={changeHoverAddedNumbers}
        />
      ) : (
        <StepsNotFoundNumbers
          step={step}
          handleClose={handleClose}
          changeStep={changeStep}
          queryAvalibleNumbers={queryAvalibleNumbers}
          setQueryAvalibleNumbers={setQueryAvalibleNumbers}
          searchAvalibleNumbers={searchAvalibleNumbers}
          availableNumbers={availableNumbers}
          clearQueryParameters={clearQueryParameters}
        />
      )}
    </Dialog>
  )
}

const StepsNotFoundNumbers = props => {
  switch (props.step) {
    case 1:
      return (
        <FirstStepNFN
          handleClose={props.handleClose}
          changeStep={props.changeStep}
          queryAvalibleNumbers={props.queryAvalibleNumbers}
          setQueryAvalibleNumbers={props.setQueryAvalibleNumbers}
          searchAvalibleNumbers={props.searchAvalibleNumbers}
        />
      )
    case 2:
      if (props.availableNumbers.length) {
        return (
          <SecondStepNFNSuccess
            handleClose={props.handleClose}
            changeStep={props.changeStep}
            clearQueryParameters={props.clearQueryParameters}
          />
        )
      } else {
        return (
          <SecondStepNFNFailed
            handleClose={props.handleClose}
            changeStep={props.changeStep}
            clearQueryParameters={props.clearQueryParameters}
          />
        )
      }
    case 3:
      return (
        <AddedListStep
          handleClose={props.handleClose}
          changeStep={props.changeStep}
        />
      )
    default:
      return (
        <FirstStepNFN
          handleClose={props.handleClose}
          changeStep={props.changeStep}
        />
      )
  }
}

const Steps = props => {
  switch (props.step) {
    case 1:
      return (
        <FirstStep
          numbers={props.numbers}
          handleClose={props.handleClose}
          changeStep={props.changeStep}
        />
      )
    case 2:
      return (
        <SecondStep
          numbers={props.numbers}
          handleClose={props.handleClose}
          changeStep={props.changeStep}
          selectNumbers={props.selectNumbers}
          handleSelectAll={props.handleSelectAll}
          selectAll={props.selectAll}
          postAddNumbersToCustomer={props.postAddNumbersToCustomer}
          changeHover={props.changeHover}
        />
      )
    case 3:
      return (
        <SuccessPage
          addedNumbers={props.addedNumbers}
          handleClose={props.handleClose}
          changeStep={props.changeStep}
        />
      )
    case 4:
      return (
        <FirstStepSub
          addedNumbers={props.addedNumbers}
          selectNumbers={props.selectNumbersAdded}
          handleSelectAll={props.handleSelectAllAdded}
          handleClose={props.handleClose}
          selectAllAddedNumbers={props.selectAllAddedNumbers}
          selectedGroup={props.selectedGroup}
          setSelectedGroup={props.setSelectedGroup}
          postAssignNumbersToSubaccaunt={props.postAssignNumbersToSubaccaunt}
          changeHoverAddedNumbers={props.changeHoverAddedNumbers}
        />
      )
    case 5:
      return (
        <SuccessPageSub
          handleClose={props.handleClose}
          addedNumbersSub={props.addedNumbersSub}
          selectedGroup={props.selectedGroup}
        />
      )
    default:
      return (
        <FirstStep
          numbers={props.numbers}
          handleClose={props.handleClose}
          changeStep={props.changeStep}
        />
      )
  }
}

export default withNamespaces()(observer(CreateCustomer))
