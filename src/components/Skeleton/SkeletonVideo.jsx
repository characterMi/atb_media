import React from 'react'
import Skeleton from './Skeleton'

const SkeletonVideo = () => {
    return (
        <div className='skeleton-video'>
            <Skeleton classes="single-video mn" />
            <Skeleton classes="title mt" />
            <div style={{ display: "flex", marginTop: "20px" }}>
                <Skeleton classes="text ml w-xs" />
                <Skeleton classes="text ml w-xs" />
            </div>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <Skeleton classes="text ml w-small" />
                <Skeleton classes="text ml w-xs" />
            </div>
            <Skeleton classes="comment" />
        </div>
    )
}

export default SkeletonVideo