import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useState, ReactNode } from 'react';

import { Logo } from '@/components/shared/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { brandingConfig } from '@/config/brandingConfig';
import { useUserContext } from '@/context/UserContext';
import { NavbarProps, NavItemsProps } from '@/types';

interface NavItemProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, isActive }) => (
  <Link
    href={href}
    className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
      isActive
        ? 'bg-brand-red text-white font-medium'
        : 'border border-white/30 text-white hover:bg-white/10'
    }`}
  >
    {children}
  </Link>
);

const NavItems: React.FC<NavItemsProps> = ({
  isAuthenticated,
  role,
  pathname,
}) => {
  const homeItem = {
    path: '/',
    label: 'Home',
    show: brandingConfig.navbar.menuItems.home,
  };

  const commonItems = [
    {
      path: '/documents',
      label: 'Documents',
      show: brandingConfig.navbar.menuItems.documents,
    },
    {
      path: '/collections',
      label: 'Collections',
      show: brandingConfig.navbar.menuItems.collections,
    },
    {
      path: '/chat',
      label: 'Chat',
      show: brandingConfig.navbar.menuItems.chat,
    },
    {
      path: '/search',
      label: 'Search',
      show: brandingConfig.navbar.menuItems.search,
    },
  ];

  const adminItems = [
    {
      path: '/users',
      label: 'Users',
      show: brandingConfig.navbar.menuItems.users,
    },
    {
      path: '/analytics',
      label: 'Analytics',
      show: brandingConfig.navbar.menuItems.analytics,
    },
    {
      path: '/settings',
      label: 'Settings',
      show: brandingConfig.navbar.menuItems.settings,
    },
  ];

  const items =
    role === 'admin'
      ? [homeItem, ...commonItems, ...adminItems]
      : [...commonItems];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav>
      <div className="flex items-center space-x-2">
        {items
          .filter((item) => item.show)
          .map((item) => (
            <NavItem
              key={item.path}
              href={item.path}
              isActive={pathname === item.path}
            >
              {item.label}
            </NavItem>
          ))}
      </div>
    </nav>
  );
};

export const Navbar = forwardRef<React.ElementRef<'nav'>, NavbarProps>(
  function Header({ className }, ref) {
    const pathname = usePathname();
    const {
      logout,
      isAuthenticated,
      authState,
      viewMode,
      setViewMode,
      isSuperUser,
    } = useUserContext();
    const router = useRouter();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
      const savedAuth = localStorage.getItem('authState');
      if (savedAuth && !isAuthenticated) {
        const authData = JSON.parse(savedAuth);
      }
      setIsSignedIn(isAuthenticated);
    }, [isAuthenticated]);

    const role = viewMode === 'user' ? 'user' : authState.userRole || 'user';

    const handleLogout = async () => {
      await logout();
      router.push('/auth/login');
    };

    return (
      <nav ref={ref} className="bg-brand-navy shadow z-50 w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-center items-center h-14 w-full">
              <Link
                href={isSuperUser() ? '/' : '/documents'}
                className="flex items-center"
              >
                <Logo className="h-12 w-auto" disableLink={true} />
                <span className="ml-2 text-sm font-light tracking-widest uppercase text-white">
                  {brandingConfig.navbar.appName}
                </span>
              </Link>
            </div>
            {isSignedIn && (
              <div className="flex items-center justify-center space-x-2 pb-2">
                <NavItems
                  isAuthenticated={isAuthenticated}
                  role={role}
                  pathname={pathname}
                />
              </div>
            )}
            <div className="absolute right-4 top-3 flex items-center space-x-4">
              {brandingConfig.navbar.showDocsButton && (
                <Button
                  color="primary"
                  shape="outline_wide"
                  onClick={() =>
                    window.open('https://r2r-docs.sciphi.ai', '_blank')
                  }
                >
                  Docs
                </Button>
              )}

              {isSignedIn && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="/images/default_profile.svg" />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push('/account')}
                    >
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';
