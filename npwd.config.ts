import App from './src/App';
import { GarageIcon, NotificationIcon } from './icon';
import { theme } from './src/app.theme';

export const externalAppConfig = () => ({
  id: 'garage',
  nameLocale: 'Garage',
  color: '#fff',
  backgroundColor: '#333',
  path: '/garage',
  icon: GarageIcon,
  app: App,
  notificationIcon: NotificationIcon,
  theme: theme,
});

export default externalAppConfig;
