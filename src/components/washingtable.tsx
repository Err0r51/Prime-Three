import React from 'react'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type { washinglist } from '../types/supabase'
import DeleteItem from '@/components/deletewashingitem'

export default function WashingTable(props: { washinglist: washinglist[] }) {
  const washinglist = props.washinglist

  function formatTime(time: string | null) {
    const usedTime = new Date(time)
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC' }).format(usedTime)
    return date.toLocaleString()
  }

  return (
    <div>
      <TableContainer>
        <Table variant='unstyled'>
          <Thead>
            <Tr>
              <Th>Created at</Th>
              <Th>Id</Th>
              <Th>Wash Type</Th>
              <Th>Urgency</Th>
              <Th>Restricted</Th>
            </Tr>
          </Thead>
          <Tbody>
            {washinglist.map(item => (
              <Tr key={item.id}>
                <Td>{formatTime(item.created_at)}</Td>
                <Td>{item.id}</Td>
                <Td>{item.wash_type}</Td>
                <Td>{formatTime(item.urgency)}</Td>
                <Td>{item.restricted ? 'Yes' : 'No'}</Td>
                <Td><DeleteItem id={item.id} washtype={item.wash_type} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
