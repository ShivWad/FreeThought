import { createBrowserSupabaseClient, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { AuthError, Session, User } from '@supabase/supabase-js';
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
    const user = useUser();
    // const [session, setSession] = useState<sessionType>();
    const router = useRouter();

    useEffect(() => {
        if (user)
            router.push("/profile");
        else
            console.log(">>>", user)
    }, [user]);

    const handleMagickLink = async (email: string): Promise<boolean> => {

        if (email.length < 0) {
            setErr("error");
            setErrMessage("Please enter an E-mail adderess before proceeding");
            return false;
        }
        // emailValidation(email);
        let queryString = location.search;
        let params = new URLSearchParams(queryString);

        let redirectUrl: string | null = "";

        if (params.get("redirectedUrl"))
            redirectUrl = params.get("redirectedUrl");


        let authResponse = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (authResponse.error) {
            setErr("error");
            setErrMessage("Please enter an E-mail address before proceeding!");
            return false;
        }
        else {
            setErr("success");
            setErrMessage("Magick link sent succefully! If the given address is valid, you should see an E-mail.\n\nPlease check your email.");
            setEmail("")
            return true;
        }
    }

    const handleClick = async (email: string) => {
        await handleMagickLink(email);
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
                setErrMessage("");
                setErr("");
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


// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

//     const refreshToken = ctx.req.cookies['my-refresh-token']
//     const accessToken = ctx.req.cookies['my-access-token']

//     if (refreshToken && accessToken) {
//         await supabase.auth.setSession({
//             refresh_token: refreshToken,
//             access_token: accessToken,
//         })
//     }

//     // returns user information
//     let user = await supabase.auth.setSession({ accessToken, refreshToken })

//     console.log("????", user.data)

//     // console.log(ctx.req.cookies["sb-access-token"]);
//     // Check if we have a session
//     // const { data: { session }, } = await supabase.auth.getSession();


//     // console.log(">>", session)

//     // if (session)
//     //     return {
//     //         redirect: {
//     //             destination: '/profile',
//     //             permanent: false,
//     //         },
//     //     }
//     return {
//         props: {
//             data: null,
//         },
//     }
// }