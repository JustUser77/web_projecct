import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import LoginModal from '../components/LoginModal';
import { AnimatePresence } from 'framer-motion';

export default function useRequireLogin() {
  const { isLoggedIn } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const requireLogin = (action) => {
    if (isLoggedIn) {
      action();
    } else {
      setPendingAction(() => action);
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setTimeout(() => setShowModal(false), 300);
  };

  const handleSuccess = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    handleClose();
  };

  const LoginPrompt = (
    <AnimatePresence>
      {showModal && (
        <LoginModal
          onClose={handleClose}
          onSuccess={handleSuccess} // ✅ Tambahkan ini
        />
      )}
    </AnimatePresence>
  );

  return { requireLogin, LoginPrompt };
}