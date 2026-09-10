import React from "react";
import Image from "next/image";

import { features } from "@/data/objects/Features";

const FeatureHighlights = () => {
  return (
    <section className="bg-color-banners w-full py-10 px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto justify-items-center gap-8 text-center font-poppins">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center md:space-x-2">
          <Image src={feature.icon} alt={feature.title} width={50} height={50} />
          <div className="flex flex-col items-start space-y-1">
            <h4 className="text-[15px] font-semibold color-Black">{feature.title}</h4>
            <p className="text-[#898989] text-xl">{feature.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureHighlights;
