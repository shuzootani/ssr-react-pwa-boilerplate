import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import Color from '../../../utils/color'
import TimePicker from '../../../components/TimePicker'
import { ELLIPSIS } from '../../../utils/styles'

const StoreLocationContainer = styled.div`
  min-width: 0;
  margin-right: 4px;
`

const LocationButton = styled.div`
  background: ${Color.Cyan};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
`

const LocationName = styled.div`
  padding-left: 4px;
  ${ELLIPSIS};
`

const StoreInfoSheet = styled.div`
  background: #fff;
  display: flex;
  width: 100%;
  margin: auto;
  border-radius: 4px;
`

function PickupTimeSelector(store) {
  const [open, setOpen] = useState(false)

  function toggleModal() {
    setOpen(prevOpen => !prevOpen)
  }

  function onChangeTime({ hour, minute }) {
    toggleModal({ hour, minute })
  }

  return (
    <StoreLocationContainer>
      <LocationButton onClick={toggleModal}>
        <Icon name="clock" />
        <LocationName>{moment().format('HH:mm')}</LocationName>
      </LocationButton>
      {open && (
        <Modal onClose={toggleModal}>
          <StoreInfoSheet>
            <TimePicker store={store} onChange={onChangeTime} />
          </StoreInfoSheet>
        </Modal>
      )}
    </StoreLocationContainer>
  )
}

export default PickupTimeSelector
