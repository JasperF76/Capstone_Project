import React, { useState } from 'react';
import Modal from './Modal';

export default function EditTree({ token, tree, closeModal, onUpdate }) {
    const [treeName, setTreeName] = useState(tree?.treename || '');
    const [location, setLocation] = useState(tree?.location || '');
    const [description, setDescription] = useState(tree?.description || '');
    const [image_url, setImageUrl] = useState(tree?.image_url || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`api/trees/edit_tree/${tree.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Pass the token to authenticate the admin
                },
                body: JSON.stringify({
                    treeName,
                    location,
                    description,
                    image_url
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Tree '${treeName}' updated successfully!`);
                setError('');
                onUpdate(result);
                closeModal();
            } else {
                setError(result.error);
                setMessage('');
            }
        } catch (err) {
            console.error('Error creating tree:', err);
            setError('An error occurred while editing the tree.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Tree</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="edit-tree-form">
                    <div className="form-group">
                        <label htmlFor="treeName">Tree Name:</label>
                        <input
                            type="text"
                            id="treeName"
                            value={treeName}
                            onChange={(e) => setTreeName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image_url">Image URL:</label>
                        <input
                            type="text"
                            id="image_url"
                            value={image_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <button type="submit">Update Tree</button>
                    <button className="close-btn" onClick={closeModal}>Cancel</button>
                </form>
            </div>
        </div>
    );
}