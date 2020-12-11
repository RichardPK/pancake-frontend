import styled from 'styled-components'

interface ThProps {
  align?: 'left' | 'center' | 'right'
  width?: string
}

const Th = styled.td<ThProps>`
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  padding: 8px;
  text-align: ${({ align = 'left' }) => align};
  width: ${({ width }) => width || 'initial'};
`

export default Th
