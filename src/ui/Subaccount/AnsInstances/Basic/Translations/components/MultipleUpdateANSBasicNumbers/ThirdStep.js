import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import Papa from 'papaparse'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import CloseIcon from '@material-ui/icons/Close'

import BasicTranslationsStore from 'stores/BasicTranslations'

import useStyles from './styles'

const ThirdStep = props => {
  const { handleClose, t } = props
  const {
    successAdded,
    refusedAdded,
    errorAdded,
    multipleCounter
  } = BasicTranslationsStore

  const classes = useStyles()

  const downloadNumbers = (numbers, name) => {
    const pom = document.createElement('a')
    const csvContent = Papa.unparse(JSON.stringify(numbers), {
      delimiter: ';',
      header: true
    })
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    pom.href = url
    pom.setAttribute('download', `${name}.csv`)
    pom.click()
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('update_ans_basic_instances')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.secondStepTitleBlock}>
          <Box className={classes.stepStyles}>{`${t('step')} 2/2`}</Box>
          <Box className={classes.secondStepTitleInfo}>
            {t('list_of_resilts')}
          </Box>
        </Box>
        <Box className={classes.resultsListWrapper}>
          <Box>{`${t('total_rows_processed')}: ${multipleCounter.count}`}</Box>
          <Box className={classes.listBoxes}>
            <Box className={classes.success}>{`${t('success')}: ${
              multipleCounter.success
            } (${(
              (100 * multipleCounter.success) /
              multipleCounter.total
            ).toFixed(2)}%)`}</Box>
            <Button
              variant='outlined'
              color='primary'
              disabled={successAdded.length === 0}
              onClick={() => downloadNumbers(successAdded, 'success')}
            >
              {t('download_csv_with_those_rows')}
            </Button>
          </Box>
          <Box className={classes.listBoxes}>
            <Box className={classes.refused}>{`${t('refused')}: ${
              multipleCounter.refused
            } (${(
              (100 * multipleCounter.refused) /
              multipleCounter.total
            ).toFixed(2)}%)`}</Box>
            <Button
              variant='outlined'
              color='primary'
              disabled={refusedAdded.length === 0}
              onClick={() => downloadNumbers(refusedAdded, 'refused')}
            >
              {t('download_csv_with_those_rows')}
            </Button>
          </Box>
          <Box className={classes.listBoxes}>
            <Box className={classes.error}>{`${t('error')}: ${
              multipleCounter.error
            } (${(
              (100 * multipleCounter.error) /
              multipleCounter.total
            ).toFixed(2)}%)`}</Box>
            <Button
              variant='outlined'
              color='primary'
              disabled={errorAdded.length === 0}
              onClick={() => downloadNumbers(errorAdded, 'error')}
            >
              {t('download_csv_with_those_rows')}
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsFirst}>
        {/* <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() =>
            downloadNumbers(
              [
                ...successAdded.map(el => ({ ...el, status: 'success' })),
                ...refusedAdded.map(el => ({ ...el, status: 'refused' })),
                ...errorAdded.map(el => ({ ...el, status: 'error' }))
              ],
              'output'
            )
          }
        >
          {t('see_detailed_output')}
        </Button> */}
        <Button
          variant='contained'
          color='primary'
          className={classes.updateButton}
          onClick={() => handleClose()}
        >
          {`${t('done')}`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(ThirdStep))
