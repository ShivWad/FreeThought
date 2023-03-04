import { AuthError, createClient, PostgrestResponse, Session, User, UserResponse } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
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
    const [showUserNameInput, setShowUserNameInput] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const [err, setErr] = useState<"emailError" | "passError" | "error" | "success" | "">("");
    const [errMessage, setErrMessage] = useState('');
    const [userName, setUserName] = useState();
    useEffect(() => {
        let data;
        if (user) {
            supabase.from("users_public").select()
                .eq("user_id", user.id).then((rows) => {
                    data = rows;
                    if (!rows.data?.length) {

                        setShowUserNameInput(true)
                    }
                    else {
                        setUserName(rows.data[0].user_name);
                        localStorage.setItem('userName', rows.data[0].user_name);
                    }
                })
        }
        else
            router.push("/signin?redMess=no-log-in&redBack=/profile")


        console.log(data);
    }, [])
    // const [authenticatedState, setAuthenticatedState] = useState('not-authenticated');
    // const [session, setSession] = useState<sessionType>();
    const handleSetUserName = async () => {
        let rows = await supabase.from("users_public").insert({
            user_name: nameRef.current?.value,
            user_id: user?.id
        }).select();

        console.log("uoooo", rows)

        if (rows.error)
            setErrMessage(rows.error.message);
        else {
            setUserName(rows.data[0].user_name);
            localStorage.setItem('userName', rows.data[0].user_name);
            setShowUserNameInput(false);
        }
    }

    return (
        <>
            <div className={`validation-message ${err != "success" ? "err" : "succ"}`}>
                <p>
                    {errMessage}
                </p>
            </div>
            {showUserNameInput &&
                <div>
                    <input type={"text"} className={'global-text-input'} placeholder={"Enter a user name"} ref={nameRef} />
                    <button className='global-button' onClick={handleSetUserName}>Set User Name</button>
                </div>
            }


            <div >
                <h1>
                    {userName}
                </h1>
            </div>
        </>
    )
}


export default Profile


// export async function getServerSideProps() {
//     const data = supabase.from("users_public").select()
//         .eq("user_id", user.id).then((rows) => {
//             console.log("data>>>", rows.data?.length)
//             if (!rows.data?.length) {
//                 setShowUserNameInput(true)
//             }
//         })
//     return {
//         props: {
//             data: session,
//         },
//     }
// }
