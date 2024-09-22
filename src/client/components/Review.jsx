import React, { useState, useEffect } from "react";

export default function Reviews({ treeId, userId }) {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState([]);
    const [rating, setRating] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews`);
                const result = await response.json();
                setReviews(result);
            } catch (error) {
                console.error('Error fetching reviews:');
            }
        }
        console.log(treeId);

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
            const response = await fetch(`http://localhost:3000/api/trees/${treeId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: reviewText,
                    rating: Number(rating),
                    user_id: userId,
                    tree_id: treeId,
                }),
            });

            console.log("tree id", treeId);
            console.log("user id", userId);


            const newReview = await response.json();
            setReviews([...reviews, newReview]);
            setReviewText("");
            setRating("");
            setError("");

        } catch (error) {
            setError("Error submitting review.")
            console.error("Error submitting review:");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Reviews</h2>
            {
                reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id}>
                            <p>Rating: {review.rating}/5</p>
                            <p>Review: {review.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Write a review!</p>
                )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Review:</label>
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

            {error && <p>{error}</p>}
        </div>
    );

}