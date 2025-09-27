"use client";

import { getFaqs } from "@/lib/api/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FaqPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFaqs = async () => {
            setLoading(true);
            try {
                const data = await getFaqs();
                setFaqs(data?.data?.FAQs || []);
                toast.success("FAQs loaded successfully ✅");
            } catch (err) {
                console.error(err);
                toast.error(err?.message || "Failed to load FAQs ❌");
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-[80px] px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading FAQs...</p>
            ) : faqs.length > 0 ? (
                <ul className="space-y-6 pt-[40px]">
                    {faqs.map((faq) => (
                        <li key={faq.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
                            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
                            <p className="text-gray-700">{faq.answer}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No FAQs found.</p>
            )}
        </div>
    );
}
