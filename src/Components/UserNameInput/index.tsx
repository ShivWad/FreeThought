import { supabase } from 'supabase'
import React, { useEffect, useRef, useState } from 'react'

type userNameInputPropTypes = {
    uuid: string | undefined,
    propSetUserName?: React.Dispatch<React.SetStateAction<string | null>>
    setShowUserNameInput: React.Dispatch<React.SetStateAction<boolean>>
}
const UserNameInput = ({ uuid, propSetUserName, setShowUserNameInput }: userNameInputPropTypes) => {
    // const [showUserNameInput, setShowUserNameInput] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [err, setErr] = useState<"emailError" | "passError" | "error" | "success" | "">("");
    const [errMessage, setErrMessage] = useState('');
    const nameRef = useRef<HTMLInputElement>(null);
    const handleSetUserName = async () => {
        let rows = await supabase.from("users_public").insert({
            user_name: nameRef.current?.value,
            user_id: uuid
        }).select();

        console.log("uoooo", rows)

        if (rows.error) {
            setErr("error")
            setErrMessage(rows.error.message);
        }
        else {
            if (propSetUserName)
                propSetUserName(rows.data[0].user_name);
            setShowUserNameInput(false);
        }
    }
    return (
        <>
            <div className={`validation-message ${err != "success" ? "err" : "succ"}`}>
                <p>
                    {errMessage}
                </p>
            </div>
            <div>
                <input type={"text"} className={'global-text-input'} placeholder={"Enter a user name"} ref={nameRef} />
                <button className='global-button' onClick={handleSetUserName}>Set User Name</button>
            </div>
        </>
    )
}

export default UserNameInput