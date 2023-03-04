import { createBrowserSupabaseClient, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { AuthError, createClient, Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react'
import {supabase} from 'supabase'

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


const SignUpPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");
    const [comfPassword, setComfPassword] = useState<string>("")

    const [err, setErr] = useState<"emailError" | "passError" | "error" | "success" | "">("");
    const [errMessage, setErrMessage] = useState('');

    const [userName, setUserName] = useState<string>("");

    const user = useUser();
    // const [session, setSession] = useState<sessionType>();
    const router = useRouter();

    useEffect(() => {
        if (user)
            router.push("/profile");
        else
            console.log(">>>", user)
    }, [user]);

    const handleSignUp = async (email: string) => {

        if (email.length < 0) {
            setErr("error");
            setErrMessage("Please enter an E-mail adderess before proceeding");
            return false;
        }
        // emailValidation(email);
        let queryString = location.search;
        let params = new URLSearchParams(queryString);

        // let redirectUrl: string | null = "";

        // if (params.get("redirectedUrl"))
        //     redirectUrl = params.get("redirectedUrl");

        let authResponse = await supabase.auth.signUp({
            password: password,
            email: email
        });


        if (authResponse.data.user?.identities?.length === 0) {
            setErr("error");
            setErrMessage("This E-mail is already in use!");
            return false;
        }


        if (authResponse.error) {
            setErr("emailError");
            setErrMessage(authResponse.error.message);
            return false;
        }
        else {
            setErr("success");
            setErrMessage("If the given address is a valid E-mail, you should see an E-mail.\n\nPlease confirm your email.");
            setEmail("")
            return true;
        }

    }

    const handleClick = async () => {

        if (password === comfPassword)
            if (password.length < 6) {
                setErr("passError");
                setErrMessage("Password should be atleast 6 characters!");
                return;
            }
            else {
                let signUpResult = await handleSignUp(email);
                if (signUpResult) {
                    // setErr("")
                    // setErrMessage("We are facing some problem");
                }
            }

        else {
            setErr("passError")
            setErrMessage("Password doesn't match");
            return false;
        }


    }
    return (
        <div className={"signin-container"} >
            <div className={`validation-message ${err != "success" ? "err" : "succ"}`}>
                <p>
                    {errMessage}
                </p>
            </div>

            <input type={"email"} value={email} className={`global-text-input  ${err == "emailError" ? "err" : "succ"}`} placeholder='Enter a valid email' autoComplete="new-password" onChange={(e) => {
                setErrMessage("");
                setErr("");
                setEmail(e.target.value)
            }} required />

            <input type={"password"} value={password} className={`global-text-input  ${err == "passError" ? "err" : "succ"}`} placeholder='Enter password' autoComplete="new-password" onChange={(e) => {
                setPassword(e.target.value)
            }} required />

            <input type={"password"} value={comfPassword} className={`global-text-input  ${err == "passError" ? "err" : "succ"}`} placeholder='Confirm password' autoComplete="new-password" onChange={(e) => {
                setComfPassword(e.target.value)
            }} required />

            <button className='global-button' onClick={() => {
                handleClick();
            }} type="submit">
                Sign up
            </button>

            {/* <input type={"text"} value={userName} className={`global-text-input  ${err == "emailError" ? "err" : "succ"}`} placeholder='Enter a user name' autoComplete="new-password" onChange={(e) => {
                setErrMessage("");
                setErr("");
                setUserName(e.target.value)
            }} required />
            
            <button className='global-button' onClick={() => {
                handleClick();
            }} type="submit">
                Set User Name
            </button> */}

        </div>
    )
}


export default SignUpPage

// export const getStaticProps = async () => {

//     const supabaseAdmin = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL || '',
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
//     )

//     const data = await supabaseAdmin.auth.getSession();

//     console.log("data>>>>>>>>>", data.data.session)
//     return {
//         props: {
//             images: data,
//         },
//     }
// }
