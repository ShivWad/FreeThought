import React from 'react'
type thoughtType = {
    thought: {
        title: string,
        content: string,
        blog_id: number
    }
}

const Thought = ({ thought }: thoughtType) => {

    return (
        <div className='thought-container'>
            <h4 className='thought-title'>
                {thought.title}
            </h4>
            <p className='thought-content'>
                {thought.content}
            </p>
        </div>
    )
}

export default Thought