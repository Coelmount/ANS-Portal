import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import numbersStore from 'stores/Numbers'

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
    isLoadingReservedNumbers
  } = numbersStore
  const classes = useStyles()
  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [addedNumbers, setAddedNumber] = useState([])
  const [selectAllAddedNumbers, setSelectAllAddedNumbers] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [addedNumbersSub, setAddedNumberSub] = useState([])
  const [queryAvalibleNumbers, setQueryAvalibleNumbers] = useState({
    range_size: '',
    number_type: '',
    country_code: '',
    numbers_of_results: ''
  })
  const match = useParams()

  const searchAvalibleNumbers = () => {
    getAvailableNumbers(queryAvalibleNumbers).then(() => changeStep(2))
  }

  useEffect(() => {
    const createNumbers = []
    for (let i = 0; i < 70; i++) {
      createNumbers.push({ number: `+${24440400021 + i}`, checked: false })
    }
    getReservedNumbers(match.customerId)
    setNumbers(createNumbers)
  }, [])

  const selectNumbers = (checked, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.number === number)
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

  const fakePost = () => {
    const newNumbers = [...numbers]
    setAddedNumber(newNumbers.filter(el => el.checked))
    changeStep(3)
  }

  const selectNumbersAdded = (checked, number) => {
    const newNumbers = [...addedNumbers]
    const index = addedNumbers.findIndex(el => el.number === number)
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

  const fakePostSub = () => {
    const newNumbers = [...addedNumbers]
    setAddedNumberSub(newNumbers.filter(el => el.checked))
    changeStep(5)
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
      {reservedNumbers.length ? (
        <Steps
          step={step}
          handleClose={handleClose}
          changeStep={changeStep}
          numbers={reservedNumbers}
          selectNumbers={selectNumbers}
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
          fakePost={fakePost}
          addedNumbers={addedNumbers}
          selectAllAddedNumbers={selectAllAddedNumbers}
          selectNumbersAdded={selectNumbersAdded}
          handleSelectAllAdded={handleSelectAllAdded}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          fakePostSub={fakePostSub}
          addedNumbersSub={addedNumbersSub}
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
          // numbers={numbers}
          // selectNumbers={selectNumbers}
          // handleSelectAll={handleSelectAll}
          // selectAll={selectAll}
          // fakePost={fakePost}
          // addedNumbers={addedNumbers}
          // selectAllAddedNumbers={selectAllAddedNumbers}
          // selectNumbersAdded={selectNumbersAdded}
          // handleSelectAllAdded={handleSelectAllAdded}
          // selectedGroup={selectedGroup}
          // setSelectedGroup={setSelectedGroup}
          // fakePostSub={fakePostSub}
          // addedNumbersSub={addedNumbersSub}
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
          />
        )
      } else {
        return (
          <SecondStepNFNFailed
            handleClose={props.handleClose}
            changeStep={props.changeStep}
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
        <FirstStep
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
          fakePost={props.fakePost}
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
          fakePostSub={props.fakePostSub}
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
