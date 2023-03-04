import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link'
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react'
import { SignOut, SetGetUserName } from 'supabase';

const NavBar = () => {
    const router = useRouter();
    const user = useUser();
    const [userName, setUserName] = useState("");
    useEffect(() => {
        let res = SetGetUserName(user?.id);
        res.then((r) => {
            setUserName(r[0].user_name)
        }).catch((r) => {
            console.log(r.message)
        })
    }, [])

    const handleSignOut = async () => {
        await SignOut();
        router.push('/signin');
    }


    return (
        <div className="navbar-container">
            <h2>{userName}</h2>
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
                    <button className='global-button' style={{ color: "black", fontWeight: "bold" }} onClick={handleSignOut}>
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
