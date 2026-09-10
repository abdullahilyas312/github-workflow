import Breadcrumbs from '@/components/ui/Breadcrums';
import { ROUTES_CONSTANTS } from '@/constants/routesConstants';


const Privacy = () => {

    const BreadcrumbsItem = [
        { label: 'Home', href: ROUTES_CONSTANTS.HOME },
        { label: 'Privacy', href: ROUTES_CONSTANTS.PRIVACY },
    ]

    return (
        <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-16 font-poppins">
            <div className="w-full py-5 px-10 flex flex-col items-center">
                <h1 className="text-5xl text-center font-medium">Privacy Policy</h1>
                <Breadcrumbs BreadcrumbsItem={BreadcrumbsItem} />
            </div>

            <div className="w-full max-w-4xl mx-auto">
                <div className="text-[#9F9F9F] text-center text-sm mb-8">
                    We value your trust and are committed to safeguarding your personal information.
                </div>
                
                <div className="space-y-8 text-left">
                    <div>
                        <h2 className="text-2xl font-semibold text-black mb-4">1. Information We Collect</h2>
                        <ul className="text-[#9F9F9F] text-sm space-y-2 ml-4">
                            <li>• Name, phone number, email, and delivery address</li>
                            <li>• Payment details (for advance payments only, processed securely)</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-black mb-4">2. How We Use Your Information</h2>
                        <ul className="text-[#9F9F9F] text-sm space-y-2 ml-4">
                            <li>• To process and deliver orders</li>
                            <li>• To confirm payments and maintain transaction records</li>
                            <li>• To communicate order updates, promotions, or service notices</li>
                            <li>• To improve products and customer experience</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-black mb-4">3. Sharing of Information</h2>
                        <ul className="text-[#9F9F9F] text-sm space-y-2 ml-4">
                            <li>• We do not sell, rent, or trade customer data.</li>
                            <li>• Data may only be shared with trusted partners (e.g., courier companies like TCS/PostEx or payment providers).</li>
                            <li>• Legal authorities may request data in case of fraud, disputes, or investigations.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-black mb-4">4. Data Security</h2>
                        <ul className="text-[#9F9F9F] text-sm space-y-2 ml-4">
                            <li>• Secure systems protect your personal and payment details.</li>
                            <li>• Customers must never share OTPs, banking passwords, or sensitive details with anyone claiming to represent us.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-black mb-4">5. Customer Rights</h2>
                        <ul className="text-[#9F9F9F] text-sm space-y-2 ml-4">
                            <li>• You may request correction or deletion of your personal data.</li>
                            <li>• You may opt out of promotional messages anytime by contacting us.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-black mb-4">6. Policy Updates</h2>
                        <ul className="text-[#9F9F9F] text-sm space-y-2 ml-4">
                            <li>• Amir Watch Company reserves the right to update this Privacy Policy as needed.</li>
                            <li>• The latest version will always be available on official platforms.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Privacy;
