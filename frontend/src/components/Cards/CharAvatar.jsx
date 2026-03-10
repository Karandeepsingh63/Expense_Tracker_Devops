import React from 'react'
import { getIntials } from '../../utils/helper';

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div className={`${width || "w-12"} ${height || "h-12"} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 ${style}`}>
      {getIntials(fullName || "")}
    </div>
  )
}

export default CharAvatar
