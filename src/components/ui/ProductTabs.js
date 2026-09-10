'use client';


import { useState } from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/config/config";

const ProductTabs = ({ productData }) => {
    const [activeTab, setActiveTab] = useState("description");

    // console.log("imageData", imageData);
    const productDetails = productData?.productDetailsDto;
    const productSpecification = [
        ...(productData?.specifications || []),
        ...(productDetails?.features?.split(',') || [])
      ];

    const imageData = productDetails?.productImages?.slice(0, 2) || [];

    const tabs = [
        { id: "description", label: "Description" },
        { id: "info", label: "Additional Information" },
        { id: "reviews", label: "Reviews [5]" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <div className="text-gray-500 flex flex-col items-center space-y-10 text-sm leading-relaxed">
                        <div className="w-5xl flex flex-col items-center gap-2">
                            <p>
                                {productDetails?.description}
                            </p>
                        </div>
                        <div className="w-full grid sm:grid-cols-2 gap-4 pt-4">
                            {imageData?.map((img, idx) => (
                                <div key={idx} className="w-full h-64 overflow-hidden rounded-lg cursor-pointer">
                                    <Image src={`${IMAGE_BASE_URL}/${img?.imageUrl}`} alt={"image" + idx} width={2000} height={64} className="object-cover w-full h-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "info":
                return (
                    <div className="text-gray-500 text-sm leading-relaxed">
                        <ul className="list-disc pl-6 space-y-2">
                            {productSpecification?.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                );
            case "reviews":
                return (
                    <div className="text-gray-500 text-sm leading-relaxed space-y-4">
                        <p><strong>John D:</strong> Excellent build and great style. Love it!</p>
                        <p><strong>Sarah W:</strong> My husband was thrilled. Worth every penny.</p>
                        <p><strong>Ali R:</strong> Stylish and classy. Works well in any occasion.</p>
                        <p><strong>Emily K:</strong> Elegant design and smooth mechanism.</p>
                        <p><strong>George T:</strong> Top-notch quality and craftsmanship.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="font-poppins w-full max-w-7xl mx-auto py-12 px-4">
            <div className="flex justify-center gap-10 text-lg border-b border-gray-200 pb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-medium transition-all cursor-pointer duration-300 ${activeTab === tab.id ? "text-black " : "text-gray-400"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-10">
                {renderContent()}
            </div>
        </section>
    );
};

export default ProductTabs;
