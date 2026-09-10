"use client";
import { useState } from 'react';

const FAQItem = ({ faq, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                // className="w-full text-left flex justify-between items-center py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-lg px-2 transition-all duration-200 hover:bg-gray-50"
                className="w-full text-left flex justify-between items-center py-2 focus:outline-none rounded-lg px-2 transition-all duration-200 hover:bg-gray-50"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
            >
                <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                </h3>
                <div className="flex-shrink-0">
                    <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>
            <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-2 pt-2 pb-4">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Faq = ({ faqs = [] }) => {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (id) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {faqs.map((faq) => (
                    <FAQItem
                        key={faq.id}
                        faq={faq}
                        isOpen={openItems.has(faq.id)}
                        onToggle={() => toggleItem(faq.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Faq;
