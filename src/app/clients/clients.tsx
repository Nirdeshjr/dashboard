"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import AddClients from './addClients';
import { Client } from '@/types/client';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Make sure to set the app element for accessibility

const Clients = () => {
    const [isAddingClient, setIsAddingClient] = useState(false);
    const [currentClient, setCurrentClient] = useState<Client | undefined>();
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

    // Fetch clients data from the API
    const fetchClients = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/client/");
            setClients(response.data);
            setFilteredClients(response.data);
        } catch (error) {
            toast.error('Failed to fetch clients.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        fetchClients();
    }, [isAddingClient]);

    // Handle dropdown toggle
    const toggleDropdown = (index: number) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    // Add client function
    const handleAddClient = () => {
        setIsAddingClient(true);
        setCurrentClient(undefined);
        setDropdownOpenIndex(null);
    };

    // Edit client function
    const handleEditClient = (client: Client) => {
        setIsAddingClient(true);
        setCurrentClient(client);
        setDropdownOpenIndex(null);
    };

    // Open confirmation modal
    const handleDeleteClient = (client: Client) => {
        setClientToDelete(client);
        setConfirmModalOpen(true);
        setDropdownOpenIndex(null);
    };

    // Delete client function
    const deleteClient = async () => {
        if (!clientToDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/client/${clientToDelete.id}/`);
            toast.success('Deleted Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            fetchClients();
        } catch (error) {
            toast.error('Failed to delete client.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setConfirmModalOpen(false);
            setClientToDelete(null);
        }
    };

    // Search client function
    useEffect(() => {
        const filtered = searchQuery
            ? clients.filter(client =>
                client.client_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : clients;
        setFilteredClients(filtered);
    }, [searchQuery, clients]);

    return (
        <>
            <ToastContainer />
            {isAddingClient ? (
                <AddClients handleChangeToogle={() => setIsAddingClient(false)} rows={currentClient} />
            ) : (
                <>
                    <h2 className='font-bold mb-4'>Clients</h2>
                    <div className="flex justify-between">
                        <input
                            type="text"
                            placeholder='search client'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='mb-2 px-2 py-2 border-rounded'
                        />
                        <Button variant="outlined" className='mb-2' endIcon={<ControlPointIcon />} onClick={handleAddClient}>
                            Add Clients
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {filteredClients.map((client, index) => (
                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative" key={index}>
                                <div className="flex justify-end px-4 pt-4">
                                    <button
                                        id="dropdownButton"
                                        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm p-1.5"
                                        type="button"
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        <span className="sr-only">Open dropdown</span>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                    </button>
                                    <div
                                        id="dropdown"
                                        className={`z-10 ${dropdownOpenIndex === index ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-4 top-12`}
                                    >
                                        <ul className="py-2" aria-labelledby="dropdownButton">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleEditClient(client)}>Edit</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={() => handleDeleteClient(client)}>Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center pb-10">
                                    <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src={client.client_image || "/Images/course.png"} alt="Client image" width={90} height={70} />
                                    <h5 className="mb-1 text-xl font-medium text-gray-900">{client.client_name}</h5>
                                    <span className="text-sm text-gray-500">{client.review}</span>
                                    <div className="flex mt-4 md:mt-6">
                                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">{client.number}</a>
                                        <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Confirmation Modal */}
            <Modal
                isOpen={confirmModalOpen}
                onRequestClose={() => setConfirmModalOpen(false)}
                contentLabel="Confirmation Modal"
                className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
            >
                <div className="bg-white p-4 rounded">
                    <h2 className="text-xl">Confirm Deletion</h2>
                    <p>Are you sure you want to delete this client?</p>
                    <div className="mt-4 flex justify-end">
                        <button onClick={() => setConfirmModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                        <button onClick={deleteClient} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Clients;


