import Thought from '@/Components/Thought'
import { PostgrestResponse, UserResponse } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import { supabase } from 'supabase'
const FIRST_CALL_LIMIT = 5;  //6 (0-5)

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

    const [thoughts, setThoughts] = useState(data.data);
    const [fetchFrom, setFrom] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const fetchThoughts = async (from: number) => {
        // const data = await supabase
        //     .from('BlogData')
        //     .select('*').range(from, from + 5);
        // if (data.data)
        //     setThoughts((prev) => [...prev, ...data.data]);

        setFrom(from + 6)
        console.log(fetchFrom, "FIRED");


    }
    // useEffect(() => {
    //     console.log(ref)
    //     if (ref.current)
    //         ref.current.addEventListener('scroll', function (e) {
    //                 let documentHeight = document.body.scrollHeight;
    //                 let currentScroll = window.scrollY + window.innerHeight;
    //                 // When the user is [modifier]px from the bottom, fire the event.
    //                 let modifier = 200;
    //                 if (currentScroll + modifier > documentHeight) {
    //                     fetchThoughts(fetchFrom)
    //                 }
    //             })
            
    // })




    return (
        <div className='all-thoughts-container' ref={ref}>
            {thoughts?.map((thought: thoughtType) => {
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
        // .range(0, FIRST_CALL_LIMIT);

    console.log(data)

    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

    return {
        props: {
            data: data,
        },
    }
}
