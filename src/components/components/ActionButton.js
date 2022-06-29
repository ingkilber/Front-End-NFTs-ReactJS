import React from 'react'

const ActionButton = ({ loading, text, loadingText, onClick, disabled = false }) => {
  return (
    <button className="btn-main" onClick={loading ? null : onClick} disabled={disabled || loading}>
      {loading ? loadingText : text} {loading && <i className="fa fa-spinner"></i>}
    </button>
  )
}

export default ActionButton