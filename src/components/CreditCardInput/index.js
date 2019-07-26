import React from 'react'
import { Elements, CardElement } from 'react-stripe-elements'
import Color from '../../utils/color'

const styles = {
  input: {
    base: {
      color: Color.DarkGreen,
      fontWeight: 'bold'
    }
  }
}

function CreditCardInput (props) {
  return (
    <Elements>
      <CardElement {...props} onReady={el => el.focus()} style={styles.input} />
    </Elements>
  )
}

export default CreditCardInput
