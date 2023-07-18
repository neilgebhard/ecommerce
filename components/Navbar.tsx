'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { useParams, usePathname } from 'next/navigation'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const params = useParams()

  console.log('Navbar: ', pathname)

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <div className='flex justify-between p-3'>
      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {route.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <UserButton />
    </div>
  )
}

export default Navbar
