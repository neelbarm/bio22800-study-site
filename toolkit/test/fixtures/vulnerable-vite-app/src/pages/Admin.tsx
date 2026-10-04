import { useAuth } from '@/hooks/useAuth';
import { AdminDashboard } from '@/components/AdminDashboard';

export default function Admin() {
  const { user } = useAuth();
  const isAdmin = user?.email === 'founder@example.com';
  if (!isAdmin) return <p>Not allowed</p>;
  return <AdminDashboard />;
}
