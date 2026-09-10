"use client";

import Breadcrums from "@/components/ui/Breadcrums";
import { ROUTES_CONSTANTS } from "@/constants";
import { useForm } from "react-hook-form";
import { FiPhone, FiClock, FiMapPin } from "react-icons/fi";


export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted", data);
        alert("Message sent successfully!");
    };

    const BreadcrumbsItem = [
        { label: "Home", href: ROUTES_CONSTANTS.HOME },
        { label: "Contact", href: ROUTES_CONSTANTS.CONTACT },
    ];

    return (
        <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-16 font-poppins">
            <div className="w-full py-5 px-10 flex flex-col items-center">
                <h1 className="text-5xl text-center font-medium">Contact Us</h1>
                <Breadcrums BreadcrumbsItem={BreadcrumbsItem} />
            </div>

            <div className="flex flex-col justify-center items-center gap-6">
                <h2 className="text-4xl font-semibold">Get In Touch With Us</h2>
                <p className="text-[#9F9F9F] text-center text-sm max-w-md">
                    For More Information About Our Product & Services. Please Feel Free To Drop Us
                    An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                </p>
            </div>

            <div className="w-full flex justify-center items-start gap-6">
                <div className="w-1/4 flex space-y-8">
                    <div className="flex flex-col w-full space-y-6 text-sm">
                        <div className="flex items-start gap-4">
                            <FiMapPin className="mt-1 text-xl" />
                            <div>
                                <p className="font-semibold">Address</p>
                                <p>236 5th SE Avenue, Innovista Ravi, Lahore</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FiPhone className="mt-1 text-xl" />
                            <div>
                                <p className="font-semibold">Phone</p>
                                <p>Mobile: +(92) 300-5690</p>
                                <p>Hotline: +(92) 334-5347</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FiClock className="mt-1 text-xl" />
                            <div>
                                <p className="font-semibold">Working Time</p>
                                <p>Monday–Friday: 9:00 - 22:00</p>
                                <p>Saturday–Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 flex flex-col space-y-6">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="name" className="text-sm font-medium mb-1">Your name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            id="name"
                            placeholder="John Doe"
                            className="border border-[var(--border-color)]  p-4 rounded-[10px]"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="email" className="text-sm font-medium mb-1">Email address</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            placeholder="example@email.com"
                            id="email"
                            className="border border-[var(--border-color)] p-4 rounded-[10px]"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="subject" className="text-sm font-medium mb-1">Subject</label>
                        <input
                            {...register("subject")}
                            id="subject"
                            className="border border-[var(--border-color)] p-4 rounded-[10px]"
                            placeholder="This is an optional"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="message" className="text-sm font-medium mb-1">Message</label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            id="message"
                            rows={5}
                            className="border border-[var(--border-color)] p-4 rounded-[10px]"
                            placeholder="Hi! I'd like to ask about..."
                        />
                        {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-1/2 border-[var(--color-buttons)] text-sm font-medium cursor-pointer p-4 rounded-[10px] bg-[var(--bg-color-buttons)] text-[var(--color-White)] transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}
