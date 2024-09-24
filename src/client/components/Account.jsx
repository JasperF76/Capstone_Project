import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Modal from "./Modal";

export default function Account({ token, setToken, user, setUser }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    // const [deletedReview, setDeletedReview] = useState(null);
    // const [deletedComment, setDeletedComment] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const [newRating, setNewRating] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [newComment, setNewComment] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const navigate = useNavigate();

    // This fetches all of a users data.
    async function getUser() {
        try {

            const response = await fetch(
                "http://localhost:3000/api/users/me",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();
            setSuccessMessage(result.message);
            setUser(result.user);

        } catch (error) {
            setError(error.message)
        }
    };


    // This lets users edit their reviews.
    const handleEditReview = (review) => {
        setSelectedReview(review);
        setNewReview(review.text);
        setNewRating(review.rating);
        setIsReviewModalOpen(true);
    };

    const handleSaveEditReview = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}/reviews/${selectedReview.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        text: newReview,
                        rating: newRating,
                    }),
                }
            );
            const result = await response.json();
            setIsReviewModalOpen(false);
            setRefresh(!refresh);
        } catch (error) {
            setError("Failed to update the review");
        }

    };

    // This lets users edit their comments.
    const handleEditComment = (comment) => {
        setSelectedComment(comment);
        setNewComment(comment.text);
        setIsCommentModalOpen(true);
    };

    const handleSaveEditComment = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}/comments/${selectedComment.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        text: newComment,
                    }),
                }
            );
            const result = await response.json();
            setIsCommentModalOpen(false);
            setRefresh(!refresh);
        } catch (error) {
            setError("Failed to update the review");
        }

    };

    // This lets a user delete a review.
    async function deleteReview(id) {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}/reviews/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            const updatedReviews = user.reviews.filter(review => review.id !== id);
            setUser({
                ...user,
                reviews: updatedReviews
            });

            getUser();

            // setDeletedReview(result);

            setRefresh(!refresh);
        } catch (error) {
            setError(error.message);
        }
    };

    // This lets a user delete a comment.
    async function deleteComment(id) {

        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}/comments/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            getUser();
            // setDeletedComment(result);

            setRefresh(!refresh);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("refresh triggered, fetching user data");
        getUser();
    }, [refresh]);



    return (
        <>
            {token ?
                (
                    <div className="user-account">
                        <div>
                            <h2>Welcome, {user.username}!</h2>
                        </div>
                        <div>
                            <h2>Your Reviews:</h2>
                            {user.reviews?.map((review) => (
                                <div key={review.id}>

                                    <h3>
                                        Rating: {review.rating}
                                    </h3>
                                    <h3>
                                        Review for {review.treename}:
                                    </h3>
                                    <p>
                                        {review.text}
                                    </p>
                                    <button onClick={() => handleEditReview(review)}>Edit Review</button>
                                    <button onClick={() => deleteReview(review.id)}>Delete Review</button>
                                </div>
                            ))}
                        </div>

                        {isReviewModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Edit Review</h2>
                                    <textarea
                                        value={newReview}
                                        onChange={(e) => setNewReview(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={newRating}
                                        onChange={(e) => setNewRating(e.target.value)}
                                    />
                                    <div className="modal-buttons">
                                        <button onClick={handleSaveEditReview}>Save</button>
                                        <button className="close-btn" onClick={() => setIsReviewModalOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <h2>Your Comments: </h2>
                            {user.comments?.map((comment) => (
                                <div key={comment.id}>

                                    <h3>
                                        {comment.text}
                                    </h3>
                                    <button onClick={() => handleEditComment(comment)}>Edit Comment</button>
                                    <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                                </div>
                            ))}
                        </div>

                        {isCommentModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Edit Comment</h2>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <div className="modal-buttons">
                                        <button onClick={handleSaveEditComment}>Save</button>
                                        <button className="close-btn" onClick={() => setIsCommentModalOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                )
                :
                (
                    <p>Please Login or Register!</p>
                )}
        </>
    )

};