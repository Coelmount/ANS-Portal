import React, { useState, useEffect, useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import SuccessPage from './SuccessPage'
//import Entitlements from 'components/Entitlements'

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
  const classes = useStyles()
  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [addedNumbers, setAddedNumber] = useState([])

  useEffect(() => {
    const createNumbers = []
    for (let i = 0; i < 70; i++) {
      createNumbers.push({ number: `+${24440400021 + i}`, checked: false })
    }
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

  console.log(addedNumbers)

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps
        step={step}
        handleClose={handleClose}
        open={open}
        changeStep={changeStep}
        numbers={numbers}
        selectNumbers={selectNumbers}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
        fakePost={fakePost}
        addedNumbers={addedNumbers}
      />
    </Dialog>
  )
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
