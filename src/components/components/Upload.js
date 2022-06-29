import React from 'react'
import { useTranslation } from "react-i18next";

// Evaluar reemplazo con
// https://github.com/pqina/react-filepond

const Upload = ({ files, setFiles, validationText, multiple = false }) => {
  const { t } = useTranslation();

  const onChange = (e) => {
    var formFiles = e.target.files;
    var filesArr = Array.prototype.slice.call(formFiles);
    document.getElementById("file_name").style.display = "none";
    setFiles([...filesArr])
  }

  return (
    <>
      <h5>{t('action.uploadFile')}</h5>
      <div className="d-create-file">
        <p id="file_name">{validationText}</p>
        {files.map(x =>
          <p key={x.name}>{x.name}</p>
        )}
        <div className='browse'>
          <input type="button" id="get_file" className="btn-main" value={t('action.browse')} />
          <input id='upload_file' type="file" multiple={multiple} onChange={onChange} required />
        </div>
      </div>
    </>
  )
}

export default Upload;
