import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa'
import { useCategory } from '@/context/CategoryContext';
import { useEffect } from 'react';
import { ROUTES_CONSTANTS } from '@/constants/routesConstants';
import { useRouter } from 'next/navigation';


export default function Footer() {
  const { categories } = useCategory();
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`${ROUTES_CONSTANTS.CATEGORIES}/${category.id}`);
  };
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        // { label: 'Employee database', href: '/employee-database' },
        // { label: 'Payroll', href: '/payroll' },
        // { label: 'Absences', href: '/absences' },
        // { label: 'Time tracking', href: '/time-tracking' },
        // { label: 'Shift planner', href: '/shift-planner' },
        // { label: 'Recruiting', href: '/recruiting' },      
        
        // { label: 'Home', href: '/' },
        // { label: 'Straps', href: '/straps' },
        // { label: 'Accessories', href: '/accessories' },
        // { label: 'Collection', href: '/collection' },

        
        ...(categories?.length > 0 ? 
          categories?.map(category => ({
            label: category.categoryName || category.title || category.label,
            href: `${ROUTES_CONSTANTS.CATEGORIES}/${category.id}`,
            isCategory: true,
            onClick: () => handleCategoryClick(category),
          })) : [
          { label: 'loading...', href: '#', isLoading: true, skeleton: true }
        ])
          
      ],
    },
    {
      title: 'Information',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Blog', href: '/blog' },
        { label: 'Support', href: '/support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About us', href: '/about' },
        // { label: 'Careers', href: '/careers' },
        { label: 'Contact us', href: '/contact' },
      ],
    },
  ]
  return (
    <footer className="bg-white font-poppins text-sm flex flex-col items-center justify-center text-[#848997] border-t border-gray-100">
      <div className="w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="font-bold text-[#0A142F] mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, index) => (
                <li key={link.href || index}>
                  {link.skeleton ? (
                    <span className="text-gray-400 animate-pulse">
                      {link.label}
                    </span>
                  ) : (
                    <Link href={link.href} className="hover:text-gray-900">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-[#FCF8F3] w-80 h-40 flex flex-col box-border  items-left justify-center p-8">
          <h3 className="font-bold text-gray-900 mb-3">Subscribe</h3>
          <div className="flex rounded-sm box-border shadow-sm">
            <input
              type="email"
              placeholder="Email address"
              className="bg-white box-border  flex-1 px-4 py-2 text-sm placeholder-[#848997] outline-none border border-[#E7E8F2] rounded-l"
            />
            <button className="bg-[#00B0AD] hover:bg-teal-600 px-4 text-white">
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-7xl border-t border-gray-100 py-4 px-6 grid grid-cols-4 items-center justify-center gap-4">
        <ul className="flex gap-6 text-xs col-span-2 justify-end">
          <li><Link href="/terms">Terms</Link></li>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/cookies">Cookies</Link></li>
        </ul>
        <div className="flex gap-3 col-span-2 justify-end">
          <a href="https://www.youtube.com/@AMIRWATCHCOMPANY" className="p-2 border rounded-full"><FaYoutube /></a>
          <a href="https://www.facebook.com/share/1CQ425qatb" className="p-2 border rounded-full"><FaFacebookF /></a>
          <a href="https://www.instagram.com/amirwatchcompany?igsh=MXJsMW1pbjBna3EzNg==" className="p-2 border rounded-full"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@amirwatch_2?_t=ZM-8zwAvLWcMY7&_r=1" className="p-2 border rounded-full"><FaTiktok /></a>
        </div>
      </div>
    </footer>
  )
}
