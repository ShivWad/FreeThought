import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SetGetUserName, supabase } from 'supabase';

const WriteThought = () => {
    const user = useUser();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userName, setUserName] = useState("");
    useEffect(() => {
        if (user) {
            console.log(user)
        }
        else
            router.push("/signin?redMess=no-log-in&redBack=/write")
    }, []);


    const handleCreateThought = async () => {
        let userPublic = await SetGetUserName(user?.id);
        if (!userPublic)
            return
        const { data, error } = await supabase
            .from('BlogData')
            .insert([
                { title: title, content: content, created_by: user?.id, user_name: userPublic[0].user_name },
            ]).select();
        console.log("dataa>>>", data, error)
    }
    return (
        <div>
            <input type={"text"} value={title} onChange={(e) => {
                setTitle(e.target.value)
            }} required />
            <input type={"text"} value={content} onChange={(e) => {
                setContent(e.target.value)
            }} required />
            <button onClick={handleCreateThought}>
                Submit
            </button>
        </div>
    )
}

export default WriteThought