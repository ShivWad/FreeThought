// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'supabase';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    console.log("-------------BlogData--------------\n");
    let startTime = performance.now()
    const data = await supabase
        .from('BlogData')
        .select('*')

    console.log(data)

    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

    res.status(200).json({data : data})

}
