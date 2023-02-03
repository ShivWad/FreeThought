import React from 'react'

const SignInComponent = () => {
    return (
        <div className='flex text-white bg-black h-[calc(100vh-56px)] flex-col justify-center items-center gap-5'>

            <input type={"email"} className="text-black b-1 text-xl text-center bg-[#84c4e9f1] w-full md:w-auto font-bold p-4 border-0 rounded-[2rem] focus-visible:outline-cyan-600 focus-visible:outline-4" />
            <input type={"password"} className="text-black b-1 text-xl text-center bg-[#b8e6fc] w-screen  font-bold p-4 border-0 rounded-[2rem] focus-visible:outline-cyan-600 focus-visible:outline-4" />
        </div>
    )
}

export default SignInComponent  