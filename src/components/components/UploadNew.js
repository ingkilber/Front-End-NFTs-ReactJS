import React from 'react'
import { useTranslation } from "react-i18next";

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const UploadNew = ({ title = 'action.uploadFile', files, setFiles, validationText, multiple = false }) => {
  const { t } = useTranslation()

  return (
    <>
      <h5>{t(title)}</h5>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={multiple}
        /* maxFiles={3} */
        /* server="/api" */
        name="files"
        labelIdle={`Drag & Drop your files or <span class="filepond--label-action">Browse</span>`}
      />
    </>
  )
}

export default UploadNew;
