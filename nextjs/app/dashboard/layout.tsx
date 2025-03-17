type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
      </header>
      <main>{children}</main>
      <footer>
      </footer>
    </>
  )
}

export default DashboardLayout
