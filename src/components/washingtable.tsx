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
import type { Database } from '../types/supabase'
import DeleteItem from '@/components/deletewashingitem'
type washinglist = Database['public']['Tables']['washinglist']['Row']

export default function WashingTable(props: { washinglist: washinglist[]; getWashinglist: () => void }) {
  const washinglist = props.washinglist
  console.log('table', washinglist)

  function formatTime(time: string | null) {
    const usedTime = new Date(time!)
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC' }).format(usedTime)
    return date.toLocaleString()
  }

  return (
    <div>
      <TableContainer>
        <Table variant='unstyled'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Wash Type</Th>
              <Th>To be washed until</Th>
              <Th>Wash with boys?</Th>
              <Th>Potential Washing Partners</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {washinglist.map(item => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.wash_type}</Td>
                <Td>{formatTime(item.urgency)}</Td>
                <Td>{item.restricted ? 'Yes' : 'No'}</Td>
                <Td>{item.other_user_id}</Td>
                <Td><DeleteItem getWashinglist={props.getWashinglist} id={item.id} washtype={item.wash_type} /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
