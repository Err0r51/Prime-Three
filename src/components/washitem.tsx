import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import type { washinglist } from '../types/supabase'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function WashingItem(props: { washinglist: washinglist }) {
  const item = props.washinglist
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" />}
      spacing={2}
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      <Item>ID: {item.id}</Item>
      <Item>Created at: {item.created_at}</Item>
      <Item>Urgency {item.urgency}</Item>
    </Stack>
  )
}
