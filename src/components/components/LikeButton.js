import React, { useState } from 'react'
import { nftAction } from '../../core/api';

const LIKE_TYPE = 1
const LIKE_VALUE = 1
const UNLIKE_VALUE = 2

export default function LikeButton(props) {
  const [userLiked, setUserLiked] = useState(props.userLiked)
  const [likes, setLikes] = useState(props.likes)
  const [liking, setLiking] = useState(false)

  const updateLike = async () => {
    // TODO: validar que el usuario este logeado, o mostrar un cartel global que tiene que iniciar con su cuenta de MetaMask
    if (!liking) {
      setLiking(true)
      const action = userLiked == null ? LIKE_VALUE : UNLIKE_VALUE
      const response = await nftAction(props.nftId, action, LIKE_TYPE)

      if (response) {
        if (userLiked) {
          setUserLiked(null)
          setLikes(likes - 1)
        } else {
          setUserLiked(1)
          setLikes(likes + 1)
        }
      } else {
        console.log("User not logged");
      }
  
      setLiking(false)
    }
  }

  return (
    <div className={userLiked ? "nft__item_like active" : "nft__item_like"}>
      {liking ? <i className="fa fa-spinner"></i> : <i className="fa fa-heart" onClick={() => updateLike()}></i>}
      <span>{likes}</span>
    </div>
  )
}
