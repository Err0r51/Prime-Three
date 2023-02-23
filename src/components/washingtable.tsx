import React from 'react'
import Grid from '@mui/material/Grid'
import type { washinglist } from '../types/supabase'
import Washitem from '@/components/washitem'

export default function WashingTable(props: { washinglist: washinglist[] }) {
  const Content = () => {
    return (
      <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center">
        {props.washinglist.map((obj) => {
          return (
            <Grid item xs={12} sm={4}>
                <Washitem washinglist={obj} />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <div>
      {Content()}
    </div>
  )
}
