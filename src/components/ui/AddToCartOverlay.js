import { IoShareSocialSharp } from "react-icons/io5";
import { GoArrowSwitch } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";

const AddToCartOverlay = ({ onAddToCart }) => {



    const buttons = [
        { icon: <IoShareSocialSharp size={24} />, label: "Share" },
        // { icon: <GoArrowSwitch size={24} />, label: "Compare" },
        { icon: <FaRegHeart size={24} />, label: "Like" },
    ];

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-[#3A3A3A99] flex flex-col items-center justify-center z-30 font-poppins">
            <AddToCartButton
                onAddToCart={onAddToCart}
                bgColor="bg-[var(--bg-color-White)]"
                textcolor="text-[var(--color-primary)]"
            />


            <div className="flex items-center justify-center space-x-4 mt-4">
                {buttons.map((button, index) => (
                    <button key={index} className="color-gray-200 cursor-pointer flex gap-1 text-sm hover:text-white transition duration-300">
                        {button.icon} <p>{button.label}</p>
                    </button>
                ))}
            </div> 
        </div>
    );
}

export default AddToCartOverlay;