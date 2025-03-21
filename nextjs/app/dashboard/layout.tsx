import Sidebar from '@/app/dashboard/_components/sidenav/Sidebar'
import { FaGifts } from 'react-icons/fa'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <main className="flex gap-3 min-h-[calc(100vh-2rem)]">
        <Sidebar />
        <div className="relative flex-1 p-4">
          {children}
          <div className="grow flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full opacity-20 -z-10">
            <h1 className="text-3xl text-orange">Gifts for happy 🎁 💐!</h1>
            <div>
              <div>
                <FaGifts className="w-52 h-52 text-orange-light opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default DashboardLayout
