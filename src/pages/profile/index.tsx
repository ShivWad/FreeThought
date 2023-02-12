import { AuthError, Session, User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase'
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


const Profile = () => {
    // const [authenticatedState, setAuthenticatedState] = useState('not-authenticated');
    const [session, setSession] = useState<sessionType>();
    useEffect(() => {
        let sess = supabase.auth.getSession();
        sess.then((data) => {
            setSession(data);
        }).catch((reason) => {
            console.log(reason);
        })
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
    }, [])
    return (
        <>
            <div >
                <h1>
                    {session?.data.session?.user.email}

                </h1>
                {session?.data.session?.user.id}
            </div>
        </>
    )
}


export default Profile
