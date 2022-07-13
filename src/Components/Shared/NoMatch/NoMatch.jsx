import React from 'react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

export default function NoMatch() {
    return (

        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className='text-2xl font-bold'>404!!!No page found</h1>
            <Link to="/" className="text-primary">Go to Home</Link>
            <div className=" ">
                <HashLoader
                    color="#19D3AE" />
            </div>
        </div>
    )
}
