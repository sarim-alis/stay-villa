'use client';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
type SafeUser = { id: string; name?: string | null; email?: string | null; image?: string | null; };


interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const hasFavorited = false;
    const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
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
            hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
          }
        />
    </div>
  );
};

export default HeartButton;