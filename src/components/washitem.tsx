import * as React from 'react'
import type { washinglist } from '../types/supabase'

export default function WashingItem(props: { washinglist: washinglist }) {
  const item = props.washinglist
  return (
    <div>Test</div>
  )
}
