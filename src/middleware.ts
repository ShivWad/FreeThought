import { supabase } from "supabase";
import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareSupabaseClient, Session } from '@supabase/auth-helpers-nextjs'
import { AuthError } from "@supabase/supabase-js";


type sessionType = {
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

export async function middleware(req: NextRequest) {

    const res = NextResponse.next();

    const middleWear = createMiddlewareSupabaseClient({ req, res })
    const
        responseFromAuthApi = await fetch("http://localhost:3000/api/auth")

    let session: sessionType = await responseFromAuthApi.json();

    console.log(">>>",session.data.session?.user.email);

    // session.then((sess: any) => {
    //     console.log("????????", sess)
    //     if (sess.data.session?.user) {
    //         // Authentication successful, forward request to protected route.
    //         return res
    //     }
    // }).catch((reason) => {
    //     console.log(reason);
    // })

    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/signin'
    redirectUrl.searchParams.set(`redirectedUrl`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
}

export const config = {
    matcher: ['/write', '/profile'],
}
