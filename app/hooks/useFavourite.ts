import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
type SafeUser = { id: string; name?: string | null; email?: string | null; image?: string | null; favouriteIds?: string[]; };
import useLoginModal from './useLoginModal';



interface IUseFavourite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavourite = ({ 
    listingId, 
    currentUser 
}: IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavourited = useMemo(() => {
       const list = currentUser?.favouriteIds || [];

       return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavourited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Added to favourites');
        } catch (error) {
            toast.error('Something went wrong.');
        }
    }, 
    [
        currentUser,
        hasFavourited,
        listingId,
        loginModal,
        router
    ]);

    return {
        hasFavourited,
        toggleFavourite,
    };
}

export default useFavourite; 