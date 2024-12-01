import React, { useState, useEffect, Fragment } from "react";
import Modal from "react-modal"; // Modal component for displaying rich text editor
import pluginId from "../../pluginId";
import * as DOMPurify from "dompurify";
import CustomCKEditor from "../../components/CustomCkEditor";

const HomePage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailContent, setEmailContent] = useState("");

  const fetchImageUrl = async (imageId) => {
    const response = await fetch(`http://localhost:1337/api/upload/files/${imageId}`);
    const image = await response.json();
    return image.url;
  };
  
  

  const renderEmailTemplate = (content, recipientName) => {
    const headerImageUrl = fetchImageUrl("129"); // Görsel dosya adını buraya yazın
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background-color: #000138;
            padding: 10px 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .email-header img {
            max-width: 100%; /* Görselin konteyner boyutunu aşmasını engeller */
            height: auto;
          }
          .email-body {
            padding: 20px;
            font-size: 16px;
            color: #333333;
          }
          .email-footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <img src="${headerImageUrl}" alt="Header Image" />
          </div>
          <div class="email-body">
            <p>Merhaba, ${recipientName || "Değerli Kullanıcı"}!</p>
            <p>${content}</p>
          </div>
          <div class="email-footer">
            <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  

  const sendBulkEmail = async () => {
    console.log("Sending emails to:", selectedUsers);
  
    try {
      for (const email of selectedUsers) {
        const renderedHtml = renderEmailTemplate(emailContent, email);
  
        const response = await fetch("/api/email/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email,
            subject: "Özel Şablonlu E-posta",
            html: renderedHtml,
          }),
        });
  
        if (!response.ok) {
          console.error(`E-posta gönderimi başarısız oldu: ${email}`);
        }
      }
  
      alert("Toplu e-postalar başarıyla gönderildi!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Toplu e-posta gönderimi sırasında bir hata oluştu:", error);
      alert("Toplu e-posta gönderimi başarısız oldu.");
    }
  };
  

  const fetchSubscribers = async (page = 1) => {
    try {
      const response = await fetch(
        `/api/subscribers?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2em",
          color: "#333",
          borderBottom: "2px solid #eee",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        {pluginId}
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          backgroundColor: "#fff",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "2px solid #ccc",
                padding: "10px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                color: "#333",
              }}
            >
              <input
                type="checkbox"
                onChange={(e) => {
                  const allEmails = subscribers.map(
                    (subscriber) => subscriber.attributes.email
                  );
                  setSelectedUsers(e.target.checked ? allEmails : []);
                }}
                checked={selectedUsers.length === subscribers.length}
              />
            </th>
            <th
              style={{
                borderBottom: "2px solid #ccc",
                padding: "10px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                color: "#333",
              }}
            >
              ID
            </th>
            <th
              style={{
                borderBottom: "2px solid #ccc",
                padding: "10px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                color: "#333",
              }}
            >
              Email
            </th>
            <th
              style={{
                borderBottom: "2px solid #ccc",
                padding: "10px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                color: "#333",
              }}
            >
              Created At
            </th>
            <th
              style={{
                borderBottom: "2px solid #ccc",
                padding: "10px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                color: "#333",
              }}
            >
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  color: "#333",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(subscriber.attributes.email)}
                  onChange={() =>
                    handleCheckboxChange(subscriber.attributes.email)
                  }
                />
              </td>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  color: "#333",
                }}
              >
                {subscriber.id}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  color: "#333",
                }}
              >
                {subscriber.attributes.email}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  color: "#333",
                }}
              >
                {new Date(subscriber.attributes.createdAt).toLocaleString()}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  color: "#333",
                }}
              >
                {new Date(subscriber.attributes.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "1em", color: "#333" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>

      <button
        style={{
          color: "white",
          backgroundColor: "#333",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
          marginTop: "20px",
        }}
        onClick={openModal}
      >
        Send Bulk Email
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Email Modal"
        style={{ content: { padding: "20px", width: "500px", margin: "auto" } }}
        ariaHideApp={false}
      >
        <h2 style={{ marginBottom: "10px" }}>Edit Email Content</h2>
        <CustomCKEditor
          onChange={({ target: { value } }) => {
            setEmailContent(value);
          }}
          name={"email"}
          value={emailContent}
        ></CustomCKEditor>
        {/* <CustomCKEditor
          editor={ClassicEditor}
          data={emailContent}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log("Editor data:", data);
            setEmailContent(data);
          }}
        /> */}
        <button
          style={{
            marginTop: "20px",
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={sendBulkEmail}
        >
          Send Email
        </button>
        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#888",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default HomePage;
