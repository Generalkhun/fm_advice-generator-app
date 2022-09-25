import React from 'react'

type Props = {}

export const SkeletonLoadingAdvice = (props: Props) => {
    return (
        <>
            <div className="h-3 w-40 mt-10 pb-5 rounded-lg bg-[#60806b] animate-pulse">
            </div>
            <div className="h-[120px] w-[400px] rounded-lg mt-8 tracking-[.03em] bg-[#4c4c4c] animate-pulse">

                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
            </div>
        </>
    )
}