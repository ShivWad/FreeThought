import Thought from '@/Components/Thought'
import { PostgrestResponse, UserResponse } from '@supabase/supabase-js'
import React from 'react'
import { supabase } from 'supabase'


type thoughtType = {
    title: string,
    content: string,
    blog_id: number,
    created_at: string,
    created_by: string,
    user_name: string
}
type thoughtsPropType = {
    data: PostgrestResponse<any>,
}

const ThoughtsList = ({ data }: thoughtsPropType) => {

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
    console.log("-------------BlogData--------------\n");
    let startTime = performance.now()
    const data = await supabase
        .from('BlogData')
        .select('*')

    console.log(data)

    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

    return {
        props: {
            data: data,
        },
    }
}
