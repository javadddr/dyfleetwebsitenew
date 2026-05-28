import React, { useState } from 'react';
import { Button, Textarea } from "@nextui-org/react";
import Schedul from './Schedul';
function Email() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage('Failed to send email.');
    }
  };

  return (
    <div>
    <div>
      <Schedul/>
    </div>
    <div className="flex justify-center items-center h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Send Email</h2>
        
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Recipient's Email</label>
            <input
              type="email"
              placeholder="Enter recipient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-600 mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-600 mb-1">Message</label>
            <Textarea
              placeholder="Write your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full border-gray-300 rounded-md focus:outline-none"
              minRows={5}
            />
          </div>
          
          <div className="text-right">
            <Button type="submit" color="warning" variant='flat' className="w-full md:w-auto">
              Send Email
            </Button>
          </div>
        </form>
        
        {responseMessage && (
          <p className="text-center text-green-600 font-medium mt-4">{responseMessage}</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default Email;
