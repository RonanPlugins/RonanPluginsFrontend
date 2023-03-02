import React from 'react'
import { AuthContainer, AuthPage, Container } from '../components/Theme'
const Loading = () => {
  return (
      <>
          <Container>
              <AuthPage>
                  <AuthContainer>
                      Loading... Please Wait
                  </AuthContainer>
              </AuthPage>
      </Container>
      </>
  )
}

export default Loading