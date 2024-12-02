import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/SupportPage.css";

const sendFormToStorage = (formData: any) => {
  try {
    const existingTickets = JSON.parse(
      localStorage.getItem("supportTickets") || "[]"
    );
    existingTickets.push(formData);
    localStorage.setItem("supportTickets", JSON.stringify(existingTickets));
    return true;
  } catch (error) {
    return false;
  }
};

const generateRandomTicketNumber = () => {
  return Math.floor(Math.random() * 10000);
};

const SupportPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [topic, setTopic] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  const isFormValid = firstName && lastName && email && topic;

  const handleSubmit = async () => {
    if (!isFormValid || isSending) return;

    setIsSending(true);
    const formData = {
      firstName,
      lastName,
      email,
      topic,
      description,
    };

    setTimeout(() => {
      const success = sendFormToStorage(formData);
      setIsSending(false);

      if (!success) {
        Swal.fire({
          title: "Error",
          text: "Failed to send ticket. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      } else {
        setTicketNumber(generateRandomTicketNumber());
        setFirstName("");
        setLastName("");
        setEmail("");
        setTopic(null);
        setDescription("");
        Swal.fire({
          title: "Success",
          text: "Your support ticket has been sent successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }, 1000);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  return (
    <div className="support-page-container">
      <h1>Support Ticket Form</h1>
      {ticketNumber ? (
        <div className="success-ticket-message">
          <h2>
            Thank you for sending us your report. We will track the problem now.
          </h2>
          <span>
            Ticket number: <span id="ticket-number">{ticketNumber}</span>
          </span>
        </div>
      ) : (
        <form className="support-page-form">
          <div className="form-leftside">
            <div className="form-name-outer">
              <label className="form-label">
                Name <span className="required"> * </span>
              </label>
              <div className="form-name">
                <div className="form-name-detail">
                  <input
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label>First</label>
                </div>
                <div className="form-name-detail">
                  <input
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label>Last</label>
                </div>
              </div>
            </div>

            <div className="form-email">
              <label className="form-label">
                Email <span className="required"> * </span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-topic">
              <label className="form-label">
                Topic <span className="required"> * </span>
              </label>
              <div className="form-topic-detail">
                <p>What can we help you with today?</p>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="topic"
                    value="General"
                    id="general"
                    onChange={handleTopicChange}
                    checked={topic === "General"}
                  />
                  <label htmlFor="general" className="radio-label">
                    General
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="topic"
                    value="Bug"
                    id="bug"
                    onChange={handleTopicChange}
                    checked={topic === "Bug"}
                  />
                  <label htmlFor="bug" className="radio-label">
                    Bug
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-rightside">
            <label className="form-label description">
              Description <span className="optional">optional</span>
            </label>
            <textarea
              placeholder="Description Report"
              id="form-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>
      )}

      {!ticketNumber && (
        <button
          id="send-ticket"
          onClick={handleSubmit}
          disabled={!isFormValid || isSending}
          style={{
            backgroundColor: isFormValid && !isSending ? "orange" : "gray",
            cursor: isSending ? "not-allowed" : "pointer",
          }}
        >
          {isSending ? "Sending..." : "SEND"}
        </button>
      )}
    </div>
  );
};

export default SupportPage;
