import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link'
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase';

const NavBar = () => {
    const router = useRouter();
    const user = useUser();


    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        router.push("/signin")
        if (error)
            console.log(error);
    }


    return (
        <div className="navbar-container">
            <div className="navbar-content" >


                <Link href={"/thoughts"}>
                    Thoughts
                </Link>
                <Link href={"/write"}>
                    Write
                </Link>
                <Link href={"/profile"}>
                    Profile
                </Link>
                {!user && <>
                    <Link href={"/signup"} >
                        Sign up
                    </Link>
                    <Link href={"/signin"}>
                        Sign In
                    </Link>
                </>}

                {user &&
                    <button className='sign-in-button' style={{ color: "black", fontWeight: "bold" }} onClick={handleSignOut}>
                        Sign out
                    </button>
                }
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
