"use client"

import React, { useState } from 'react';

//icons
import Image from 'next/image';


//client data tyoe
import { Client } from '@/types/client';


const Clients = () => {


    const [clientsDetail, setClientsDetail] = useState<Client[]>(
        [
            {
                name: "Bonnie Green",
                review: "Good to work with",
                contact: 981818818,
                gmail: "abc@gmail.com",
                message: "Hello is there any project left you want to give us.",
                clients_profile: null,
            },
            {
                name: "John Doe",
                review: "Excellent service",
                contact: 987654321,
                gmail: "john.doe@example.com",
                message: "Looking forward to more collaborations.",
                clients_profile: null,
            },
            {
                name: "Jane Smith",
                review: "Very professional",
                contact: 912345678,
                gmail: "jane.smith@example.com",
                message: "Can we discuss the next project?",
                clients_profile: null,
            },
            {
                name: "Alice Johnson",
                review: "Highly recommended",
                contact: 998877665,
                gmail: "alice.johnson@example.com",
                message: "Thank you for the opportunity.",
                clients_profile: null,
            },
            {
                name: "Bob Brown",
                review: "Great experience",
                contact: 887766554,
                gmail: "bob.brown@example.com",
                message: "Let's schedule a meeting for the next steps.",
                clients_profile: null,
            }
        ]
    );


    //toogle edit and delete
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);

    const toggleDropdown = (id:number) => {
        setDropdownOpenIndex(dropdownOpenIndex === id ? null : id);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {clientsDetail.map((client,index) => (
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative" key={index}>
                        <div className="flex justify-end px-4 pt-4">
                            <button
                                id="dropdownButton"
                                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm p-1.5"
                                type="button"
                                onClick={()=>toggleDropdown(index)}
                            >
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdown"
                                className={`z-10 ${dropdownOpenIndex === index? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-4 top-12`}
                            >
                                <ul className="py-2" aria-labelledby="dropdownButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/Images/react.png" alt="Bonnie image" width={90} height={70} />
                            <h5 className="mb-1 text-xl font-medium text-gray-900">{client.name}</h5>
                            <span className="text-sm text-gray-500 ">{client.review}</span>
                            <div className="flex mt-4 md:mt-6">
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">{client.contact}</a>
                                <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Clients;
