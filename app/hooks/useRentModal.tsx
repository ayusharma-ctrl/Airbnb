import { create } from 'zustand';

interface RentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// hook to get the state of "Add A New Property" modal -  open or close
const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default useRentModal;