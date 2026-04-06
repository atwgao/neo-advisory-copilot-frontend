import { UserRound } from 'lucide-react';
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
        ? 'bg-brand-navy text-white font-medium'
        : 'text-text-muted hover:text-brand-navy-light hover:bg-blue-50'
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
    { path: '/customer-insights', label: 'Customer Insights', show: true },
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
      <nav ref={ref} className="shadow z-50 w-full">
        {/* Logo row: navy with reduced opacity */}
        <div className="bg-brand-navy/85 w-full px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="flex justify-center items-center h-14 pt-3">
            <Link
              href={isSuperUser() ? '/' : '/documents'}
              className="flex items-center relative z-10"
            >
              <Logo className="h-16 w-auto translate-y-1" disableLink={true} />
            </Link>
          </div>
        </div>
        {/* Menu row: white background */}
        <div className="bg-white border-b border-border w-full px-4 sm:px-6 lg:px-8">
          {isSignedIn && (
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-light tracking-widest uppercase text-text-muted mr-1">
                  {brandingConfig.navbar.appName}
                </span>
                <span className="text-border">|</span>
                <NavItems
                  isAuthenticated={isAuthenticated}
                  role={role}
                  pathname={pathname}
                />
              </div>
              <div className="flex items-center space-x-4">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                      <UserRound className="h-5 w-5 text-text-muted" />
                    </button>
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
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';
