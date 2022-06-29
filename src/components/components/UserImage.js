import React from 'react';
import Blockies from 'react-blockies';

export default function UserImage({ avatar, address, imgClassName, size = 0 }) {
  const transformSize = [
    {size: 10, scale: 5},
    {size: 10, scale: 15},
    {size: 10, scale: 25}
  ]

  return avatar !== null ?
    <img
      src={avatar}
      className={imgClassName}
      alt=""
    />
  :
    <Blockies
      seed={address}
      color="#ffe"
      bgColor="#abc"
      spotColor="#dfe"
      size={transformSize[size].size}
      scale={transformSize[size].scale}
    />
}
