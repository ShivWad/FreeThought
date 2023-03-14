import Thought from '@/Components/Thought'
import { PostgrestResponse } from '@supabase/supabase-js'
import React from 'react'
import { supabase } from 'supabase'


type thoughtType = {
    title: string,
    content: string,
    blog_id: number
}

const ThoughtsList = ({ data : data}: PostgrestResponse<any>) => {
    return (
        <div className='all-thoughts-container'>
            {data?.data?.map((thought: thoughtType) => {
                return (
                    <Thought thought={thought} key={thought.blog_id} />
                )
            })}
        </div>
    )
}

export default ThoughtsList

export const getServerSideProps = async () => {


    const data = await supabase.from('BlogData').select('*');

    return {
        props: {
            data: data,
        },
    }
}
