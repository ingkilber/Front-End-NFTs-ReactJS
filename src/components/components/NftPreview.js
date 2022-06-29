import React from 'react'

export default function NftPreview(props) {
  const { preview, play, onLoad } = props
  
  const isImage = () => {
    if (props.preview) {
      return preview.includes('.png') ||
        preview.includes('.jpg') ||
        preview.includes('.gif')
    }           
  }

  return (
    isImage() ?
      <img src={preview} className="img-fluid img-rounded mb-sm-30" alt="" onLoad={onLoad} />
    :
      <video src={preview} className="img-fluid imgslickz mb-sm-30" style={{borderRadius:3}} alt="" autoPlay controlsList="nodownload" muted={!play} controls={play} loop onLoad={onLoad} />
  )
}
