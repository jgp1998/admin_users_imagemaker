import { DashboardLayout } from '../layouts/DashboardLayout';
import UsersTable from '../components/UsersTable';
import { useDashboardHandlers } from '../hooks/useDashboardHandlers';

export const UsersPage = () => {
  const { handleLogout, handleProfileClick, handleSettingsClick } = useDashboardHandlers();

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


