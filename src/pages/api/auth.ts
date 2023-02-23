// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { AuthError, Session } from '@supabase/supabase-js';
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { supabase } from 'supabase';

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "supabase";

// type Data = {
//     data: {
//         session: Session;
//     };
//     error: null;
// } | {
//     data: {
//         session: null;
//     };
//     error: AuthError;
// } | {
//     data: {
//         session: null;
//     };
//     error: null;
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     // Set the auth cookie.
//     supabase.auth.api.setAuthCookie(req, res);
//    }
// Creating a new supabase server client object (e.g. in API route):
// import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const supabaseServerClient = createServerSupabaseClient<any>({
//         req,
//         res,
//     })
//     const {
//         data: { user },
//     } = await supabaseServerClient.auth.getUser()

//     res.status(200).json({ user: user })
// }






export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data, error } = await supabase.auth.getSession();
    return res.json(data);
}