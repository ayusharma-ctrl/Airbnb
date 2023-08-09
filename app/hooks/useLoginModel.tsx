import { create } from 'zustand';

interface LoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// get the state of login modal -  open or not
const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default useLoginModal;