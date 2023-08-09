import { create } from 'zustand';

interface SearchModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// hook to get the state of "Search" modal -  open or close
const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default useSearchModal;