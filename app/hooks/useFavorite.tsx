import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/app/types";
import useLoginModal from "./useLoginModel";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null
}

// this will toggle between modals based on authentication, and call api based on property is already marked as favorite
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();

    const loginModal = useLoginModal();

    // get a list of favorite properties and check already favorite or not
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favorite || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    // handle add to favorite or remove from favorite
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            // call api to remove from favorites
            if (hasFavorited) {
                request = () => axios.delete(`/api/listings/${listingId}`);
            } else {
                // call this to add to favorites
                request = () => axios.post(`/api/listings/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return { hasFavorited, toggleFavorite }
}

export default useFavorite;