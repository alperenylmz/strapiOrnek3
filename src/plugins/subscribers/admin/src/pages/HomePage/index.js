/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import { useNotification, useFetchClient } from '@strapi/helper-plugin';// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  const { get, post } = useFetchClient();
  const sendBulkEmail = async () => {
    try {
      const response = await fetch('/api/email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Eğer bir JWT token gerekiyorsa, aşağıdaki Authorization başlığını ekleyin:
          // 'Authorization': `Bearer your-jwt-token`,
        },
        body: JSON.stringify({
          bcc: ["incecamberat@gmail.com", "berat639@hotmail.com"],
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
  
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <p>Happy coding</p>
      <button onClick={sendBulkEmail}>
        asdasd
      </button>
    </div>
  );
};

export default HomePage;
