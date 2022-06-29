import React from 'react'

const ModalWrapper = ({title, children, setShowModal}) => {
  return (
		<div className='checkout'>
			<div className='maincheckout'>
				<div className='heading'>
					<h3>{title}</h3>
				</div>
        {children}
      </div>
      <button className='btn-close' onClick={() => setShowModal(false)}>x</button>
    </div>
  )
}

export default ModalWrapper