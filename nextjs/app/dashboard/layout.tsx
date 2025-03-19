import Sidebar from "@/app/dashboard/_components/sidenav/Sidebar"

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <main className="flex gap-3 min-h-[calc(100vh-2rem)]">
        <Sidebar />
        {children}
      </main>
    </>
  )
}

export default DashboardLayout
