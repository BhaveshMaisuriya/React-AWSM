import React from 'react'

const MslaErrorPage = () => {
  const onLoadRequest = () => window.location.reload()
  return (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="mb-4">Server Error</h2>
        <button className="btn btn-primary" onClick={onLoadRequest}>
          Reload
        </button>
      </div>
    </div>
  )
}
export default MslaErrorPage
