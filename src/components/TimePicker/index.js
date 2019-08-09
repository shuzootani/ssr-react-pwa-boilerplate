import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { generateValidPickupTimes, getStoreSchedule } from '../../utils/time'
import Color from '../../utils/color'
import FooterButton from '../../components/FooterButton'
import Button from '../Button'
import { HeaderSmall } from '../Text'

const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const ModalTitle = styled(HeaderSmall)``

const TimePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const PickerItem = styled.div`
  background: ${Color.LightGrey};
  font-size: 1.5rem;
`

const SettleButton = styled(Button)`
  width: min-content;
`

function generatePickerLabels (timeSelection) {
  const hours = []
  const minutes = []
  const minHour = timeSelection[0].value.get('hours')
  const maxHour = timeSelection[timeSelection.length - 1].value.get('hours')

  for (let i = minHour; i <= maxHour; i++) {
    // eslint-disable-line no-plusplus
    const label = i < 10 ? `0${i}` : i.toString()
    hours.push({ label, type: 'hour' })
  }

  for (let i = 0; i < 60; i++) {
    // eslint-disable-line no-plusplus
    const label = i < 10 ? `0${i}` : i.toString()
    minutes.push({ label, type: 'minute' })
  }

  return { hours, minutes }
}

function TimePicker ({ store, onChange }) {
  const now = useMemo(() => moment(), [])
  const [values, setValues] = useState({
    hour: String(now.hour()),
    minute: String(now.minute())
  })

  const storeSchedule = useMemo(() => getStoreSchedule(store.opening_hours), [
    store
  ])
  const dateSelection = Object.keys(storeSchedule)
  const schedule = dateSelection[0]
  const timeSelection = useMemo(
    () =>
      generateValidPickupTimes(storeSchedule, schedule, store.min_order_time),
    [storeSchedule, schedule, store]
  )

  const pickerLabels = useMemo(() => generatePickerLabels(timeSelection), [
    timeSelection
  ])

  const options = useMemo(
    () => ({
      hour: pickerLabels.hours.map(h => h.label),
      minute: pickerLabels.minutes.map(m => m.label)
    }),
    []
  )

  function onChangeTime (name, value) {
    setValues({ ...values, [name]: value })
  }

  const Picker = useMemo(
    () => require('react-mobile-picker-scroll').default,
    []
  )

  function setPickupTime() {
    onChange({ hour, minute })
  }

  const { hour, minute } = values

  return (
    <LayoutContainer>
      <ModalTitle>Wann wirst du da sein?</ModalTitle>
      <TimePickerContainer>
        <Picker
          optionGroups={options}
          valueGroups={values}
          onChange={onChangeTime}
          itemHeight={50}
        />
      </TimePickerContainer>
      <SettleButton onClick={setPickupTime}>
        <FormattedMessage id="components.TimePicker.ResolveButton" values={{ time: `${hour}:${minute}` }} />
      </SettleButton>
    </LayoutContainer>
  )
}

export default TimePicker
