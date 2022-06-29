import React from 'react'
import NftPreview from './NftPreview'

const InfoModal = ({setModal, preview, title}) => {
  return (
    <div className="modal fade show">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={() => setModal(false)}></button>
          </div>
          <div className="modal-body">
            {preview.includes("pdf") ? 
              <iframe title='Bases y condiciones' width="100%" height="400" src={preview}></iframe>
            :
              <NftPreview preview={preview} play />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal