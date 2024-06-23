import React, { useEffect, useState } from "react";
import AddProduct from "./Components/AddProduct";
import { useForm } from "@inertiajs/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Product({ products }) {
    const [message, setMessage] = useState("");
    const [editFormData, setEditFormData] = useState(null);
    const [editing, setEditing] = useState(false);
    const { delete: destroy } = useForm();

    const handleEditItem = (item) => {
        setEditFormData(item);
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditFormData(null);
        setEditing(false);
    };

    const handleDeleteItem = async (productId) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (shouldDelete) {
            destroy(`/products/${productId}`)
        } else {
            console.log("Delete canceled");
        }
    };

    let ItemRows = "";
    if (products && products.length > 0) {
        ItemRows = products.map((product) => (
            <tr key={product.id}>
                <td className="table-name">{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className="flex mt-[5px]">
                    <FaEdit
                        className="mr-4 cursor-pointer"
                        onClick={() => handleEditItem(product)}
                    />
                    <FaTrashAlt
                        className="cursor-pointer"
                        onClick={() => handleDeleteItem(product.id)}
                    />
                </td>
            </tr>
        ));
    }

    return (
        <>
            <div className="mx-4 my-4">
                <div className="flex justify-between items-center">
                    <div className="title">Products</div>
                    <AddProduct
                        setMessage={setMessage}
                        message={message}
                        editFormData={editFormData}
                        editing={editing}
                        onCancelEdit={handleCancelEdit}
                    />
                </div>
                {message && (
                    <div
                        className="border px-4 py-3 mt-5 rounded relative bg-green-100 border-green-400 text-green-700"
                        role="alert"
                    >
                        <span className="block sm:inline">{message}</span>
                    </div>
                )}
                <div className="table-responsive-md mt-4">
                    <table className="table table-hover details">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{ItemRows}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Product;
