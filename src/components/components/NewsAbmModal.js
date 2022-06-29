import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { updateNews, getCategories } from '../../core/api';
import { customSelectStyles } from './constants';
import ActionButton from './ActionButton';
import UploadNew from './UploadNew'

const NewsAbmModal = ({ news, setShowModal, mode = "edit" }) => {

  const [files, setFiles] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [updatedNews, setUpdatedNews] = useState(null)
  const [updating, setUpdating] = useState(false)

  const { t } = useTranslation();

  useEffect(() => {
    const loadMetadata = async () => {
      getCategories('news').then(categories => {
        if (categories && categories.length > 0) {
          categories = categories.map(category => { return {value: category.id, label: category.name}})
          const categoryId = categories.at(0).value
          setCategories(categories)
          setCategoryId(categoryId)
        }
      })
    }
    loadMetadata()
    
    if (news) {
      setCategoryId(news.category.id)
      setUpdatedNews({
        id: news.id,
        title_en: news.title_en,
        title_es: news.title_es,
        description_en: news.description_en,
        description_es: news.description_es,
        statusId: news.statusId,
        url: news.url
      })
    }
  }, [])

  const updateNewsAction = async () => {
    try {
      setUpdating(true)
      
      const formData = new FormData();
      if (updatedNews.id) {
        formData.append('id', updatedNews.id)
      }
      formData.append('title_es', updatedNews.title_es)
      formData.append('title_en', updatedNews.title_en)
      formData.append('description_es', updatedNews.description_es)
      formData.append('description_en', updatedNews.description_en)
      formData.append('statusId', updatedNews.statusId)
      formData.append('url', updatedNews.url)
      formData.append('categoryId', categoryId)

      if (files.length > 0) {
        const file = files[0].file
        formData.append('file', file, file.fileName)
      }

      await updateNews(formData)
      toast('Noticia actualizada correctamente!')
    } catch (error) {
      console.log(error)
      toast.error('Error al actualizar la noticia.')
    } finally {
      setUpdating(false)
      setShowModal(false)
    }
  }

  return (
		<div className='checkout'>
			<div className='maincheckout'>
				<div className='heading'>
					<h3>Edit News</h3>
				</div>
        {updatedNews &&
          <div className="row">
            <div className="col-6">
              <img src={news.image} className="img-fluid img-rounded mb-sm-30" alt="" />
            </div>
            <div className="col-6">
              <UploadNew
                files={files}
                setFiles={setFiles}
                validationText="PNG, JPG, GIF or WEBP. Max 5mb."
              />
              <div className="spacer-30"></div>
            </div>
            <div className="col-12 col-md-6">
              <h5>{t('header.spanish')}</h5>
              <h5>{t('title')}</h5>
              <input type="text" className="form-control" placeholder="Llegan los nuevos NFT a Trick!" value={updatedNews.title_es} onChange={(e) => setUpdatedNews({...updatedNews, title_es: e.target.value})} required />
              <div className="spacer-10"></div>

              <h5>{t('description')}</h5>
              <textarea data-autoresize className="form-control" placeholder="" value={updatedNews.description_es} onChange={(e) => setUpdatedNews({...updatedNews, description_es: e.target.value})} required></textarea>
              <div className="spacer-10"></div>
            </div>
            <div className="col-12 col-md-6">
              <h5>{t('header.english')}</h5>
              <h5>{t('title')}</h5>
              <input type="text" className="form-control" placeholder="Llegan los nuevos NFT a Trick!" value={updatedNews.title_en} onChange={(e) => setUpdatedNews({...updatedNews, title_en: e.target.value})} required />
              <div className="spacer-10"></div>

              <h5>{t('description')}</h5>
              <textarea data-autoresize className="form-control" placeholder="" value={updatedNews.description_en} onChange={(e) => setUpdatedNews({...updatedNews, description_en: e.target.value})} required></textarea>
              <div className="spacer-10"></div>
            </div>
            <div className="col-6">
              <h5>{t('category')}</h5>
              <div className='dropdownSelect one'>
                <Select
                  defaultValue={categoryId}
                  options={categories}
                  styles={customSelectStyles}
                  onChange={(selection) => setCategoryId(selection.value)}
                />
              </div>
              <div className="spacer-10"></div>
            </div>
            <div className="col-6">
              <h5>URL</h5>
              <input type="text" className="form-control" placeholder="/news/1" value={updatedNews.url} onChange={(e) => setUpdatedNews({...updatedNews, url: e.target.value})} required />
              <div className="spacer-10"></div>
            </div>
            <div className="col-6">
              <div className='agrement'>
                <input type="checkbox" checked={updatedNews.statusId===1} onChange={(event) => setUpdatedNews({...updatedNews, statusId: event.target.checked ? 1 : 2})} />
                <label>Active</label>
              </div>
            </div>
          </div>
        }
        <ActionButton
          loading={updating}
          text={t('action.update')}
          loadingText={t('action.update')}
          onClick={() => updateNewsAction()}
        />
			</div>
			<button className='btn-close' onClick={() => setShowModal(false)}>x</button>
		</div>
  )
}

export default NewsAbmModal;