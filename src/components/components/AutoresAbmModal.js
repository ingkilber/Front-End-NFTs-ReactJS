import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import UploadNew from './UploadNew'

import { updateNftAdmin, getCategories } from '../../core/api';
import ActionButton from './ActionButton';

const currency = process.env.REACT_APP_CURRENCY
const STATUS_ON_AUCTION = 3;
const STATUS_SELLING = 2;
const STATUS_VIEW = 1;

const AutoresAbmModal = ({ nft, setShowModal }) => {

  const [files, setFiles] = useState([])
  const [categories, setCategories] = useState([])
  const [statusId, setStatusId] = useState(null)
  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState({})
  const [description, setDescription] = useState({})
  const [deadline, setDeadline] = useState('')
  const [price, setPrice] = useState('')
  const [updating, setUpdating] = useState(false)
  const [email, setEmail] = useState('')
  const [filesAvatar, setFilesAvatar] = useState([])
  const [filesCover, setFilesCover] = useState([])

  const { t } = useTranslation();

  useEffect(() => {
    async function getDataIfUserValid() {
      var categories = await getCategories('nft')
      if (categories && categories.length > 0) {
        categories = categories.map(category => { return {value: category.id, label: category.name}})
        const categoryId = categories.at(0).value
        setCategories(categories)
        setCategoryId(categoryId)
      }
    }
    getDataIfUserValid()
  }, [])

  const updateAuthorAction = async () => {
    try {
      setUpdating(true)
      
      const formData = new FormData();
      formData.append('id', nft.id)
      formData.append('title_es', title.es)
      formData.append('title_en', title.en)
      formData.append('description_es', description.es)
      formData.append('description_en', description.en)
      formData.append('price', statusId === STATUS_VIEW ? 0 : price)
      formData.append('statusId', statusId)
      if (statusId === STATUS_ON_AUCTION) {
        formData.append('deadline', deadline)
      }
      formData.append('categoryId', categoryId)

      if (filesAvatar.length > 0) {
        const file = filesAvatar[0].file
        formData.append('avatar', file, file.fileName)
      }

      if (filesCover.length > 0) {
        const file = filesCover[0].file
        formData.append('cover', file, file.fileName)
      }

      await updateNftAdmin(formData)
      setUpdating(false)
    } catch (error) {
      setUpdating(false)
    } finally {
      setShowModal(false)
    }
  }

  const getMinDeadline = () => {
    const date = new Date()
    date.setHours(date.getHours() + 1, 0, 0, 0)
    return date.toISOString().substring(0, 19)
  }

  return (
		<div className='checkout'>
			<div className='maincheckout'>
				<div className='heading'>
					<h3>Edit Autor</h3>
				</div>
        <div className="row">
          <div className="col-2">
            <img src={nft.preview} className="img-fluid img-rounded mb-sm-30" alt="" />
            <div className="spacer-20"></div>
          </div>
          <div className="col-2">
            <h5>Avatar</h5>
            <UploadNew
              files={filesAvatar}
              setFiles={setFilesAvatar}
              validationText="PNG, JPG, GIF or WEBP. Max 200mb."
            />
          </div>

          <div className="col-3">
            <img src={nft.preview} className="img-fluid img-rounded mb-sm-30" alt="" />
            <div className="spacer-20"></div>
          </div>
          <div className="col-4">
          <h5>Banner</h5>
            <UploadNew
              title="action.uploadCover"
              files={filesCover}
              setFiles={setFilesCover}
              validationText="PNG, JPG, GIF, WEBP or MP4. Max 200mb."
            />
          </div>

          

          <div className="col-12 col-md-6">
            <h5>{t('title')} {t('author')}</h5>
            <input type="text" className="form-control" placeholder="Llegan los nuevos NFT a Trick!" value={nft.title_es} onChange={(e) => setTitle({...title, es: e.target.value})} required />
            <div className="spacer-10"></div>
          </div>
          
          <div className="col-12 col-md-6">
            <h5>{t('form.email')} o Red social</h5>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div className="spacer-10"></div>
          </div>


          {((statusId && statusId!==STATUS_VIEW) || nft.statusId!==STATUS_VIEW) &&
            <div className="col-12 col-md-6">
              <h5>{t('price')}</h5>
              <input type="text" className="form-control" placeholder={`enter price for the item (${currency})`} value={nft.price} onChange={(e) => setPrice(e.target.value)} />
              <div className="spacer-10"></div>
            </div>
          }

          {((statusId && statusId===STATUS_ON_AUCTION) || nft.statusId===STATUS_ON_AUCTION) &&
            <div className="col-12 col-md-6">
              <h5>{t('deadline')}</h5>
              <input id="deadline" type="datetime-local" className="form-control" min={getMinDeadline()} value={nft.deadline} onChange={(e) => setDeadline(e.target.value)} />
              <div className="spacer-10"></div>
            </div>
          }
        </div>
        <ActionButton
          loading={updating}
          text={t('action.update')}
          loadingText={t('action.update')}
          onClick={() => updateAuthorAction()}
        />
			</div>
			<button className='btn-close' onClick={() => setShowModal(false)}>x</button>
		</div>
  )
}

export default AutoresAbmModal;