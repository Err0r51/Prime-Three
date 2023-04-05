import React from 'react'
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type { match } from '../types/match'
import DeleteItem from '@/components/deletewashingitem'

export default function WashingTable(props: { washinglist: match[]; getWashinglist: () => void }) {
  const washinglist = props.washinglist
  function formatTime(time: string | null) {
    const usedTime = new Date(time!)
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC' }).format(usedTime)
    return date.toLocaleString()
  }

  return (
    <div>
      {washinglist.length === 0
        ? <Flex justify="center" align="center" mt={10}>
          It's really empty here - ready to do some laundry?
        </Flex> :
        <TableContainer>
          <Table variant='unstyled'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Wash Type</Th>
                <Th>To be washed until</Th>
                <Th>Gender restricted?</Th>
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
                  <Td>{item.matching_username}</Td>
                  <Td><DeleteItem getWashinglist={props.getWashinglist} id={item.id} washtype={item.wash_type} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      }
    </div>
  )
}
