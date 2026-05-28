import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";

const EmailTem = ({ message, emailAddress, googleMeetLink, time, normali }) => {
  const subject = "Thank you for scheduling the meeting";

  console.log("normali", normali);


  const renderEmailTemplate = () => {
    return ReactDOMServer.renderToStaticMarkup(
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
          color: "#333",
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#0056b3" }}>
          Thank You for Scheduling a Meeting!
        </h2>
        <p>Dear {emailAddress},</p>
        <p>
          Thank you for scheduling a meeting with us. We are excited to connect
          with you and look forward to discussing your needs.
        </p>
        <p>
          <strong>Meeting Details:</strong>
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>Google Meet Link:</strong>{" "}
            <a href={googleMeetLink} style={{ color: "#0056b3" }}>
              {googleMeetLink}
            </a>
          </li>
          <li>
            <strong>Time:</strong> {time}
          </li>
        </ul>
        <p>
          <strong>Your Message:</strong> {message}
        </p>
        <p>
          If you have any questions or need to reschedule, please don’t hesitate
          to contact us.
        </p>
        <p>Looking forward to meeting you!</p>
        <p style={{ marginTop: "20px" }}>Best regards,</p>
        <p style={{ fontWeight: "bold", color: "#0056b3" }}>The Team</p>
      </div>
    );
  };

  useEffect(() => {
    // Check if normali is true and if emailAddress and googleMeetLink are valid
    if (normali && emailAddress && googleMeetLink) {
      const handleSendEmail = async () => {
        try {
          const emailContent = renderEmailTemplate();
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/email/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailAddress, subject, emailContent }),
          });

          const data = await response.json();
          console.log("Email sent:", data.message); // Handle success feedback
        } catch (error) {
          console.error("Failed to send email:", error); // Handle error feedback
        }
      };

      // Automatically send the email after the component mounts and conditions are met
      handleSendEmail();
    } else {
      console.log("Email not sent: normali is false or missing required data");
    }
  }, [normali]); // Trigger when any of these dependencies change

  return null; // No need for a button, the email sends automatically
};

export default EmailTem;
