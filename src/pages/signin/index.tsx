import { Session, User } from '@supabase/supabase-js';
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

// type testProps = {
//     data: {
//         session: Session;
//     };
//     error: null;
// } | {
//     data: {
//         session: null;
//     };
//     error: AuthError;
// } | {
//     data: {
//         session: null;
//     };
//     error: null;
// }


const SignInComponent = () => {
    const [email, setEmail] = useState<string>('');

    const handleMagickLink = async (email: string) => {
        await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: 'http://localhost:3000/profile',
            },
        })
    }

    console.log(email);
    return (
        <div className='signin-container' >
            <input type={"email"} className="email-input" placeholder='Enter valid email' onChange={(e) => { setEmail(e.target.value) }} />
            <button className='magin-link-button' onClick={() => handleMagickLink(email)} >
                Get Magick Link
            </button>
        </div>
    )
}

export default SignInComponent  