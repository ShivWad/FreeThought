import { AuthError, Session, User, UserResponse } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { AppContext } from 'next/app'
import { GetServerSidePropsContext } from 'next'
import { useUser } from '@supabase/auth-helpers-react'

type infoType = {
    data: {
        user: User | null;
        session: Session | null;
    } | {
        user: null;
        session: null;
    }
}

type sessionType = {
    data: {
        session: Session;
    };
    error: null;
} | {
    data: {
        session: null;
    };
    error: AuthError;
} | {
    data: {
        session: null;
    };
    error: null;
}


type profilePropType = {
    fetchedUser: {
        user: User;
    } | {
        user: null;
    }
}

const Profile = (props: profilePropType) => {

    let user  = useUser();
    console.log(">>>>>>", user)
    // const [authenticatedState, setAuthenticatedState] = useState('not-authenticated');
    // const [session, setSession] = useState<sessionType>();
    // useEffect(() => {
    //     let sess = supabase.auth.getSession();
    //     sess.then((data) => {
    //         setSession(data);
    //     }).catch((reason) => {
    //         console.log(reason);
    //     })
    // const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    //     handleAuthChange(event, session)
    //     if (event === 'SIGNED_IN') {
    //       setAuthenticatedState('authenticated')
    //       router.push('/profile')
    //     }
    //     if (event === 'SIGNED_OUT') {
    //       setAuthenticatedState('not-authenticated')
    //     }
    //   })
    //   checkUser()
    //   return () => {
    //     authListener.unsubscribe()
    //   }
    // }, [])
    return (
        <>
            <div >
                <h1>
                    {user?.email }

                </h1>
            </div>
        </>
    )
}


export default Profile






// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//     // Create authenticated Supabase Client
//     const refreshToken = ctx.req.cookies['my-refresh-token']
//     const accessToken = ctx.req.cookies['my-access-token']

//     if (refreshToken && accessToken) {
//         await supabase.auth.setSession({
//             refresh_token: refreshToken,
//             access_token: accessToken,
//         })
//     }

//     // returns user information
//     let user = await supabase.auth.getUser()

//     console.log("????", user)
//     return {
//         props: {

//             user: user.data,
//         },
//     }
// }