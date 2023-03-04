import { PostgrestResponse } from '@supabase/supabase-js'
import React from 'react'
import { supabase } from 'supabase'


type thoughtType = {
    title: string,
    content: string,
    blog_id: number
}

const ThoughtsList = ({ data }: PostgrestResponse<any>) => {


    console.table(data);

    return (
        <div>
            {data?.map((thought: thoughtType) => {
                return (
                    <div key={thought.blog_id}>
                        <h3>
                            {thought.title}
                        </h3>
                        <p>
                            {thought.content}
                        </p>
                    </div>
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
