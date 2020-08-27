import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import Papa from 'papaparse'
import classnames from 'classnames'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MaterialLink from '@material-ui/core/Link'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined'
import CloseIcon from '@material-ui/icons/Close'
import uploadIcon from 'source/images/svg/upload.svg'

import BasicTranslationsStore from 'stores/BasicTranslations'
import getNsnFromNumber from 'utils/phoneNumbers/getNsnFromNumber'

import useStyles from './styles'

const FirstStep = props => {
  const match = useParams()
  const { handleClose, setStep, numbers, t } = props
  const [csvValue, setCSVValue] = useState([])
  const [errorOdj, setErrorObj] = useState({
    showError: false,
    errorHeader: '',
    errorText: ''
  })
  const [disabledUpload, setDisabledUpload] = useState(true)
  const [file, setFile] = useState(null)
  const [fileKey, setFileKey] = useState('')
  const [uploading, setUploading] = useState(false)
  const {
    postAddMultipleANSBasic,
    setMultipleCounter,
    multipleCounter,
    setDefaultValues,
    isAnyAvailableNumbersSelected
  } = BasicTranslationsStore

  const classes = useStyles()

  useEffect(() => {
    if (csvValue.length !== 0) {
      setDisabledUpload(errorOdj.showError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csvValue.length])

  useEffect(() => {
    if (
      multipleCounter.total === multipleCounter.count &&
      uploading &&
      multipleCounter.total !== 0
    ) {
      setStep(2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleCounter.total, multipleCounter.count])

  useEffect(() => {
    setDefaultValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const downloadCSVFile = () => {
    const pom = document.createElement('a')
    const blob = new Blob(
      [
        'access_cc;access_number;destination_cc;destination_number\n+27;111111111;+32;111111111'
      ],
      { type: 'text/csv;charset=utf-8;' }
    )
    const url = URL.createObjectURL(blob)
    pom.href = url
    pom.setAttribute('download', 'template.csv')
    pom.click()
  }

  const downloadCSVFileWithSelected = () => {
    const selectedNumbers = numbers.filter(number => number.checked)
    const numbersToCSV = selectedNumbers.map(number => ({
      access_cc: number.country_code,
      access_number: getNsnFromNumber(number.phoneNumber),
      destination_cc: '',
      destination_number: ''
    }))

    const pom = document.createElement('a')
    const csvContent = Papa.unparse(JSON.stringify(numbersToCSV), {
      delimiter: ';',
      header: true
    })
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    pom.href = url
    pom.setAttribute('download', 'template.csv')
    pom.click()
  }

  const importFile = e => {
    const target = e.target
    if (!target.files.length) {
      setCSVValue({ csvValue: [] })
      return
    }
    if (
      !(
        target.files[0].type === 'application/vnd.ms-excel' ||
        target.files[0].type === 'text/csv'
      )
    ) {
      const errorHeader = t('invalid_type_file')
      const errorText = `${t('accepted_file_formats')}: csv`
      setErrorObj({
        showError: true,
        errorHeader,
        errorText
      })
      setDisabledUpload(true)
      return
    }
    let csvValueAfterParse
    readFile(target.files[0]).then(res => {
      csvValueAfterParse = csvParse(res)
      setMultipleCounter('total', csvValueAfterParse.length - 1)
      setFile(target.files[0])
      setCSVValue(csvValueAfterParse)
    })
  }

  const csvParse = file => {
    const csvArray = Papa.parse(file, { skipEmptyLines: true })
    if (csvArray.data[0].length !== 4) {
      const errorHeader = t('count_header_error')
      const errorText = t('count_header_error_text', { count: 4 })
      setErrorObj({ showError: true, errorHeader, errorText })
      setDisabledUpload(true)
      return []
    }
    if (
      csvArray.data[0].join() !==
      [
        'access_cc',
        'access_number',
        'destination_cc',
        'destination_number'
      ].join()
    ) {
      const errorHeader = t('invalid_headers')
      const errorText = `${t(
        'invalid_headers_text'
      )}: access_cc;access_number;destination_cc;destination_number`
      setErrorObj({ showError: true, errorHeader, errorText })
      setDisabledUpload(true)
      return []
    }
    for (let i = 1; i < csvArray.data.length; i++) {
      if (csvArray.data[i].length !== 4) {
        const errorHeader = t('count_columns_error')
        const errorText = t('count_columns_error_text', { count: 4 })
        setErrorObj({ showError: true, errorHeader, errorText })
        setDisabledUpload(true)
        return []
      }
    }
    return csvArray.data
  }

  const readFile = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const uploadFile = () => {
    setUploading(true)
    for (let i = 1; i < csvValue.length; i++) {
      const data = {
        cc_access_number: csvValue[i][0],
        access_number: csvValue[i][1],
        cc_destination_number: csvValue[i][2],
        destination_number: csvValue[i][3]
      }
      postAddMultipleANSBasic(match.customerId, match.groupId, data)
    }
  }

  return uploading ? (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_multiple_ans_basic_instances')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box className={classes.loadingBox}>
        <CircularProgress
        // variant='static'
        // value={(100 * multipleCounter.count) / multipleCounter.total}
        />
        <Box className={classes.processWrapper}>
          <strong>{multipleCounter.count}</strong> {t('done_of')}{' '}
          <strong>{`${multipleCounter.total} (${(
            (100 * multipleCounter.count) /
            multipleCounter.total
          ).toFixed(2)}%)`}</strong>
        </Box>
        <Box className={classes.statusesWrapper}>
          <Box className={classes.success}>{`${t('success')}: ${
            multipleCounter.success
          }`}</Box>
          <Box className={classes.refused}>{`${t('refused')}: ${
            multipleCounter.refused
          }`}</Box>
          <Box className={classes.error}>{`${t('error')}: ${
            multipleCounter.error
          }`}</Box>
        </Box>
      </Box>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_multiple_ans_basic_instances')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.stepStyles}>{`${t('step')} 1/2`}</Box>
        <Box className={classes.infoBoxWrapper}>
          <InfoOutlinedIcon />
          <Box className={classes.infoBoxContent}>
            <Box className={classes.infoTitle}>{t('required_file_format')}</Box>
            <Box className={classes.infoTextTitle}>{`${t(
              'required_separator'
            )}: ;`}</Box>
            <Box className={classes.infoTextTitle}>{`${t(
              'header'
            )}: access_cc;access_number;destination_cc;destination_number`}</Box>
            <Box className={classes.infoTextTitle}>{`${t(
              'rows'
            )}: +27;111111111;+32;111111111`}</Box>
          </Box>
        </Box>

        <Box className={classes.uploadBoxWrapper}>
          <Box
            className={classnames(classes.uploadFileTitle, {
              [classes.disabledTitle]: !isAnyAvailableNumbersSelected
            })}
          >
            {t('download_selected_templete')}
          </Box>
          <Box>
            <Button
              variant='contained'
              color='primary'
              className={classes.uploadButton}
              onClick={downloadCSVFileWithSelected}
              disabled={!isAnyAvailableNumbersSelected}
            >
              <GetAppOutlinedIcon className={classes.downloadIcon} />
            </Button>
          </Box>
        </Box>

        <Box className={classes.uploadBoxWrapper}>
          <Box className={classes.uploadFileTitle}>
            {t('download_template_file')}
          </Box>
          <Box>
            <Button
              variant='contained'
              color='primary'
              className={classes.uploadButton}
              onClick={downloadCSVFile}
            >
              <GetAppOutlinedIcon className={classes.downloadIcon} />
            </Button>
          </Box>
        </Box>

        <Box className={classes.uploadBoxWrapper}>
          <Box className={classes.uploadFileTitle}>{t('upload_csv_file')}</Box>
          <Box>
            <input
              className={classes.uploadInput}
              id='contained-button-file'
              type='file'
              accept='text/csv'
              onChange={importFile}
              key={fileKey}
            />
            <label htmlFor='contained-button-file'>
              <Button
                variant='contained'
                color='primary'
                className={classes.uploadButton}
                component='span'
              >
                <img
                  className={classes.downloadIcon}
                  src={uploadIcon}
                  alt='upload-icon'
                  //className={classes.accountNameIcon}
                />
              </Button>
            </label>
          </Box>
          {file && (
            <Box className={classes.fileBox}>
              <Box className={classes.fileName}>{file.name} </Box>
              <MaterialLink
                component='button'
                variant='body2'
                onClick={() => {
                  setFileKey(new Date())
                  setDisabledUpload(true)
                  setErrorObj({ showError: false })
                  setCSVValue([])
                  setFile(null)
                }}
              >
                x
              </MaterialLink>
            </Box>
          )}
        </Box>
        {errorOdj.showError && (
          <Box>
            <Alert severity='error'>
              <AlertTitle>{errorOdj.errorHeader}</AlertTitle>
              {errorOdj.errorText}
            </Alert>
          </Box>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActionsFirst}>
        <Button
          variant='contained'
          color='primary'
          className={classes.updateButton}
          disabled={disabledUpload}
          onClick={uploadFile}
        >
          {t('upload')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
