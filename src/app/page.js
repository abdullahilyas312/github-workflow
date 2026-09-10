"use client";

import HeroCarousel from '@/components/ui/HeroCarousel';
import FeatureHighlights from '@/components/ui/Features';
import CategorySection from '@/components/ui/CategorySection';
import OurProductSection from '@/components/ui/OurProductSection';
import WatchSliderSection from '@/components/ui/BestCollection';
import WatchGallery from '@/components/ui/WatchGallery';
import { useUser } from '@/context/UserContext';
// import ProductData from '@/data/objects/OurProducts';
import { useState, useEffect } from 'react';



const Home = () => {
    const { setIsLoading } = useUser();
    const [gender, setGender] = useState('men');

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);
    return (
        <div className="w-full h-full overflow-hidden relative">
            
            <HeroCarousel />
            <FeatureHighlights />
            <CategorySection setGender={setGender} />
            {/* <OurProductSection show={true} productData={ProductData} gender={gender} /> */}
            <OurProductSection show={true} gender={gender} />
            <WatchSliderSection/>
            <WatchGallery />
 
        </div>
    );
}

export default Home;