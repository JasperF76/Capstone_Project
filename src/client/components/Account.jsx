import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function Account({ token, setToken, user, setUser, }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [deletedReview, setDeletedReview] = useState(null);
    const [deletedComment, setDeletedComment] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const [newComment, setNewComment] = useState(null);
    const navigate = useNavigate();

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

    async function editReview() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}/reviews/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        review_id,
                        new_text,
                        new_rating,
                    }),
                }
            );

            const result = await response.json();
            setNewReview(result);
        } catch (error) {

        }
    }

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
            setDeletedReview(result);
            setRefresh(!refresh);

        } catch (error) {
            setError(error.message);
        }
    };

    async function editComment() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/${user.id}/comments/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        comment_id,
                        new_text,
                    }),
                }
            );

            const result = await response.json();
            setNewComment(result);
        } catch (error) {

        }
    }

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
            setDeletedComment(result);
            setRefresh(!refresh);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
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
                                    <button onClick={() => editReview(review.id)}>Edit Review</button>
                                    <button onClick={() => deleteReview(review.id)}>Delete Review</button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2>Your Comments: </h2>
                            {user.comments?.map((comment) => (
                                <div key={comment.id}>

                                    <h3>
                                        {comment.text}
                                    </h3>
                                    <button onClick={() => editComment(comment.id)}>Edit Comment</button>
                                    <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                                </div>
                            ))}
                        </div>
                    </div>

                )
                :
                (
                    <p>Please Login or Register!</p>
                )}
        </>
    )

};