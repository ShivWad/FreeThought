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


const SignUpPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");
    const [comfPassword, setComfPassword] = useState<string>("")

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

    const handleSignUp = async (email: string): Promise<boolean> => {

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

        let authResponse = await supabase.auth.signUp({
            password: password,
            email: email
        })

        if (authResponse.error) {
            setErr("emailError");
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

    const handleClick = async () => {

        if (password === comfPassword)
            await handleSignUp(email);
        else {
            setErr("passError")
            setErrMessage("Password doesn't match");
            return false;
        }


    }
    console.log(email);
    return (
        <div className={"signin-container"} >
            <div className={`validation-message ${err != "success" ? "err" : "succ"}`}>
                <p>
                    {errMessage}
                </p>
            </div>

            <input type={"email"} value={email} className={`cred-input  ${err == "emailError" ? "err" : "succ"}`} placeholder='Enter a valid email' autoComplete="new-password" onChange={(e) => {
                setErrMessage("");
                setErr("");
                setEmail(e.target.value)
            }} required />

            <input type={"password"} value={password} className={`cred-input  ${err == "passError" ? "err" : "succ"}`} placeholder='Enter password' autoComplete="new-password" onChange={(e) => {
                setPassword(e.target.value)
            }} required />

            <input type={"password"} value={comfPassword} className={`cred-input  ${err == "passError" ? "err" : "succ"}`} placeholder='Confirm password' autoComplete="new-password" onChange={(e) => {
                setComfPassword(e.target.value)
            }} required />

            <button className='magin-link-button' onClick={() => {
                handleClick();
            }} type="submit">
                Sign up
            </button>

        </div>
    )
}

export default SignUpPage


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