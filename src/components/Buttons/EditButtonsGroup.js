import { Button, Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors'
import React from 'react'


const theme = createTheme({
    palette: {
      primary: {
        main: grey[300],
      },
      secondary: {
        main: '#a5d6a7',
      },
    },
  })

const EditButtonsGroup = ({margin = false, cancelClickHandler}) => {
  return (
        <Stack direction='row' spacing={2} mb={margin && 5} mt={margin && 1}>
              <ThemeProvider theme={theme}>
                <Button variant='contained' size='small' onClick={cancelClickHandler}
                >cancel</Button>
                <Button variant='contained' size='small' color='success' type='submit'>save</Button>
            </ThemeProvider>
        </Stack>
  )
}

export default EditButtonsGroup