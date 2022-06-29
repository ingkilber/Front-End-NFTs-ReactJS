import jwt_decode from 'jwt-decode';

export const getUser = async () => {
  return new Promise((resolve, reject) => {
    try {
      const token = localStorage.getItem('token')
      resolve(jwt_decode(token))
    } catch (error) {
      reject(null)
    }
  })
}