import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import UsersTable from '../components/UsersTable';
import { useAuthStore } from '../store';

export const UsersPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    console.log('Ir a perfil');
  };

  const handleSettingsClick = () => {
    console.log('Ir a configuración');
  };

  return (
    <DashboardLayout
      onLogout={handleLogout}
      onProfileClick={handleProfileClick}
      onSettingsClick={handleSettingsClick}
    >
      <UsersTable />
    </DashboardLayout>
  );
};


