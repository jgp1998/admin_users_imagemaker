import { DashboardLayout } from '../layouts/DashboardLayout';
import UsersTable from '../components/UsersTable';

export const UsersPage = () => {
  const handleLogout = () => {
    console.log('Logout desde Users');
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


