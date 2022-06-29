import React, { useState, useEffect } from 'react'
import Select from 'react-select';

import { customSelectStyles } from '../components/constants'

const Paginator = ({collection, setCollectionPaginated, elements = 8}) => {
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (collection.length > elements) {
      setPages(Math.ceil(collection.length / elements))
    }
    setCollectionPaginated(collection.slice(0, elements))
  }, [collection])

  const changePage = (number) => {
    if (number >= 1 && number <= pages) {
      setPage(number)

      const itemOffset = ((number-1)*elements) % collection.length
      const endOffset = itemOffset + elements
      console.log(itemOffset, endOffset)
      setCollectionPaginated(collection.slice(itemOffset, endOffset))
    }
  }

  const numberPages = Array.from({length: pages}, (_, i) => i+1).map(page => { return {label: `Página ${page}`, value: page} })

  return (
    pages > 1 &&
    <div className="row">
      <div className="col-12 col-sm-4 col-xl-3">
        <Select
          defaultValue={numberPages.at(page-1)}
          options={numberPages}
          placeholder="Seleccionar..."
          styles={customSelectStyles}
          onChange={(e) => changePage(e.value)}
        />
      </div>
    </div>
  )
}

export default Paginator;