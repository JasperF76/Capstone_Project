import React, { useState } from 'react';

export default function CreateTree({ token }) {
    const [treeName, setTreeName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/trees/new_tree', {
                method: 'POST',
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
            // const contentType = response.headers.get('Content-Type');
            // let result;

            // if (contentType && contentType.includes('application/json')) {
            // result = await response.json();
            // } else {
            //     throw new Error('Response is not JSON');
            // }

            if (response.ok) {
                setMessage(`Tree '${treeName}' created successfully!`);
                setError('');
                // Clear form fields
                setTreeName('');
                setLocation('');
                setDescription('');
                setImageUrl('');
            } else {
                setError(result.error);
                setMessage('');
            }
        } catch (err) {
            console.error('Error creating tree:', err);
            setError('An error occurred while creating the tree.');
        }
    };

    return (
        <div className="create-tree-container">
            <h2>Create a New Tree</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="create-tree-form">
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
                <button type="submit">Create Tree</button>
            </form>
        </div>
    );
}