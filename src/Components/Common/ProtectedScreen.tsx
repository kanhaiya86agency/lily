import ChatsUsersList from '../Chats/ChatsUserList';
import ProtectedRoute from '../Hooks/ProtectedScreen';
import ServiceForm from '../ServiceProviderForm/FullServiceForm';
import ServiceProviderStepperForm from '../PostAds/PostAds';
import Profile from '../Profile/Profile';
import ServiceFormStepper from '../ServiceProviderForm/ServiceFormStepper';
// import ServiceProviderScreen from '../ServiceProviderForm/ServiceProviderScreen';

export const ProtectedChats = () => (
  <ProtectedRoute>
    <ChatsUsersList />
  </ProtectedRoute>
);

export const ProtectedPostAds = () => (
  <ProtectedRoute>
    <ServiceForm />
  </ProtectedRoute>
);

export const ProtectedProfile = () => (
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
);
