import Link from 'next/link'
import React from 'react'
import { supabase } from 'supabase';

const NavBar = () => {

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error)
            console.log(error);
    }
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
                <button onClick={handleSignOut}>
                    Sign out
                </button>
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
