'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/firebase/auth';
import { doc, getDoc } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  UsersRound, 
  Megaphone, 
  Upload, 
  DollarSign,
  LogOut,
  Menu,
  X,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '@/types';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  // Don't check admin access for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    const checkAdminAccess = async () => {
      if (loading) return;
      
      if (!user) {
        router.push('/admin/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          if (userData.role === 'admin') {
            setIsAdmin(true);
          } else {
            toast.error('Access denied. Admin privileges required.');
            router.push('/dashboard');
            return;
          }
        } else {
          toast.error('User profile not found');
          router.push('/auth/complete-profile');
          return;
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
        toast.error('Error verifying admin access');
        router.push('/dashboard');
        return;
      } finally {
        setChecking(false);
      }
    };

    checkAdminAccess();
  }, [user, loading, router, isLoginPage]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Show login page without admin checks
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/participants', label: 'Participants', icon: Users },
    { href: '/admin/teams', label: 'Teams', icon: UsersRound },
    { href: '/admin/join-requests', label: 'Join Requests', icon: Users },
    { href: '/admin/problem-statements', label: 'Problem Statements', icon: FileText },
    { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    { href: '/admin/submissions', label: 'Submissions', icon: Upload },
    { href: '/admin/payments', label: 'Payments', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="flex">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-24 left-4 z-50 p-2 rounded-lg bg-white border shadow-sm"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r bg-white p-6 transition-transform duration-300 z-40 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <div className="mb-4">
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30 top-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-64 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
