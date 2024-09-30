/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  const { get, post } = useFetchClient();
  const [selectedUsers, setSelectedUsers] = useState([]); // Array to store selected user emails
  const [subscribers, setSubscribers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Entries per page

  const sendBulkEmail = async () => {
    console.log('Sending emails to:', selectedUsers); // Log when sending bulk email
    try {
      const response = await fetch('/api/email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Eğer bir JWT token gerekiyorsa, aşağıdaki Authorization başlığını ekleyin:
          // 'Authorization': `Bearer your-jwt-token`,
        },
        body: JSON.stringify({
          bcc: selectedUsers, //["incecamberat@gmail.com", "berat639@hotmail.com"]
          subject: "Test Email",
          text: "This is a test email."
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send bulk emails');
      }
  
      const result = await response.json();
      alert('Toplu e-postalar başarıyla gönderildi!');
    } catch (error) {
      console.error('Failed to send bulk emails:', error);
      alert('Toplu e-posta gönderme işlemi başarısız oldu.');
    }
  };

  const fetchSubscribers = async (page = 1) => {
    try {
      const response = await fetch(`/api/subscribers?pagination[page]=${page}&pagination[pageSize]=${pageSize}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json(); // Parse the JSON data
      const { data, meta } = result; // Extract data and meta from the result
      setSubscribers(data);
      setTotalPages(meta.pagination.pageCount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSubscribers(currentPage);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (email) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((userEmail) => userEmail !== email) // Remove if already selected
        : [...prevSelected, email] // Add if not selected
    );
  };
  
  useEffect(() => {
    console.log('Selected Users:', selectedUsers);
  }, [selectedUsers]);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '2em', color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        {pluginId}
      </h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', backgroundColor: '#fff' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: '#f9f9f9', color: '#333' }}>
              <input
                type="checkbox"
                onChange={(e) => {
                  const allEmails = subscribers.map((subscriber) => subscriber.attributes.email);
                  setSelectedUsers(e.target.checked ? allEmails : []);
                }}
                checked={selectedUsers.length === subscribers.length}
              />
            </th>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: '#f9f9f9', color: '#333' }}>ID</th>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: '#f9f9f9', color: '#333' }}>Email</th>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: '#f9f9f9', color: '#333' }}>Created At</th>
            <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: '#f9f9f9', color: '#333' }}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px', color: '#333' }}>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(subscriber.attributes.email)}
                  onChange={() => handleCheckboxChange(subscriber.attributes.email)}
                />
              </td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px', color: '#333' }}>{subscriber.id}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px', color: '#333' }}>{subscriber.attributes.email}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px', color: '#333' }}>{new Date(subscriber.attributes.createdAt).toLocaleString()}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px', color: '#333' }}>{new Date(subscriber.attributes.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: '1em', color: '#333' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
        >
          Next
        </button>
      </div>
      <button style={{ color: 'white', backgroundColor: '#333', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', marginTop: '20px' }} onClick={sendBulkEmail}>
        Send Bulk Email
      </button>
    </div>
  );
};

export default HomePage;
