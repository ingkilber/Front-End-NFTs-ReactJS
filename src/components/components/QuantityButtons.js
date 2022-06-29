import React from 'react'

export default function QuantityButtons(props) {
  const { quantity, setQuantity } = props
  
  const editQuantity = (action, amount) => {
    var modificatedQuantity = 0
    var canModify = false
    if (action === 0) {
      modificatedQuantity = Number(quantity) - amount
      if (modificatedQuantity >= 0) {
        canModify = true
      }
    } else if (action === 1) {
      modificatedQuantity = Number(quantity) + amount
      if (modificatedQuantity <= 100000) {
        canModify = true
      }
    }

    if (canModify) {
      setQuantity(modificatedQuantity)
    }
  }

  return (
    <>
      <button className="btn-sm" onClick={() => editQuantity(0, 1)}>-1</button>
      <button className="btn-sm" onClick={() => editQuantity(0, 10)}>-10</button>
      <button className="btn-sm" onClick={() => editQuantity(0, 100)}>-100</button>
      <button className="btn-sm" onClick={() => editQuantity(1, 1)}>+1</button>
      <button className="btn-sm" onClick={() => editQuantity(1, 10)}>+10</button>
      <button className="btn-sm" onClick={() => editQuantity(1, 100)}>+100</button>
    </>
  )
}
