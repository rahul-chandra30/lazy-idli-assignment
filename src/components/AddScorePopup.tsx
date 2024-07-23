import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './CustomModal.css'; // Import the custom CSS file

interface AddScorePopupProps {
  onAddScore: (username: string, time: string) => void;
  onClose: () => void;
}

const AddScorePopup: React.FC<AddScorePopupProps> = ({ onAddScore, onClose }) => {
  const [username, setUsername] = useState("");
  const [time, setTime] = useState("");
  const [show, setShow] = useState(true);
  const [timeError, setTimeError] = useState("");

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleSubmit = () => {
    if (validateTime(time)) {
      onAddScore(username, time);
      handleClose();
    } else {
      setTimeError("Time must be in the format HH:MM:SS");
    }
  };

  const validateTime = (time: string) => {
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return timeRegex.test(time);
  };

  const handleTimeBlur = () => {
    if (!validateTime(time)) {
      setTimeError("Time must be in the format HH:MM:SS");
    } else {
      setTimeError("");
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length > 6) value = value.slice(0, 6); // Limit to 6 digits

    const formattedTime = value
      .replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3") // Format as HH:MM:SS
      .replace(/(\d{2})(\d{2})/, "$1:$2"); // Format as HH:MM if less than 6 digits

    setTime(formattedTime);
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add Score</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              className="ml-4"
              type="text"
              placeholder="Enter time"
              value={time}
              onChange={handleTimeChange}
              onBlur={handleTimeBlur}
            />
            {timeError && <div className="text-danger">{timeError}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="button" variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddScorePopup;