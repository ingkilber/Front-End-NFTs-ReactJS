import { Axios } from './axios'
import { getUser } from './user'

var authorizationHeader = {'Authorization': localStorage.getItem('token')}

export const getToken = async (address, signature, message) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Axios.post('/user/identify', {address, signature, message})
      localStorage.setItem('token', response.data.token)
      resolve(response)
    } catch (error) {
      reject("messages.identify")
    }
  })
}

export const getProfile = async () => {
  try {
    const user = await getUser()
    const response = await Axios.get(`/user/${user.userId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const updateProfile = async (profile) => {
  try {
    const response = await Axios.put(`/user/profile`, profile, {
      headers: {
        ...authorizationHeader,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const createCollection = async (collectionData) => {
  try {
    const response = await Axios.post('/collections', collectionData, {
      headers: {
        ...authorizationHeader,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const createAuthor = async (authorData) => {
  try {
    await Axios.post('/author', authorData, {
      headers: {
        ...authorizationHeader,
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const cache = async () => {
  try {
    await Axios.post('/cache', null, {
      headers: {
        ...authorizationHeader
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const mint = async (mintData) => {
  try {
    const response = await Axios.put('/nft/mint', mintData, {
      headers: {
        ...authorizationHeader,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.nft.slug
  } catch (error) {
    console.log(error)
  }
}

export const updateNft = async (tokenId, statusId, price) => {
  try {
    const response = await Axios.post('/nft/update', {tokenId, statusId, price}, {
      headers: authorizationHeader,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const updateNftAdmin = async (updateData) => {
  console.log(updateData)
  try {
    const response = await Axios.post('/admin/nft/update', updateData, {
      headers: authorizationHeader,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const bidNft = async (tokenId, price) => {
  try {
    const response = await Axios.post('/nft/bid', {tokenId, price}, {
      headers: authorizationHeader
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const nftAction = async (tokenId, action, type) => {
  try {
    await Axios.post('/nft/action', {tokenId, action, type}, {
      headers: authorizationHeader
    })
    return true
  } catch (error) {
    return false
  }
}

export const getNfts = async () => {
  try {
    const response = await Axios.get(`/admin/nft`, {
      headers: authorizationHeader
    })
    return response.data.tokens
  } catch (error) {
    console.log(error)
  }
}

export const myNfts = async (address, email) => {
  if (address) {
    try {
      const response = await Axios.get(`/nft/my?address=${address}`)
      return response.data.tokens
    } catch (error) {
      console.log(error.response)
      throw new Error(error)
    }
  } else if (email) {
    try {
      const response = await Axios.get(`/nft/my?email=${email}`)
      return response.data.quantity
    } catch (error) {
      console.log(error.response)
      throw new Error(error)
    }
  }
}

export const getNft = async (id) => {
  try {
    const response = await Axios.get(`/nft/${id}`)
    return response.data.detail
  } catch (error) {
    console.log(error)
  }
}

export const getAuthors = async () => {
  try {
    const response = await Axios.get(`/nft/authors`, {
      headers: authorizationHeader
    })
    return response.data.authors
  } catch (error) {
    console.log(error)
  }
}

export const getCategories = async (item) => {
  try {
    const response = await Axios.get(`/${item}/categories`, {
      headers: authorizationHeader
    })
    return response.data.categories
  } catch (error) {
    console.log(error)
  }
}

export const createCategory = async (name, icon, typeId) => {
  try {
    const response = await Axios.post(`/categories`, {name, icon, typeId}, {
      headers: authorizationHeader
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const updateNews = async (news) => {
  try {
    const response = await Axios.post('/news', news, {
      headers: authorizationHeader
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getNewsCategories = async () => {
  try {
    const response = await Axios.get('/news/categories')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getNews = async () => {
  try {
    const response = await Axios.get('/news')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getNewsItem = async (id) => {
  try {
    const response = await Axios.get(`/news/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getCollections = async () => {
  try {
    const response = await Axios.get('/collections')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getAuthorCollections = async (authorId) => {
  try {
    const response = await Axios.get(`/collections/author/${authorId}`, {
      headers: authorizationHeader
    })
    return response.data.collections
  } catch (error) {
    console.log(error)
  }
}

export const getCollectionItem = async (id) => {
  try {
    const response = await Axios.get(`/collections/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const claimNft = async (token, paymentId, address) => {
  const response = await Axios.post(`/nft/claim`, {paymentId, address}, {
    headers: {'Authorization': token}
  })
  return response.data
}

export const claimNftError = async (paymentId, address) => {
  const response = await Axios.post(`/nft/claim-error`, {paymentId, address})
  return response.data
}

export const buy = async (buyParameters) => {
  const { productId, variationId, provider, quantity, address, email, referido } = buyParameters
  const response = await Axios.post(`/${provider}/buy`, {productId, variationId, quantity, address, email, referido}, {
    headers: authorizationHeader
  })
  return response.data
}

export const getProduct = async (id) => {
  try {
    const response = await Axios.get(`/products/${id}`)
    return response.data.product
  } catch (error) {
    console.log(error)
  }
}

/**
 * Deprecar?
 * @param {*} code 
 * @returns 
 */
export const getPrice = async (code) => {
  try {
    const response = await Axios.get(`/token/price/${code}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const configurations = async () => {
  try {
    const response = await Axios.get(`/configurations`, {
      headers: authorizationHeader
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const updateConfiguration = async (configuration) => {
  try {
    const response = await Axios.put(`/configurations`, configuration, {
      headers: authorizationHeader
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getPaymentMethods = async () => {
  try {
    const response = await Axios.get(`/payment/methods`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const paypalIpn = async (payerId, paymentId) => {
  try {
    const response = await Axios.post(`/pp/ipn`, {payerId, paymentId})
    return response.data
  } catch (error) {
    console.log(error)
  }
}