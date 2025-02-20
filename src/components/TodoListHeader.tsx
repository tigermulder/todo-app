import styled from 'styled-components'

const TodoListHeader = () => {
  return (
    <thead>
      <StyledHeader>
        <EmptyCol />
        <IndexCol>No</IndexCol>
        <TextCol>할 일</TextCol>
        <DeadlineCol>기한</DeadlineCol>
        <StatusCol>상태</StatusCol>
        <EditCol>수정</EditCol>
        <DeleteCol>삭제</DeleteCol>
      </StyledHeader>
    </thead>
  )
}

export default TodoListHeader

const StyledHeader = styled.tr`
  background-color: #fafafa;
  border-bottom: 1px solid #eaeaea;
  font-weight: 600;
  color: #666;

  th {
    padding: 15px 0;
  }
`

const EmptyCol = styled.th`
  width: 40px;
`

const IndexCol = styled.th`
  color: #ff4052;
  min-width: 40px;
`
const TextCol = styled.th`
  text-align: center;
`
const DeadlineCol = styled.th`
  width: 120px;
  text-align: center;
`
const StatusCol = styled.th`
  width: 80px;
  text-align: center;
`
const EditCol = styled.th`
  width: 60px;
  text-align: center;
`

const DeleteCol = styled.th`
  width: 60px;
  text-align: center;
`
