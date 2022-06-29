import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { updateNftAdmin, getCategories, getAuthors, getAuthorCollections, createCollection } from '../../core/api';
import { customSelectStyles } from './constants';
import ActionButton from './ActionButton';

const currency = process.env.REACT_APP_CURRENCY
const STATUS_ON_AUCTION = 3;
const STATUS_SELLING = 2;
const STATUS_VIEW = 1;

const NewsAbmModal = ({ nft, setShowModal }) => {

  const [authorCollections, setAuthorCollections] = useState([])
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])

  const [status, setStatus] = useState(null)
  const [category, setCategory] = useState([])
  const [author, setAuthor] = useState(null)
  const [title, setTitle] = useState({es: '', en: ''})
  const [collection, setCollection] = useState(null)
  const [description, setDescription] = useState({es: '', en: ''})
  const [deadline, setDeadline] = useState('')
  const [price, setPrice] = useState('')
  const [updating, setUpdating] = useState(false)

  const { t } = useTranslation();

  useEffect(() => {
    async function loadMetadata() {
      getAuthors().then(authors => {
        if (authors && authors.length > 0) {
          authors = authors.map(author => { return {value: author.id, label: author.username}})
          setAuthors(authors)
        }
      }).catch(error => {
        setAuthors([])
      })
   
      getCategories('nft').then(categories => {
        if (categories && categories.length > 0) {
          categories = categories.map(category => { return {value: category.id, label: category.name}})
          setCategories(categories)
        }
      })
    }
    loadMetadata()

    if (nft) {
      setStatus(nft.statusId)
      setCategory(nft.categories.map(category => { return {value: category.id, label: category.name}}))
      setAuthor(nft.author)
      setTitle({es: nft.title_es, en: nft.title_en})
      setDescription({es: nft.description_es, en: nft.description_en})
      setDeadline(nft.deadline)
      setPrice(nft.price)
    }
  }, [])

  const operationTypeValues = () => {
    return [
      {value: STATUS_ON_AUCTION, label: 'Subasta'},
      {value: STATUS_SELLING, label: 'Venta'},
      {value: STATUS_VIEW, label: 'Muestra'}
    ]
  }

  const validForm = () => {
    if (title.es.length===0) {
      throw new Error("No se cargo el titulo en Español.")
    }
    if (description.es.length===0) {
      throw new Error("No se cargo la descripcion en Español.")
    }
    if (title.en.length===0) {
      throw new Error("No se cargo el titulo en Inglés.")
    }
    if (description.en.length===0) {
      throw new Error("No se cargo la descripcion en Inglés.")
    }
    if (!author) {
      throw new Error("No se cargo el Autor.")
    }
    if (category.length===0) {
      throw new Error("No se cargo la Categoría.")
    }
    if ((status.value===STATUS_SELLING || status.value===STATUS_ON_AUCTION) && price.length===0) {
      throw new Error("No se cargo el Precio.")
    }
    if (status.value===STATUS_ON_AUCTION && deadline.length===0) {
      throw new Error("No se cargó el Deadline.")
    }
  }

  const setAuthorAction = (author) => {
    if (author.value) {
      setAuthor(author)
      getAuthorCollections(author.value).then(authorCollections => {
        if (authorCollections && authorCollections.length > 0) {
          authorCollections = authorCollections.map(authorCollection => { return {value: authorCollection.id, label: authorCollection.title_es}})
          setAuthorCollections(authorCollections)
        }
      })
    }
  }

  const createAuthorCollection = async (name) => {
    var collectionData = new FormData()
    collectionData.append('title_en', name)
    collectionData.append('title_es', name)
    collectionData.append('authorId', author.value)

    const response = await createCollection(collectionData)
    const newCollection = {value: response.id, label: name}
    authorCollections.push(newCollection)
    setCollection(newCollection)
  }

  const updateNftAction = async () => {
    try {
      validForm()
      setUpdating(true)

      await updateNftAdmin({
        id: nft.id,
        title_en: title.en,
        title_es: title.es,
        description_en: description.en,
        description_es: description.es,
        price: status.value === STATUS_VIEW ? 0 : price,
        statusId: status.value,
        deadline: status.value === STATUS_ON_AUCTION ? deadline : null,
        categories: category.map(cat => cat.value).toString()
      })
      setShowModal(false)
    } catch (error) {
      console.log(error.message)
      toast.info(error.message)
    } finally {
      setUpdating(false)
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
					<h3>Edit NFT</h3>
				</div>
        <div className="row">
          <div className="col-6">
            <img src={nft.preview} className="img-fluid img-rounded mb-sm-30" alt="" />
            <div className="spacer-20"></div>
          </div>

          <div className="col-12 col-md-6">
            <h5>{t('header.spanish')}</h5>
            <h5>{t('title')}</h5>
            <input type="text" className="form-control" placeholder="Llegan los nuevos NFT a Trick!" value={title.es} onChange={(e) => setTitle({...title, es: e.target.value})} required />
            <div className="spacer-10"></div>

            <h5>{t('description')}</h5>
            <textarea data-autoresize className="form-control" placeholder="" value={description.es} onChange={(e) => setDescription({...description, es: e.target.value})} required></textarea>
            <div className="spacer-10"></div>
          </div>
          <div className="col-12 col-md-6">
            <h5>{t('header.english')}</h5>
            <h5>{t('title')}</h5>
            <input type="text" className="form-control" placeholder="Llegan los nuevos NFT a Trick!" value={title.en} onChange={(e) => setTitle({...title, en: e.target.value})} required />
            <div className="spacer-10"></div>

            <h5>{t('description')}</h5>
            <textarea data-autoresize className="form-control" placeholder="" value={description.en} onChange={(e) => setDescription({...description, en: e.target.value})} required></textarea>
            <div className="spacer-10"></div>
          </div>

          <h5>{t('author')}</h5>
          <div className='dropdownSelect one'>
            <Select
              value={author}
              defaultValue={authors && authors.at(0)}
              options={authors}
              placeholder="Seleccionar..."
              styles={customSelectStyles}
              onChange={(selection) => setAuthorAction(selection)}
            />
          </div>
          <div className="spacer-30"></div>

          <h5>{t('collections')}</h5>
          <div className='dropdownSelect one'>
            <CreatableSelect
              value={collection}
              defaultValue={authorCollections && authorCollections.at(0)}
              options={authorCollections}
              placeholder="Seleccionar..."
              styles={customSelectStyles}
              onChange={(selection) => setCollection(selection)}
              onCreateOption={(e) => createAuthorCollection(e)}
            />
          </div>
          <div className="spacer-30"></div>

          <div className="col-6">
            <h5>{t('category')}</h5>
            <div className='dropdownSelect one'>
              <Select
                defaultValue={nft.categories.map(category => { return {value: category.id, label: category.name}})}
                value={category}
                options={categories}
                isMulti
                placeholder="Seleccionar..."
                styles={customSelectStyles}
                onChange={(selection) => setCategory(selection)}
              />
            </div>
            <div className="spacer-10"></div>
          </div>

          <div className="col-6">
            <h5>{t('operationType')}</h5>
            <div className='dropdownSelect one'>
              <Select
                value={operationTypeValues().filter(operationType => operationType.value === nft.statusId)}
                defaultValue={operationTypeValues().filter(operationType => operationType.value === nft.statusId)}
                options={operationTypeValues()}
                styles={customSelectStyles}
                onChange={(selection) => setStatus(selection)}
              />
            </div>
            <div className="spacer-10"></div>
          </div>

          {((status && status.value!==STATUS_VIEW) || nft.statusId!==STATUS_VIEW) &&
            <div className="col-12 col-md-6">
              <h5>{t('price')}</h5>
              <input type="text" className="form-control" placeholder={`enter price for the item (${currency})`} value={price} onChange={(e) => setPrice(e.target.value)} />
              <div className="spacer-10"></div>
            </div>
          }

          {((status && status.value===STATUS_ON_AUCTION) || nft.statusId===STATUS_ON_AUCTION) &&
            <div className="col-12 col-md-6">
              <h5>{t('deadline')}</h5>
              <input id="deadline" type="datetime-local" className="form-control" min={getMinDeadline()} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              <div className="spacer-10"></div>
            </div>
          }
        </div>
        
        <ActionButton
          loading={updating}
          text={t('action.update')}
          loadingText={t('action.update')}
          onClick={() => updateNftAction()}
        />
			</div>
			<button className='btn-close' onClick={() => setShowModal(false)}>x</button>
		</div>
  )
}

export default NewsAbmModal;