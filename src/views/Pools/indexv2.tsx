import React from 'react'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import TableView from './TableView'

const Version2 = () => {
  return (
    <Page>
      <Container>
        <div style={{ paddingTop: '32px' }}>
          <TableView />
        </div>
      </Container>
    </Page>
  )
}

export default Version2
