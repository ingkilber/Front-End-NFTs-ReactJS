import React, { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

import { updateNews, getCategories, createCategory } from '../../../core/api';

import { customSelectStyles, MODES } from '../../components/constants';
import ActionButton from '../../components/ActionButton';
import PreviewNews from "../../components/PreviewNews";
import UploadNew from '../../components/UploadNew';
import Footer from '../../components/footer';
import Subheader from "../../components/Subheader";

const CreateNew = ({ news, mode = MODES.CREATION}) => {
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [description, setDescription] = useState({es: '', en: ''})
  const [title, setTitle] = useState({es: '', en: ''})
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [updating, setUpdating] = useState(false)
  const [statusId, setStatusId] = useState(1)
  const [files, setFiles] = useState([])
  const [id, setId] = useState(null)
  const [url, setUrl] = useState('')

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
      console.log(news)
      setId(news.id)
      setCategoryId(news.category.id)
      setTitle({es: news.title_es, en: news.title_en})
      setDescription({es: news.description_es, en: news.description_en})
      setStatusId(news.statusId)
      setUrl(news.url)
    }
  }, [])

  const createCategoryAction = async (name) => {
    const response = await createCategory(name, null, 2)
    const newCategory = {value: response.id, label: name}
    categories.push(newCategory)
    setCategoryId(newCategory)
  }

  const createItem = async () => {
    try {
      setUpdating(true)
      const formData = new FormData();
      if (id) {
        formData.append('id', id)
      }
      formData.append('title_es', title.es)
      formData.append('title_en', title.en)
      formData.append('description_es', description.es)
      formData.append('description_en', description.en)
      formData.append('statusId', statusId)
      formData.append('url', url)
      formData.append('categoryId', categoryId.value)

      if (files.length > 0) {
        const file = files[0].file
        formData.append('file', file, file.fileName)
      }

      console.log(formData)

      const link = await updateNews(formData)
      console.log(link)
      navigate(link)
    } catch (error) {
      console.log("Capturar error", error)
      toast.error('Error al actualizar la noticia.')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      {mode === MODES.CREATION && <Subheader title="header.create" action="news" />}
      <section className={mode===MODES.CREATION ? 'container' : 'pt-4 pb-4'}>
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <UploadNew
              files={files}
              setFiles={setFiles}
              validationText="PNG, JPG, GIF, WEBP or MP4. Max 200mb."
            />

            <div className="spacer-single"></div>

            <div className="row">
              <div className="col-12 col-md-6">
                <h3>{t('header.spanish')}</h3>
                <h5>{t('title')}</h5>
                <input type="text" className="form-control" placeholder="e.g. 'Crypto Funk'" value={title.es} onChange={(e) => setTitle({...title, es: e.target.value})} required />
                <div className="spacer-10"></div>

                <h5>{t('description')}</h5>
                <textarea data-autoresize className="form-control" placeholder="e.g. 'This is very limited item'" value={description.es} onChange={(e) => setDescription({...description, es: e.target.value})} required></textarea>
                <div className="spacer-10"></div>
              </div>
              <div className="col-12 col-md-6">
                <h3>{t('header.english')}</h3>
                <h5>{t('title')}</h5>
                <input type="text" className="form-control" placeholder="e.g. 'Crypto Funk'" value={title.en} onChange={(e) => setTitle({...title, en: e.target.value})} required />
                <div className="spacer-10"></div>

                <h5>{t('description')}</h5>
                <textarea data-autoresize className="form-control" placeholder="e.g. 'This is very limited item'" value={description.en} onChange={(e) => setDescription({...description, en: e.target.value})} required></textarea>
                <div className="spacer-10"></div>
              </div>
            </div>

            <h5>{t('category')}</h5>
            <div className='dropdownSelect one'>
              <CreatableSelect
                defaultValue={categories.at(0)}
                options={categories}
                isMulti
                placeholder="Seleccionar..."
                styles={customSelectStyles}
                onChange={(selection) => setCategoryId(selection.value)}
                onCreateOption={(e) => createCategoryAction(e)}
              />
            </div>
            <div className="spacer-30"></div>

            <h5>URL</h5>
            <input type="text" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} />
            <div className="spacer-10"></div>

            <div className='agrement'>
              <input type="checkbox" style={{marginRight:10}} checked={statusId===1} onChange={(event) => setStatusId(event.target.checked ? 1 : 2)} />
              <label>Activo</label>
            </div>
            <div className="spacer-20"></div>

            <ActionButton
              loading={updating}
              text={t('action.update')}
              loadingText={t('action.update')}
              onClick={() => createItem()}
            />
          </div>

          <div className="col-lg-4 col-sm-6 col-xs-12">
            <h5>Mi Noticia</h5>
            <PreviewNews />
          </div>
        </div>
      </section>
      {mode === MODES.CREATION && <Footer />}
    </div>
  );
}

export default CreateNew;