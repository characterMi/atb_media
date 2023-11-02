import React from 'react'
import Skeleton from './Skeleton'

const SkeletonVideo = () => {
    return (
        <div className='skeleton-video'>
            <Skeleton classes="single-video mn" />
            <Skeleton classes="title mt" />
            <Skeleton classes="text ml w-small" />
            <Skeleton classes="text ml w-xs" />
        </div>
    )
}

export default SkeletonVideo