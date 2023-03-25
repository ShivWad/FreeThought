import Thought from '@/Components/Thought'
import { PostgrestResponse, UserResponse } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import Icons from 'public/icons'
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


const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms));


const ThoughtsList = ({ data }: thoughtsPropType) => {

    const [thoughts, setThoughts] = useState(data.data);

    //Fetch index, using in range
    const [fetchIndex, setFetchIndex] = useState(FIRST_CALL_LIMIT + 1);
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState(true);


    const fetchThoughts = async () => {
        setLoading(true);
        await sleep(3000);
        const data = await supabase
            .from('BlogData')
            .select('*').order('blog_id', { ascending: false }).range(fetchIndex, fetchIndex + 4);
        console.log(">>>in fetchThoughts", fetchIndex);
        if (data.error) {
            setLoading(false);
            return;
        }
        if (data.data) {
            console.log(">>>", fetchIndex, fetchIndex + 4)
            console.log(">>>>", data)
            if (data.data.length > 0) {
                //@ts-ignore
                setThoughts((prev) => [...prev, ...data.data]);
                setFetchIndex((prev) => prev + 5);
            }
            else {
                setLoading(false);
                setFetch(false)
            }
        }
        setLoading(false);
    }

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight && fetch) {
            fetchThoughts();
            console.log(">>>", { fetch })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [fetchIndex, fetch])


    return (
        <div className='all-thoughts-container' >
            {thoughts?.map((thought: thoughtType) => {
                return (
                    <Thought thought={thought} key={thought.blog_id} />
                )
            })}
            {loading &&
                <Icons.LoadingAnimated />
            }
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
        .order('blog_id', { ascending: false })
        .range(0, FIRST_CALL_LIMIT);
    console.log(data)

    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

    return {
        props: {
            data: data,
        },
    }
}
