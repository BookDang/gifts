import Image from 'next/image'
import { AiFillAlert } from 'react-icons/ai'
import { appWithTranslation } from 'next-i18next'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello s
      <AiFillAlert className="text-5xl text-red-500" />
    </main>
  )
}

export default appWithTranslation(Home)
