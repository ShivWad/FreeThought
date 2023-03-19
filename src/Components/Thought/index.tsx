import { UserResponse } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { supabase } from 'supabase'

type thoughtType = {
    thought: {
        title: string,
        content: string,
        blog_id: number,
        created_at: string,
        created_by: string,
        user_name: string,
    },
}

const Thought = ({ thought }: thoughtType) => {
 
    return (
        <div className='thought-container'>
            <div className='thought-user-title'>
                <span className='thought-title'>
                    {thought.title}
                </span>
                <span className='thought-username'>{thought.user_name ? `@${thought.user_name}` : "Anonymous"}</span>
            </div>
            <span className='thought-content'>
                {thought.content}
            </span>
        </div>
    )
}

export default Thought