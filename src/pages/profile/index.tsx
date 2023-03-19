
import React, { useEffect, useState } from 'react'
import { SetGetUserName } from 'supabase'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import UserNameInput from '@/Components/UserNameInput'


// type infoType = {
//     data: {
//         user: User | null;
//         session: Session | null;
//     } | {
//         user: null;
//         session: null;
//     }
// }

// type sessionType = {
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


// type profilePropType = {
//     fetchedUser: {
//         user: User;
//     } | {
//         user: null;
//     }
// }



const Profile = () => {
    const user = useUser();
    const router = useRouter();
    const [showUserNameInput, setShowUserNameInput] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    useEffect(() => {
        if (user) {
            if (!localStorage.getItem('userName')) {
                SetGetUserName(user.id).then((rows) => {
                    if (!rows?.length) {
                        setShowUserNameInput(true)
                    }
                    else {
                        setUserName(rows[0].user_name);
                    }
                })
            }
            else setUserName(localStorage.getItem('userName'));
        }
        else
            router.push("/signin?redMess=no-log-in&redBack=/profile")
    }, [])


    return (
        <>
            {showUserNameInput &&
                <UserNameInput uuid={user?.id} propSetUserName={setUserName} setShowUserNameInput={setShowUserNameInput} />
            }
            {!showUserNameInput &&
                < div style={{ textAlign: "center" }}>
                    <h1>
                        {userName}
                    </h1>
                </div>
            }
        </>
    )
}


export default Profile

// export const getServerSideProps = async () => {

// //    const data = await supabase.from('BlogData').select('*').eq("created_by", data)
//         return {
//             props: {
//                 data: "",
//             },
//         }
//     }



// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//     // Create authenticated Supabase Client
//     const supabase = createServerSupabaseClient(ctx, { supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY })
//     // Check if we have a session
//     const  data = await supabase.auth.admin.listUsers()
//     console.log(data);
//     if (!data)
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }

//     // Run queries with RLS on the server
//     // const { data } = await supabase.from('users').select('*')

//     return {
//         props: {
//             // initialSession: session,
//             // user: session.user,
//             data: data ?? [],
//         },
//     }
// }