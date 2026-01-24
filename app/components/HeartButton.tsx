'use client';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";
type SafeUser = { id: string; name?: string | null; email?: string | null; image?: string | null; favouriteIds?: string[]; };


interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
   const { hasFavourited, toggleFavourite } = useFavourite({
    listingId,
    currentUser
   });

  return (
    <div
      onClick={toggleFavourite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
        <AiOutlineHeart
          size={28}
          className="
          fill-white
          absolute
          -top-0.5
          -right-0.5
          "
        />
        <AiFillHeart
          size={24}
          className={
            hasFavourited ? "fill-rose-500" : "fill-neutral-500/70"
          }
        />
    </div>
  );
};

export default HeartButton;