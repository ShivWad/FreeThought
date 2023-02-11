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

// const vibarateElem = () => {
//     const emailEl = document.getElementsByClassName("signin-container");
//     for (let i = 0; i < 10; i++) {
//       emailEl[0].style = "left:100px";
//     }
// }
const SignInComponent = () => {
    const [email, setEmail] = useState<string>('');
    const [err, setErr] = useState(false);
    const [errMessage, setErrMessage] = useState('');


    const handleMagickLink = async (email: string) => {
        // emailValidation(email);
        let user = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: 'http://localhost:3000/profile',
            },
        })
        if (user.error) {
            setErr(true);
            setErrMessage(user.error.message);
            // vibarateElem();
        }
    }

    console.log(email);
    return (
        <div className={`signin-container ${err ? "err" : ""}`} >
            <input type={"email"} className="email-input" placeholder='Enter valid email' onChange={(e) => { setEmail(e.target.value) }} required />
            <button className='magin-link-button' onClick={(e) => {
                handleMagickLink(email);
            }} type="submit">
                Get Magick Link
            </button>
        </div>
    )
}

export default SignInComponent  