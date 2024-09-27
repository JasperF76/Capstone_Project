import { useState, useEffect } from "react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import EditTree from "./EditTree";

export default function Trees({ setTree, isAdmin, token }) {
    const [treesList, setTreesList] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const [selectedTree, setSelectedTree] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();

    async function AllTrees(setTree) {
        try {
            const response = await fetch(
                "/api/trees",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();
            setTreesList(result.trees);

        } catch (error) {
            setError(error.message);
        }
    }

    async function deleteTree(id) {
        try {
            const response = await fetch(`/api/trees/delete/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setTreesList(prevTrees => prevTrees.filter(tree => tree.id !== id));
                } else {
                    const result = await response.json();
                    setError(result.error);
                }
        } catch (error) {
            setError("Error deleting the tree");
            console.error(error);
        }
    }

    const handleEditClick = (tree) => {
        setSelectedTree(tree);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        setSelectedTree(null);
    };

    const handleTreeUpdate = (updatedTree) => {
        setTreesList((prevList) =>
            prevList.map((tree) =>
            tree.id === updatedTree.id ? updatedTree : tree
        )
        );
    };

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
                            {tree.treename}
                        </h3>
                        <p className="of"><i>of</i></p>
                        <h3>
                            {tree.location}
                        </h3>
                        <button onClick={() => {
                            setTree(tree);
                            navigate(`/trees/${tree.id}`)
                        }}>Learn More!</button>

                        {isAdmin && (
                            <>
                            <button
                            className="edit-button"
                            onClick={() => handleEditClick(tree)}
                            >
                                Edit Tree
                            </button>
                            <button 
                            className="delete-button"
                            onClick={() => deleteTree(tree.id)}
                            >
                                Delete Tree
                            </button>
                            </>
                        )}
                    </div>
                )
            })}
            {isEditModalOpen && (
                <EditTree
                    token={token}
                    tree={selectedTree}
                    closeModal={closeModal}
                    onUpdate={handleTreeUpdate}
                    />
            )}
        </>
    );

}