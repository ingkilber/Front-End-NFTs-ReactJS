import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { mint, getAuthors, getCategories, getAuthorCollections, createCollection, createCategory } from '../../../core/api';
import { getTokenIds, mintNft } from '../../../core/blockchain';

import { customSelectStyles } from '../../components/constants';
import PreviewItem from "../../components/PreviewItem";
import UploadNew from '../../components/UploadNew';
import Subheader from '../../components/Subheader';
import Footer from '../../components/footer';
import ActionButton from "../../components/ActionButton";

const currency = process.env.REACT_APP_CURRENCY
const STATUS_ON_AUCTION = 3;
const STATUS_SELLING = 2;
const STATUS_VIEW = 1;

const Create = function () {
  const navigate = useNavigate()
  const { t } = useTranslation();

  const [buttonLabel, setButtonLabel] = useState(t('action.createItem'))
  const [description, setDescription] = useState({es: '', en: ''})
  const [status, setStatus] = useState({value: STATUS_VIEW, label: 'Muestra'})
  const [title, setTitle] = useState({es: '', en: ''})
  const [category, setCategory] = useState([])
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [authorCollections, setAuthorCollections] = useState([])
  const [author, setAuthor] = useState(null)
  const [collection, setCollection] = useState(null)
  const [deadline, setDeadline] = useState('')
  const [files, setFiles] = useState([])
  const [price, setPrice] = useState('')
  const [minting, setMinting] = useState(false)

  useEffect(() => {
    const loadMetadata = async () => {
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
  }, [])

  const createCategoryAction = async (name) => {
    const response = await createCategory(name, null, 1)
    const newCategory = {value: response.id, label: name}
    categories.push(newCategory)
    setCategory(newCategory)
  }

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

  const createItem = async () => {
    try {
      validForm()
      setMinting(true)
      setButtonLabel(t('messages.minting'))
      
      const tx = await mintNft()
      console.log(tx)
      if (tx.logs) {
        const tokenIds = getTokenIds(tx, 1)
        setButtonLabel(t('messages.minted'))
        
        const formData = new FormData();
        formData.append('tokenId', tokenIds[0])
        formData.append('title_es', title.es)
        formData.append('title_en', title.en)
        formData.append('description_es', description.es)
        formData.append('description_en', description.en)
        formData.append('nftContract', tx.to)
        formData.append('transactionHash', tx.transactionHash)
        formData.append('price', status.value === 1 ? 0 : price)
        formData.append('statusId', status.value)
        formData.append('deadline', deadline)
        formData.append('categories', category.map(cat => cat.value))
        formData.append('authorId', author.value)
        if (collection) {
          formData.append('collectionId', collection.value)
        }
        if (files.length > 0) {
          const file = files[0].file
          formData.append('file', file, file.fileName)
        }
        console.log(formData)
  
        setButtonLabel(t('messages.uploadingMetadata'))
        const slug = await mint(formData)
        setButtonLabel(t('messages.uploadedMetadata'))
  
        console.log(slug)
        navigate(`/Galeria/${slug}`)
      } else {
        toast.error("Error al realizar la transaccion, validarla en el scan")
        setButtonLabel(t('action.createItem'))
      }
    } catch (error) {
      console.log("Capturar error", error)
      if (error.code === 4001) {
        toast.info("Transaccion cancelada en la Wallet.")
      } else {
        toast.info(error.message)
      }
      setButtonLabel(t('action.createItem'))
    } finally {
      setMinting(false)
    }
  }

  const getMinDeadline = () => {
    const date = new Date()
    date.setHours(date.getHours() + 1, 0, 0, 0)
    return date.toISOString().substring(0, 19)
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

  return (
    <div>
      <Subheader title="header.create" />
      <section className='container'>
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

            <h5>{t('category')}</h5>
            <div className='dropdownSelect one'>
              <CreatableSelect
                value={category}
                options={categories}
                isMulti
                placeholder="Seleccionar..."
                styles={customSelectStyles}
                onChange={(selection) => setCategory(selection)}
                onCreateOption={(e) => createCategoryAction(e)}
              />
            </div>
            <div className="spacer-30"></div>

            <h5>{t('operationType')}</h5>
            <div className='dropdownSelect one'>
              <Select
                options={operationTypeValues()}
                placeholder="Seleccionar..."
                styles={customSelectStyles}
                value={status}
                onChange={(selection) => setStatus(selection)}
              />
            </div>
            <div className="spacer-30"></div>

            {status.value!==STATUS_VIEW &&
              <>
                <h5>{t('price')}</h5>
                <input type="text" className="form-control" placeholder={`enter price for the item (${currency})`} value={price} onChange={(e) => setPrice(e.target.value)} />
                <div className="spacer-10"></div>
              </>
            }

            {status.value===STATUS_ON_AUCTION &&
              <>
                <h5>{t('deadline')}</h5>
                <input id="deadline" type="datetime-local" className="form-control" min={getMinDeadline()} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <div className="spacer-10"></div>
              </>
            }
            <div className="spacer-30"></div>

            <ActionButton
              loading={minting}
              onClick={() => createItem()}
              text={buttonLabel}
              loadingText={buttonLabel}
            />
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <PreviewItem />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Create;