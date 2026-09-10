"use client";

import Breadcrumbs from '@/components/ui/Breadcrums';
import { ROUTES_CONSTANTS } from '@/constants/routesConstants';


const Terms = () => {

    const BreadcrumbsItem = [
        { label: 'Home', href: ROUTES_CONSTANTS.HOME },
        { label: 'Terms and Conditions', href: ROUTES_CONSTANTS.TERMS },
    ]

    return (
        <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-16 font-poppins">
            <div className="w-full py-5 px-10 flex flex-col items-center">
                <h1 className="text-5xl text-center font-medium">Terms and Conditions</h1>
                <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
            </div>
            
            <div className="w-full max-w-4xl px-6">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">1. Delivery</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Orders are delivered within 3–5 working days after dispatch via TCS or PostEx (depending on location).</li>
                            <li>• Delivery times may vary due to holidays, weather, or courier delays.</li>
                            <li>• Amir Watch Company is not responsible for courier delays or circumstances beyond our control.</li>
                            <li>• A tracking number will be emailed after dispatch. Please allow up to 48 hours for tracking updates.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">2. Product Information</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Product images are for illustration purposes; slight variations in color or design may occur.</li>
                            <li>• Minor variations are not considered defects.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">3. Liability</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>• We are not liable for indirect, incidental, or consequential damages caused by product misuse.</li>
                            <li>• Liability is strictly limited to the product&apos;s purchase value.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">4. Policy Updates</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Amir Watch Company reserves the right to amend policies anytime without prior notice.</li>
                            <li>• Customers are encouraged to review this page regularly.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Terms;