import styled from 'styled-components'

interface TdProps {
  align?: 'left' | 'center' | 'right'
  width?: string
}

const Td = styled.td<TdProps>`
  text-align: ${({ align = 'left' }) => align};
  width: ${({ width }) => width || 'initial'};
`

export default Td
