
import './App.css'
import { useState } from 'react';
import { AppRoutes } from './routers/AppRoutes';

const App = () => {
  const [isAuthenticated] = useState(false);
  const [isLoading] = useState(false);
  const [userRole] = useState<'admin' | 'editor' | 'viewer'>('admin');

  const handleNavigate = (path: string) => {
    console.log('Navegando a:', path);
  };

  return (
    <AppRoutes
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      userRole={userRole}
      onNavigate={handleNavigate}
    />
  );
};

export default App;
