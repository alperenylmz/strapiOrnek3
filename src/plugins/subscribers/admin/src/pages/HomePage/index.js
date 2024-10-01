import React, { useState, useEffect } from 'react';
import { useFetchClient } from '@strapi/helper-plugin';
import ReactQuill from 'react-quill'; // Rich Text Editor
import 'react-quill/dist/quill.snow.css'; // Quill styles
import Modal from 'react-modal'; // Modal component for displaying rich text editor
import pluginId from '../../pluginId';

const modules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, 
     { 'indent': '-1'}, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const HomePage = () => {
  const { get, post } = useFetchClient();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [emailContent, setEmailContent] = useState(''); // Email content from the editor

  const sendBulkEmail = async () => {
    console.log('Sending emails to:', selectedUsers);
    try {
      const response = await fetch('/api/email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bcc: selectedUsers,
          subject: "Custom Email", // Add custom subject if needed
          html: emailContent // Use the content from the rich text editor
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send bulk emails');
      }

      const result = await response.json();
      alert('Toplu e-postalar başarıyla gönderildi!');
      setIsModalOpen(false); // Close modal after sending email
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
      const result = await response.json();
      const { data, meta } = result;
      setSubscribers(data);
      setTotalPages(meta.pagination.pageCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubscribers(currentPage);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (email) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((userEmail) => userEmail !== email)
        : [...prevSelected, email]
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

      <button
        style={{ color: 'white', backgroundColor: '#333', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', marginTop: '20px' }}
        onClick={openModal}
      >
        Send Bulk Email
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Edit Email Modal" style={{ content: { padding: '20px', width: '500px', margin: 'auto' } }}>
        <h2 style={{marginBottom: '10px'}}>Edit Email Content</h2>
        <ReactQuill modules={modules} formats={formats} theme='snow' value={emailContent} onChange={setEmailContent} />
        <button
          style={{ marginTop: '20px', marginRight: '10px', padding: '10px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          onClick={sendBulkEmail}
        >
          Send Email
        </button>
        <button
          style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          onClick={closeModal}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default HomePage;
