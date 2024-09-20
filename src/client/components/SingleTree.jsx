import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SingleBook({ tree, token }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [id, setId] = useState();

    async function getTreeId() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/trees/${tree.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            const result = await response.json();

        } catch (error) {

        }
    };

    return (
        <>
            <div className="singletree">
                <img src={tree.image_url} alt="a tree" className="singletree-img" />
                <h3>
                    Tree Name: {tree.treename}
                </h3>
                <h3>
                    Location: {tree.location}
                </h3>
                <h3>
                    Description: {tree.description}
                </h3>
            </div>
        </>
    )
}