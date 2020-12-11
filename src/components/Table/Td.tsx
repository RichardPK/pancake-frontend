import styled from 'styled-components'

interface TdProps {
  align?: 'left' | 'center' | 'right'
  width?: string
}

const Td = styled.td<TdProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  text-align: ${({ align = 'left' }) => align};
  padding: 16px 8px;
  width: ${({ width }) => width || 'initial'};
  vertical-align: middle;
`

export default Td
