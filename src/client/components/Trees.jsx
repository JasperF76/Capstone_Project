import { useState, useEffect } from "react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Trees({ setTree }) {
    const [treesList, setTreesList] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const navigate = useNavigate();

    async function AllTrees(setTree) {
        try {
            const response = await fetch(
                "http://localhost:3000/api/trees",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();
            console.log(result.trees);
            setTreesList(result.trees);

        } catch (error) {
            setError(error.message);
        }
    }
    useEffect(() => {
        AllTrees();
    }, []);

    const treesToDisplay = searchParam ? treesList.filter((tree) =>
        tree.treename.toLowerCase().includes(searchParam)) : treesList;

    return (
        <>
            <div className="mainpage">
                <label>
                    Search For A Specific Tree: {" "}
                </label>
                <input
                    type="text"
                    placeholder="search"
                    onChange={(e) => setSearchParam(e.target.value.toLowerCase())} />
            </div>
            {treesToDisplay.map((tree) => {
                return (
                    <div key={tree.id} className="alltrees">
                            <img src={tree.image_url} alt="a tree" className="alltrees-pics" style={{ width: '100px', height: '100px' }}/>
                        <h3>
                            Tree Name: {tree.treename}
                        </h3>
                        <h3>
                            Location: {tree.location}
                        </h3>
                        <button onClick={() => {
                            setTree(tree);
                            navigate(`/trees/${tree.id}`)
                        }}>Learn More!</button>
                    </div>
                )
            })}
        </>
    )

}