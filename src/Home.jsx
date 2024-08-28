import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './components/ui/button'

const Home = () => {
  return (
    <div>
      <section>
        HOME
      </section>

      <SignInButton mode='modal' forceRedirectUrl='/'>
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  )
}

export default Home