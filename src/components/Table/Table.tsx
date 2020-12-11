import styled from 'styled-components'

const Table = styled.table`
  min-width: 375px;
  width: 100%;

  th,
  td {
    padding: 8px;
    vertical-align: middle;
  }

  thead {
    th,
    td {
      background-color: ${({ theme }) => theme.colors.tertiary};
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`

export default Table
