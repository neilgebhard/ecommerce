'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { useParams, usePathname } from 'next/navigation'

import { Store } from '@prisma/client'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import StoreCombobox from '@/components/StoreCombobox'

const Navbar = ({ stores }: { stores: Store[] }) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <div className='flex justify-between p-3 border-b'>
      <NavigationMenu>
        <NavigationMenuList>
          <StoreCombobox stores={stores} />
          {routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={route.active}
                >
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
