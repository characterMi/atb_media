import React from 'react'
import Skeleton from './Skeleton'

const SkeletonProfile = () => {
  return (
    <div className='profile-loading'>
        <Skeleton classes="profile-circle" />
        <Skeleton classes="title ma w-small" />
        <Skeleton classes="title mn w-xs" />
    </div>
  )
}

export default SkeletonProfile