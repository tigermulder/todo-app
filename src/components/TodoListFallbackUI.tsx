import styled from 'styled-components'

const TodoListFallbackUI = () => {
  return (
    <tr>
      <TableItem colSpan={7}>
        표시할 항목이 없습니다 새로 생성해주세요
      </TableItem>
    </tr>
  )
}

export default TodoListFallbackUI

const TableItem = styled.td`
  text-align: center;
  padding: 2rem 0 1rem;
`
