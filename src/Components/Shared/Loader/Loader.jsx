import React from 'react'
import { HashLoader } from 'react-spinners'
export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center">
            <HashLoader
                color="#0FCFEC" />
        </div>
    )
}
