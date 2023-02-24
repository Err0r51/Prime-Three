import React from 'react'
import type { washinglist } from '../types/supabase'
import Washitem from '@/components/washitem'

export default function WashingTable(props: { washinglist: washinglist[] }) {
  const list = props.washinglist

  return (
    <div>
      <h1>Washinglist</h1>
    </div>
  )
}
