import React from "react";

const DeleteConfirmation = ({ contact, onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete(contact._id);
  };

  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete this contact?</p>
      <button className="btn btn-danger btn-sm me-2" onClick={handleDelete}>
        Delete
      </button>
      <button className="btn btn-secondary btn-sm" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteConfirmation;
