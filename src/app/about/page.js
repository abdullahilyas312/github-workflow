"use client";
import { ROUTES_CONSTANTS } from '@/constants/routesConstants'
import Link from "next/link";
import Image from "next/image";
import { BiSolidTrashAlt } from "react-icons/bi";
import Breadcrumbs from '@/components/ui/Breadcrums';
import * as ProductImages from '@/assets/ProductImages';


export default function AboutPage() {
    const BreadcrumbsItem = [
        { label: 'Home', href: ROUTES_CONSTANTS.HOME },
        { label: 'About us', href: ROUTES_CONSTANTS.ABOUT },
    ]
    return (
        <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-16 font-poppins">
            <div className="w-full py-5 px-10 flex flex-col items-center">
                <h1 className="text-5xl text-center font-medium">About Us</h1>
                <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
            </div>

            <div className="flex flex-col justify-center items-center gap-6">
                <h2 className="text-4xl font-semibold">Experience the Art of Fine Timekeeping with Unmatched Style</h2>
                <p className="text-[#9F9F9F] text-center text-sm max-w-md">
                    Explore premium watches that elevate your style and confidence. Visit us today to find your perfect
                    timepiece!
                </p>
            </div>

            <div className="w-full flex flex-col items-center gap-8">
                <div className="w-full max-w-4xl text-center">
                    <p className="text-[#9F9F9F] text-sm leading-relaxed">
                        Since day one, our mission has been clear: to offer the finest selection of watches while delivering an
                        unparalleled shopping experience. As a family-owned business, we&apos;ve spent decades perfecting the art of
                        timekeeping, curating collections that inspire confidence and elevate your style.
                    </p>
                </div>

                <div className="w-full max-w-6xl">
                    {/* <div className="bg-gray-300 h-80 rounded-lg"></div> */}
                    <Image src={ProductImages.Folder6.ProImg1} alt="about" width={500} height={500} className="w-full h-100 object-cover rounded-lg" />
                    {/* <Image src={ProductImages.Folder6.ProImg1} alt="about" width={1000} height={500} /> */}
                </div>

                <div className="w-full max-w-4xl text-center">
                    <h2 className="text-2xl font-semibold mb-6">Your Trusted Partner in Time</h2>
                    
                    <p className="text-[#9F9F9F] text-sm mb-8 leading-relaxed">
                        <strong className="text-black">Amir Watch Company</strong> – The Benchmark for Timekeeping
                        <br />
                        Located in the heart of Shah Alam Market, Amir Watch Company is more than just a shop – it&apos;s a legacy built
                        on passion and integrity. Whether you visit us in-store or connect with us online, expect the finest
                        experience.
                    </p>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-6">For over 2 decades, we&apos;ve stood for:</h3>

                        <div className="text-left max-w-2xl mx-auto space-y-4">
                            <div>
                                <span className="font-semibold text-black">• Authenticity You Can Trust</span>
                                <span className="text-[#9F9F9F]"> – Genuine products, no compromises.</span>
                            </div>
                            <div>
                                <span className="font-semibold text-black">• Unmatched Expertise</span>
                                <span className="text-[#9F9F9F]"> – Our seasoned professionals guide you to the perfect choice.</span>
                            </div>
                            <div>
                                <span className="font-semibold text-black">• Timeless Craftsmanship</span>
                                <span className="text-[#9F9F9F]"> – Every watch we sell is a masterpiece in itself.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
