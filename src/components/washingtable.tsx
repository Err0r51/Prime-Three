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

export default function WashingTable(props: { washinglist: washinglist[] }) {
  const washinglist = props.washinglist

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
                <Td>{item.created_at}</Td>
                <Td>{item.id}</Td>
                <Td>{item.wash_type}</Td>
                <Td>{item.urgency}</Td>
                <Td>{item.restricted ? 'Yes' : 'No'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
