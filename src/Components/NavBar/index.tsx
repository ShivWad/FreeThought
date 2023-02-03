import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className="flex justify-end bg-blue-200 ">
            <div className="flex gap-5 m-4 font-bold" >
                <Link href={"/write"} >
                    Write
                </Link>
                <Link href={"/signup"} >
                    Sign up
                </Link>
                <Link href={"/signin"}>
                    Sign In
                </Link>
            </div>
        </div>
    )
}

export default NavBar