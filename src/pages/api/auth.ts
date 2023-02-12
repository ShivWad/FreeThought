// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AuthError, Session } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'supabase';
type Data = {
    data: {
        session: Session;
    };
    error: null;
} | {
    data: {
        session: null;
    };
    error: AuthError;
} | {
    data: {
        session: null;
    };
    error: null;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    console.log('INSIDE API')
    let session = await supabase.auth.getSession();
    // let result = session.then((session) => {
    //     return session
    // }).catch((err) => {
    //     return err
    // })
    return res.status(200).json(session);
}
