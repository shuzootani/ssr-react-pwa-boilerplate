import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { StripeProvider } from 'react-stripe-elements'
import { AppConfig } from './utils/config'
import client from './apolloClient'

import Header from './components/Header'
import StoreDetail from '../src/pages/StoreDetail'
import Checkout from '../src/pages/Checkout'
import BasketContextProvider from './providers/BasketContextProvider'

require('./App.css')

function App () {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    setStripe(window.Stripe(AppConfig.STRIPE_PUBLIC_KEY))
  }, [])

  return (
    <ApolloProvider client={client}>
      <Header />
      <StripeProvider stripe={stripe}>
        <BasketContextProvider>
          <Route exact path='/' component={StoreDetail} />
          <Route path='/store/:storeId' component={StoreDetail} />
          <Route path='/checkout' component={Checkout} />
        </BasketContextProvider>
      </StripeProvider>
    </ApolloProvider>
  )
}

export default App
