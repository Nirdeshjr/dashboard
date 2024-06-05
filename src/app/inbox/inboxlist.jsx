import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

const Inbox = () => {
  const messages = [
    { sender: 'Musharof Chowdhury', subject: 'Some note & Lorem Ipsum available alteration in some form.', date: '17 Oct, 2024' },
    { sender: 'Naimur Rahman', subject: 'Lorem Ipsum available alteration in some form.', date: '25 Nov, 2024' },
    { sender: 'Juhan Ahamed', subject: 'Lorem Ipsum available alteration in some form.', date: '25 Nov, 2024' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Inbox</h2>
          <TextField
            variant="outlined"
            placeholder="Search for user, email address..."
            size="small"
          />
        </div>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <IconButton>
              <RefreshIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">
                
                </th>
                <th className="py-2 px-4 border-b">Sender</th>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">
                    <Checkbox />
                  </td>
                  <td className="py-2 px-4 border-b">{message.sender}</td>
                  <td className="py-2 px-4 border-b">{message.subject}</td>
                  <td className="py-2 px-4 border-b">{message.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inbox;


