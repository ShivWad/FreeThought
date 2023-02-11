import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-content" >
                <Link href={"/write"}>
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


// export async function getStaticProps() {


//     return {
//         props: {
//             data: data
//         }, // will be passed to the page component as props
//     }
// }
