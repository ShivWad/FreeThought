import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase';

const WriteThought = () => {
    const user = useUser();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        if (user) {
            console.log(user)
        }
        else
            router.push("/signin?redMess=no-log-in&redBack=/write")
    }, []);


    const handleCreateThought = async () => {
        const { data, error } = await supabase
            .from('BlogData')
            .insert([
                { title: title, content: content, created_by:user?.id },
            ]).select();

            console.log("dataa>>>",data,error)
        
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