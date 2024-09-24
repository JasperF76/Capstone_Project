import React, { useState, useEffect } from "react";

export default function Reviews({ treeId, userId }) {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState([]);
    const [rating, setRating] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [commentsByReview, setCommentsByReview] = useState({});
    const [hasUserReviewed, setHasUserReviewed] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews`);
                const result = await response.json();

                setReviews(result.reviews);

                const userReview = result.reviews.find(review => review.user_id === userId);
                if (userReview) {
                    setHasUserReviewed(true);
                }

                for (const review of result.reviews) {
                    fetchCommentsForReview(review.id);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                console.error('Error fetching reviews:');
            }
        }

        async function fetchCommentsForReview(reviewId) {
            try {
                const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews/${reviewId}/comments`);
                const result = await response.json();
                console.log('Comments for review', reviewId, ':', result);
                console.log('Comments by review:', commentsByReview);

                setCommentsByReview(prevState => ({
                    ...prevState,
                    [reviewId]: result.comments || []
                }));
            } catch (error) {
                console.error(`Error fetching comments for review ${reviewId}:`, error);
            }
        }

        fetchReviews();
    }, [treeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
                    user_id: userId,
                    tree_id: treeId,
                }),
            });

            const newReview = await response.json();
            setReviews([...reviews, newReview]);
            setReviewText("");
            setRating("");
            setError("");
            setHasUserReviewed(true);

        } catch (error) {
            setError("Error submitting review.")
            console.error("Error submitting review:");
        }
        setLoading(false);
    };

    return (
        <div>
            {hasUserReviewed ? (
            <p>You have already submitted a review for this tree.</p>
        ) : (
            <form onSubmit={handleSubmit}>
            <div>
                <label>Leave A Review!</label>
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
        )}
            <h2 className="review h2">Reviews</h2>
            {
                reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review">
                            <p>Rating: {review.rating}/5</p>
                            <p>Review: {review.text}</p>
                            <div className="comments">
                                <p>Comments</p>
                                {commentsByReview[review.id] && commentsByReview[review.id].length > 0 ? (
                                    commentsByReview[review.id].map((comment) => (
                                        <div key={comment.id}>
                                            <p>{comment.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments for this review</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Write a review!</p>
                )}
            {error && <p>{error}</p>}
        </div>
    );

}