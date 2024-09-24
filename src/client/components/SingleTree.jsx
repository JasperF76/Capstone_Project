import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Reviews from "./Review";

export default function SingleTree({ tree, treeId, token, user }) {
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="singletree">
                {tree ? (
                    <>
                <h1>{tree.treename}</h1>
                <div className="singletree-img" >
                    <img src={tree.image_url} alt="a tree" />
                </div>
                <ul>
                    <li>
                        <h3>
                            Tree Name: {tree.treename}
                        </h3>
                    </li>
                    <li>
                        <h3>
                            Location: {tree.location}
                        </h3>
                    </li>
                    <li>
                        <p>
                            {tree.description}
                        </p>
                    </li>
                    {tree && <Reviews treeId={tree.id} userId={user.id} />}
                </ul>
                </>
                ) : (
                    <p>Loading tree data...</p>
                )}
            </div>
        </>
    )
};