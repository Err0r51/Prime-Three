import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { supabase } from '../utils/supabase'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Err0r51">
        Err0r51
      </Link>{' in '}
      {new Date().getFullYear()}
      {' @ Berkeley'}
    </Typography>
  )
}

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (await signIn())
      setSubmitted(true)
  }

  async function signIn() {
    if (!email) {
      // eslint-disable-next-line no-alert
      alert('Please enter an email')
      return false
    }
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST}/overview`,
      },
    })
    if (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
      return false
    }
    return true
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LocalLaundryServiceIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {
          submitted ?
            <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
              Please check your email for a login link
            </Typography> :
            <Box component="form" onSubmit={(event) => {
              void handleSubmit(event)
            }} noValidate sx={{ mt: 1 }}>
              <TextField
                type="text"
                onChange={e => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Sign In
              </Button>

            </Box>
        }
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
