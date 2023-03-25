import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/profile");
  // }, [])
  return (

    <div className='landing-page'>
      <title>
        FreeThought
      </title>
      <h1 className='landing-page-heading'>
        Free Thought!
      </h1>
      <div className='landing-page-content'>
        FreeThought is a platform for individuals to share their ideas, opinions, and musings with the world. Our web app provides a safe and welcoming space for users to express themselves freely and connect with like-minded individuals. Whether you're looking to spark a conversation, gain perspective, or simply share your thoughts with others, FreeThought is the perfect platform to do so. Join our community today and let your ideas take flight!
      </div>
      <div className='landing-page-actions'>
        <button className='global-button' onClick={()=>{router.push("/signup")}}>
          Let's go
        </button>
      </div>
    </div>

  )
}
