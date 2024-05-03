import { Alert, AlertTitle, Snackbar } from '@mui/material'
import React from 'react'
import { createPortal } from 'react-dom'


const SnackbarAlert = ({close, type, text}) => {
  if (!type) {
    return
  }

  return (
    createPortal(
        <Snackbar open={type ? true : false} autoHideDuration={6000} onClose={close}>
            <Alert onClose={close} severity={type} sx={{ width: '100%' }}>
                <AlertTitle>{type}</AlertTitle>
                {text}
            </Alert>
        </Snackbar>,
        document.getElementById('overlay')
    )
  )
}

export default SnackbarAlert