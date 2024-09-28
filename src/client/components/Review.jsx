import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export default function Reviews({ treeId, userId }) {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState([]);
    const [rating, setRating] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [commentsByReview, setCommentsByReview] = useState({});
    const [hasUserReviewed, setHasUserReviewed] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('token');

    // this function gets all the reviews for a tree on the single tree page
    async function fetchReviews() {
        try {
            const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews`);
            const result = await response.json();

            setReviews(result.reviews);
            
            const userReview = result.reviews.find(review => review.user_id === userId);
            if (userReview) {
                setHasUserReviewed(true);
            }
            
            result.reviews.forEach(review => fetchCommentsForReview(review.id));

        } catch (error) {
            console.error('Error fetching reviews:', error);
            console.error('Error fetching reviews:');
        }
    }


    // This function gets all the comments for all the reviews on the page
    async function fetchCommentsForReview(reviewId) {
        try {
            const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews/${reviewId}/comments`);
            const result = await response.json();

            setCommentsByReview(prevState => ({
                ...prevState,
                [reviewId]: result.comments || []
            }));
        } catch (error) {
            console.error(`Error fetching comments for review ${reviewId}:`, error);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [treeId]);


    // HANDLES REVIEW SUBMISSION
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');

        if (!reviewText || !rating || rating < 1 || rating > 5) {
            setError('Please enter a valid review and a rating between 1 and 5.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: reviewText,
                    rating: Number(rating),
                    tree_id: treeId,
                }),
            });

            const newReview = await response.json();
            setReviews((prevState) => [
                ...prevState,
                newReview
            ]);
            setHasUserReviewed(true);

            setReviewText("");
            setRating("");
            setError("");
            

            // fetchReviews();

        } catch (error) {
            setError("Error submitting review.")
            console.error("Error submitting review:");
        } finally {
            setLoading(false);
        }
    };

    // this function lets a user post a comment
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!commentText.trim) {
            setError('Please enter a valid comment.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews/${selectedReviewId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: commentText,
                    review_id: selectedReviewId,
                }),
            });

            const newComment = await response.json();
            setCommentsByReview((prevState) => ({
                ...prevState,
                [selectedReviewId]: [...(prevState[selectedReviewId] || []), newComment],
            }));
            setCommentText("");
            setIsModalOpen(false);

        } catch (error) {
            setError("Error submitting comment.")
            console.error("Error submitting comment:", error);
        } finally {
            setLoading(false);
        }
    };

    const openCommentModal = (reviewId) => {
        setSelectedReviewId(reviewId);
        setIsModalOpen(true);
    }

    return (
        <div>
            {token ? (
                hasUserReviewed ? (
                    <p>You have already submitted a review for this tree.</p>
                ) : (
                    <form onSubmit={handleSubmitReview}>
                        <div>
                            <label>Love this tree? Leave a review!</label>
                            <textarea
                                id="review"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="rating">Rating (1-5):</label>
                            <input
                                type="number"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                )
            ) : (
                <p>Please log in to leave a review.</p>
            )}


            <h2 className="review h2">Reviews</h2>

            {reviews.length > 0 && (
                <div className="average-rating">
                    <h3>Average Rating:
                        {(
                            reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
                        ).toFixed(1)} / 5
                    </h3>
                </div>
            )}

            {
                reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review">
                            <p><strong>{review.username}</strong> wrote:</p>
                            <p>Rating: {review.rating}/5</p>
                            <p>Review: {review.text}</p>

                            <div className="comments">
                                <p>Comments</p>
                                {commentsByReview[review.id] && commentsByReview[review.id].length > 0 ? (
                                    commentsByReview[review.id].map((comment) => (
                                        <div key={comment.id}>
                                            <p><strong>{comment.username}</strong> commented:</p>
                                            <p>{comment.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments for this review</p>
                                )}
                            </div>

                            {token && (
                                <button onClick={() => openCommentModal(review.id)}>Reply</button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Write a review!</p>
                )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Post a Comment</h2>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your comment..."
                            required
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSubmitComment}>Submit Comment</button>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );

}