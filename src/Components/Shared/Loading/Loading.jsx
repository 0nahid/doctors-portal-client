import React from 'react'
import { HashLoader } from 'react-spinners'
export default function Loading() {
    return (
        <div className="h-screen flex justify-center items-center">
            <HashLoader
                color="#19D3AE" />
        </div>
    )
}
