import { AuthError, Session, User } from '@supabase/supabase-js'
import { data } from 'autoprefixer'
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

type testProps = {
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


const Test = () => {

    const [session, setSession] = useState<testProps>();
    useEffect(() => {
        let sess = supabase.auth.getSession();
        sess.then((data) => {
            setSession(data);
        }).catch((reason) => {
            console.log(reason);
        })
    }, [])

    return (
        <>
            <div >
                <h1>
                    {session?.data.session?.user.email}
                </h1>
            </div>
        </>
    )
}

export default Test
