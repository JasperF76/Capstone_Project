import React from 'react';

export default function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={closeModal}>X</button>
        {children}
      </div>
    </div>
  );
}