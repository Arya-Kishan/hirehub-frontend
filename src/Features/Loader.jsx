import React, { memo } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <ClipLoader
                color={"#14B8A6"}
                loading={true}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default memo(Loader)
