'use client'

import React from 'react'
import { ImProfile } from 'react-icons/im'
import { IoMdSettings } from 'react-icons/io'
import { MdGroup, MdHelpCenter, MdNotificationsActive } from 'react-icons/md'
import { TiGroup } from 'react-icons/ti'

type MenuItem = {
  title: string
  href: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    title: 'My Groups',
    href: '/dashboard/my-groups',
    icon: <MdGroup className="w-6 h-6" />,
  },
  {
    title: 'Groups I Joined',
    href: '/dashboard/groups-joined',
    icon: <TiGroup className="w-6 h-6" />,
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: <MdNotificationsActive className="w-6 h-6" />,
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: <ImProfile className="w-6 h-6" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <IoMdSettings className="w-6 h-6" />,
  },
  {
    title: 'Help',
    href: '/dashboard/help',
    icon: <MdHelpCenter className="w-6 h-6" />,
  },
]

const Sidebar: React.FC = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = React.useState<boolean>(true)

  return (
    <>
      <aside
        className={`${
          isMenuCollapsed ? 'w-64' : 'w-[3.5rem]'
        } overflow-hidden shadow-orange-sm border-orange-light rounded-md text-orange-light p-2 flex flex-col justify-between transition-[width] duration-300`}
      >
        <div>
          <h1 className="text-2xl w-[calc(16rem-1rem)] font-bold mb-6 space-x-3 p-2 menu-item">
            🎁 <span className="pl-4">Gifts App</span>
          </h1>
          <nav className="flex-1 w-[calc(16rem-1rem)]">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title} className="relative group">
                  <a
                    href={item.href}
                    className="flex menu-item items-center p-2 rounded-md group-hover:text-white"
                  >
                    {item.icon}
                    <span className="pl-5">{item.title}</span>
                  </a>
                  <div className={`group-hover:bg-orange-light transition-[width] duration-300 ${isMenuCollapsed ? 'w-full' : 'w-10'} -z-10 h-full absolute top-0 left-0 rounded-md bg-menu_item`}></div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <footer className="text-center text-xs mt-4">
          <p className="cursor-pointer" onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}>
            &copy; 2022 Gifts App
          </p>
        </footer>
      </aside>
    </>
  )
}

export default Sidebar
