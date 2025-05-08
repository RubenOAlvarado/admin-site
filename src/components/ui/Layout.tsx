import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import supabase from '../../services/supabase/supabaseClients';

export default function Layout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession();
    if (!session) navigate('/login');
    setLoading(false);
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate('/login');
    });
    return () => { authListener?.subscription.unsubscribe(); };
  }, [navigate]);

  if (loading) return <div className="h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}