import { AuthError, createClient, PostgrestResponse, Session, User, UserResponse } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase'
import { useUser } from '@supabase/auth-helpers-react'
import { Router, useRouter } from 'next/router'

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



const Profile = () => {
    const user = useUser();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            console.log(user)
        }
        else
            router.push("/signin?redMess=no-log-in&redBack=/profile")
    }, [])
    const [authenticatedState, setAuthenticatedState] = useState('not-authenticated');
    const [session, setSession] = useState<sessionType>();




    return (
        <>
            <div >
                <h1>
                    {user?.email}
                </h1>
            </div>
        </>
    )
}


export default Profile


// export async function getServerSideProps() {

//     const {
//         data: { session },
//       } = await supabase.auth.getSession()

//       console.log({session})
//     return {
//         props: {
//             data: session,
//         },
//     }
// }
