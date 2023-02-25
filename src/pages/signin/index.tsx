import { createBrowserSupabaseClient, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { AuthError, createClient, Session, User } from '@supabase/supabase-js';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase'


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


const SignInPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");
    const [err, setErr] = useState<"emailError" | "passError" | "error" | "success" | "">("");
    const [errMessage, setErrMessage] = useState('');
    let redBack: string | null = null;
    //const user = useUser();
    const [session, setSession] = useState<sessionType>();
    const router = useRouter();

    useEffect(() => {
        let queryString = location.search;
        let params = new URLSearchParams(queryString);

        let redirectMessage: string | null = "";

        if (params.get("redMess"))
            redirectMessage = params.get("redMess");

        if (redirectMessage) {
            setErr("error");
            if (redirectMessage)
                if (redirectMessage == "no-log-in")
                    setErrMessage("Please log in first!");
            if (params.get("redBack"))
                redBack = params.get("redBack");

        }
        let sess = supabase.auth.getSession();
        sess.then((data) => {
            setSession(data);
            if (session?.data)
                router.push("/profile");
        }).catch((reason) => {
            console.log(reason)
        })
        // if (user)
        //     router.push("/profile");
        // else
        //     console.log(">>>", user)

 

    }, []);

    const handleSignIn = async (email: string): Promise<boolean> => {
        console.log("LET GOOOOOOOO>>>", email);
        if (email.length < 0) {
            setErr("error");
            setErrMessage("Please enter an E-mail adderess before proceeding");
            return false;
        }
        // emailValidation(email);


        let authResponse = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        console.log(">>>", authResponse)
        if (authResponse.error) {
            setErr("error");
            setErrMessage(authResponse.error.message);
            return false;
        }
        else {
            setErr("success");
            setErrMessage("Logged in succesfully");
            setEmail("");
            router.push(redBack ? new URL(redBack) : "/profile");
            return true;
        }
    }

    const handleClick = async (email: string) => {
        await handleSignIn(email);
    }
    console.log(email);
    return (
        <div className={"signin-container"} >
            <div className={`validation-message ${err != "success" ? "err" : "succ"}`}>
                <p>
                    {errMessage}
                </p>
            </div>

            <input type={"email"} value={email} className={`cred-input  ${err == "emailError" ? "err" : "succ"}`} placeholder='Enter valid email' onChange={(e) => {
                setEmail(e.target.value)
            }} required />

            <input type={"password"} value={password} className={`cred-input  ${err == "passError" ? "err" : "succ"}`} placeholder='Enter password' onChange={(e) => {
                setPassword(e.target.value)
            }} required />

            <button className='magin-link-button' onClick={(e) => {
                handleClick(email);
            }} type="submit">
                Sign In
            </button>

        </div>
    )
}

export default SignInPage


export const getStaticProps = async () => {

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )

    const data = await supabaseAdmin.auth.getSession();

    console.log("data>>>>>>>>>", data)
    return {
        props: {
            images: data,
        },
    }
}
