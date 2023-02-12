import { AuthError, Session, User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { AppContext } from 'next/app'
import { GetServerSidePropsContext } from 'next'

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
    initialSession: Session;
    user: User;
}

const Profile = (props: profilePropType) => {

    console.log(">>>>>>", props)

    let { initialSession, user } = props;
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
                    {initialSession.user.email}

                </h1>
                {initialSession.user.id}
            </div>
        </>
    )
}


export default Profile






export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    console.log(session?.user)

    if (!session)
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    return {
        props: {
            initialSession: session,
            user: session.user,
        },
    }
}