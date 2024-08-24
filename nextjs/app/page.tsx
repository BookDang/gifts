import Image from 'next/image'
import { AiFillAlert } from 'react-icons/ai'

const Home = () => {
  return (
    <>
      <div className="w-[200px] mx-auto">
        <Image src="/favicon.png" alt="Next.js Logo" width={200} height={200} />
      </div>
    </>
  )
}

export default Home
