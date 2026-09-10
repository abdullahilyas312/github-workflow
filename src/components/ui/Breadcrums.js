import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";


const Breadcrums = ({ BreadcrumbsItem = [] }) => {
    return (
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 py-3">
            {BreadcrumbsItem.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index < BreadcrumbsItem.length - 1 ? (
                        <Link
                            key={`link-${index}`}
                            href={item.href}
                            className="text-[var(--color-buttons)] hover:text-[var(--bg-color-buttons)] transition-all duration-300"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span key={`span-${index}`} className="text-gray-500">{item.label}</span>
                    )}

                    {index < BreadcrumbsItem.length - 1 && (
                        <MdKeyboardArrowRight className="w-6 h-6" />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Breadcrums;