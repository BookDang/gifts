import Image from 'next/image'
import { AiFillAlert } from 'react-icons/ai'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello s
      <AiFillAlert className="text-5xl text-red-500" />
    </main>
  )
}

export default Home
