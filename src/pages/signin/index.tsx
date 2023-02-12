import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { GetServerSidePropsContext } from 'next';
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


const SignInComponent = (props: null) => {
    const [email, setEmail] = useState<string>('');
    const [err, setErr] = useState<"error" | "success" | "">("");
    const [errMessage, setErrMessage] = useState('');
    // const [session, setSession] = useState<sessionType>();


    // useEffect(() => {
    //     let sess = supabase.auth.getSession();
    //     sess.then((data) => {
    //         setSession(data);
    //     }).catch((reason) => {
    //         console.log(reason);
    //     })
    // }, [])
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

        console.log(redirectUrl)

        let user = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: redirectUrl ? process.env.NEXT_PUBLIC_DEPLOYED_URL + redirectUrl : process.env.NEXT_PUBLIC_DEPLOYED_URL,
            },
        })

        if (user.error) {
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
        let result = await handleMagickLink(email);

    }
    console.log(email);
    return (
        <div className={"signin-container"} >

            {/* {session?.data.session?.user.email} */}
            <div className={`validation-message ${err == "error" ? "err" : "succ"}`}>
                <p>
                    {errMessage}
                </p>
            </div>
            <input type={"email"} value={email} className={`email-input  ${err == "error" ? "err" : "succ"}`} placeholder='Enter valid email' onChange={(e) => {
                setErrMessage("");
                setErr("");
                setEmail(e.target.value)
            }} required />
            <button className='magin-link-button' onClick={(e) => {
                handleClick(email);
            }} type="submit">
                Get Magick Link
            </button>

        </div>
    )
}

export default SignInComponent


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client

    const supabase = createServerSupabaseClient(ctx)

    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()


    console.log(session?.user)

    if (session)
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        }
    return {
        props: {
            data: null,
        },
    }
}