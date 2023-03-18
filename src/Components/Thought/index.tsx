import { UserResponse } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase'

type thoughtType = {
    thought: {
        title: string,
        content: string,
        blog_id: number,
        created_at: string
        created_by: string
    },
    user: UserResponse
}

const Thought = ({ thought, user }: thoughtType) => {
    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        supabase
            .from('users_public')
            .select("*")
            // Filters
            .eq("user_id", user.data.user?.id).then((r) => {
                if (r.data)
                    setUserName(r.data[0]?.user_name)
            })
    }, []);

    return (
        <div className='thought-container'>            
            <p className='thought-title'>
                {thought.title}
            </p>
            <p className='thought-content'>
                {thought.content}
            </p>
            <p className='thought-username'>@{userName ? userName : "Anonymous"}</p>
        </div>
    )
}

export default Thought