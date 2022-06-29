import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';

import PreviewCollections from "../../components/PreviewCollections";
import { customSelectStyles } from '../../components/constants';
import ActionButton from '../../components/ActionButton';
import UploadNew from '../../components/UploadNew';
import Footer from '../../components/footer';

import { getCollections, createAuthor } from '../../../core/api';

const Create = function () {
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [buttonLabel, setButtonLabel] = useState(t('action.createItem'))
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [collections, setCollections] = useState([])
  const [collectionIds, setCollectionIds] = useState([])
  const [filesAvatar, setFilesAvatar] = useState([])
  const [filesCover, setFilesCover] = useState([])
  const [creating, setCreating] = useState(false)
  
  useEffect(() => {
    const loadMetadata = async () => {
      getCollections().then(response => {
        response = response.map(collection => { return {value: collection.id, label: collection.name}})
        setCollections(response)
      }).catch(error => {
        setCollections([])
      })
    }
    loadMetadata()
  }, [])
  

  const createCollectionAction = async () => {
    try {
      setCreating(true)
      setButtonLabel(t('messages.uploadingMetadata'))
      
      const formData = new FormData();
      formData.append('username', username)
      formData.append('email', email)

      if (filesAvatar.length > 0) {
        const file = filesAvatar[0].file
        formData.append('avatar', file, file.fileName)
      }

      if (filesCover.length > 0) {
        const file = filesCover[0].file
        formData.append('cover', file, file.fileName)
      }

      createAuthor(formData).then(response => {
        setCreating(false)
        setButtonLabel(t('messages.uploadedMetadata'))
        navigate(`/Author/${response.id}`)
      }).catch(error => {
        setCreating(false)
        setButtonLabel("Error, reintentar")
        console.log(error)
      })

    } catch (error) {
      console.log("Capturar error", error)
      setButtonLabel(t('action.createItem'))
    }
  }

  return (
    <div>
      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>{t('header.create')} {t('author')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
          <div className="col-lg-5 mb-3">
            <UploadNew
              files={filesAvatar}
              setFiles={setFilesAvatar}
              validationText="PNG, JPG, GIF or WEBP. Max 200mb."
            />
          </div>
            <div className="spacer-single"></div>

            <UploadNew
              title="action.uploadCover"
              files={filesCover}
              setFiles={setFilesCover}
              validationText="PNG, JPG, GIF, WEBP or MP4. Max 200mb."
            />
            <div className="spacer-single"></div>
            
            <h5>{t('title')} {t('author')}</h5>
            <input type="text" className="form-control" placeholder="Nombre de Autor" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <div className="spacer-10"></div>

            <h5>{t('form.email')} o Red social</h5>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div className="spacer-10"></div>

            {/* <h5>{t('collections')}</h5>
            <div className='dropdownSelect one'>
              <CreatableSelect
              defaultValue={collections && collections.at(0)}
              options={collections}
              placeholder="Seleccionar..."
              styles={customSelectStyles}
              onChange={(selection) => setCollectionIds(selection.value)}
            />
            </div>
            <div className="spacer-30"></div> */}

            <ActionButton
              loading={creating}
              text={buttonLabel}
              loadingText={buttonLabel}
              onClick={() => createCollectionAction()}
            />
          </div>

          <div className="col-lg-4 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <PreviewCollections />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Create;