// supabase.js

import { createClient, PostgrestError, PostgrestResponse } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl ? supabaseUrl : "", supabaseKey ? supabaseKey : "");

/**
 * SignOuts the user, additionally clears localstorage
 * @returns void
 */
export const SignOut = async () => {
  await supabase.auth.signOut();
  localStorage.clear();
  return Promise.resolve();
};

/**
 * Gets username and sets it to local storage
 * @param uuid uniqure user id
 * @returns usersname response
 */
export const SetGetUserName = async (uuid: string | undefined) => {
  let response: PostgrestResponse<any> = await supabase
    .from("users_public")
    .select()
    .eq("user_id", uuid);

  if (response.error)
    return Promise.reject(response.error);
  else {
    localStorage.setItem('userName', response.data[0].user_name);
    return Promise.resolve(response.data);
  }
};

/**
 * returns supabase localstorage data
 * @returns Local Storage data
 */
export const getLocalStorageData = () => {
  let data = localStorage.getItem(`sp-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}-auth-token`);

  return JSON.parse(data ? data : "{data : null}");
}


