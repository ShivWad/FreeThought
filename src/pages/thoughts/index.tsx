import Thought from '@/Components/Thought'
import { PostgrestResponse, UserResponse } from '@supabase/supabase-js'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { adminSupabase, supabase } from 'supabase'


type thoughtType = {
    title: string,
    content: string,
    blog_id: number,
    created_at: string
    created_by: string
}
type thoughtsPropType = {
    data: PostgrestResponse<any>,
    users: UserResponse[]
}

const ThoughtsList = ({ data, users }: thoughtsPropType) => {

    return (
        <div className='all-thoughts-container'>
            {data?.data?.map((thought: thoughtType, index) => {
                return (
                    <Thought thought={thought} key={thought.blog_id} user={users[index]} />
                )
            })}
        </div>
    )
}

export default ThoughtsList

export const getServerSideProps = async () => {
    const data = await supabase.from('BlogData').select('*');
    let userRes: UserResponse[] = [];
    for (let i = 0; i < data.data!.length; i++) {
        //@ts-ignore
        let user = await adminSupabase.auth.admin.getUserById(data.data[i].created_by);
        userRes.push(user);
    }
    return {
        props: {
            data: data,
            users: userRes
        },
    }
}
