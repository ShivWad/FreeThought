import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Icon from 'public/icons/index';
import React, { useEffect, useState } from 'react'
import { SignOut, SetGetUserName } from 'supabase';

const NavBar = () => {
    const router = useRouter();
    const user = useUser();


    useEffect(() => {
        SetGetUserName(user?.id);
    }, [user])

    const handleSignOut = async () => {
        await SignOut();
        router.push('/signin');
    }
    const reRoute = (path: string) => {
        router.push(path);
    }

    return (
        <div className="navbar-container">

            <div className="navbar-content">

                <button onClick={() => reRoute("/thoughts")} className='global-button'>
                    <Icon.ThoughtsIcon />
                </button>
                <button onClick={() => reRoute("/write")} className='global-button'>
                    <Icon.WriteIcon />
                </button>
                <button onClick={() => reRoute("/profile")} className='global-button'>
                    <Icon.ProfileIcon />
                </button>
                {!user && <>
                    <button onClick={() => reRoute("/signup")} className='global-button'>
                        Sign up
                    </button>
                    <button onClick={() => reRoute("/signin")} className='global-button'>
                        Sign In
                    </button>
                </>}
                {user &&
                    <button className='global-button' onClick={handleSignOut}>
                        <Icon.SignOutIcon />
                    </button>
                }


                {/* <Link href={"/thoughts"}>
                    <Icon.ThoughtsIcon />
                </Link>
                <Link href={"/write"}>
                    <Icon.WriteIcon />
                </Link>
                <Link href={"/profile"}>
                    <Icon.ProfileIcon />
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
                        <Icon.SignOutIcon/>
                    </button>
                } */}
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
