import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { SignOut, SetGetUserName } from 'supabase';
import { ExitToAppOutlined, PersonOutline, EditOutlined, PsychologyAltOutlined } from '@mui/icons-material'
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


    return (
        <div className="navbar-container">

            <div className="navbar-content">

                <Link href={"/thoughts"}>
                    <PsychologyAltOutlined />
                </Link>
                <Link href={"/write"}>
                    <EditOutlined />
                </Link>
                <Link href={"/profile"}>
                    <PersonOutline />
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
                        <ExitToAppOutlined />
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
