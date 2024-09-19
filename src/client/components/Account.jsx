import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function Account({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({ reviews: [], comments: [] });
    const [deletedReview, setDeletedReview] = useState(null);
    const [deletedComment, setDeletedComment] = useState(null);
    const [refresh, setRefresh] = useState(false);
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
            setUser(result);

        } catch (error) {
            setError(error.message)
        }
    };

    async function deleteReview(id) {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/:user_id/reviews/${id}`,
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

    async function deleteComment(id) {
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/:user_id/comments/${id}`,
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
                    <div>
                        <div>
                            <h3>Welcome, {user.username}!</h3>
                            <h3>Email Account: {user.email}</h3>
                        </div>
                        <div>
                            {user.reviews?.map((review) => (
                                <div key={review.id}>
                                    <h3>
                                        {review.rating} - {review.text}
                                    </h3>
                                    <button onClick={() => deleteReview(review.id)}>Delete Review</button>
                                </div>
                            ))};
                        </div>
                        <div>
                            {user.comments?.map((comment) => (
                                <div key={comment.id}>
                                    <h3>
                                        {comment.rating} - {comment.text}
                                    </h3>
                                    <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                                </div>
                            ))};
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