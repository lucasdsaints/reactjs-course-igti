import React from 'react'

export default function Spinner() {
  return (
    <div style={style.flexContainer}>
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <span style={style.loadingText}>Aguarde...</span>
    </div>
  )
}

const style = {
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: '16px',
    fontSize: '1.2em'
  }
}