import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

function AddProduct({
    setMessage,
    editFormData,
    editing,
    onCancelEdit,
    message,
}) {
    const [showModal, setShowModal] = useState(false);
    const [nameError, setNameError] = useState("");
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        price: 0,
        stock: 0,
    });
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            setMessage(flash.message);
            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
    }, [flash.message]);

    useEffect(() => {
        if (editing && editFormData) {
            setData({
                name: editFormData.name,
                description: editFormData.description,
                price: editFormData.price,
                stock: editFormData.stock,
            });
            setShowModal(true);
        } else {
            setData({
                name: "",
                description: "",
                price: "",
                stock: "",
            });
        }
    }, [editing, editFormData]);

    const toggleModal = () => {
        setShowModal(!showModal);
        if (onCancelEdit && editing) {
            onCancelEdit();
        }
    };

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.name.trim() === "") {
            setNameError("name cannot be empty");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("name", data.name);
        formDataToSend.append("description", data.description);
        formDataToSend.append("price", data.price);
        formDataToSend.append("stock", data.stock);
        sendFormData(formDataToSend);
    };

    const sendFormData = async (formDataToSend) => {
        if (editing) {
            const res = post(`/products/${editFormData.id}`, {
                data: editFormData,
            });
        } else {
            const res = post("/products");
        }
    };

    return (
        <>
            <div
                className="card border p-0 rounded-lg overflow-hidden cursor-pointer h-3/5 bg-[#04c342]"
                onClick={toggleModal}
            >
                <div className="bg-green-700 p-0">
                    <div className="flex gap-1 items-center px-3 p-0">
                        <span className=" text-[2rem] font-black text-white">
                            +
                        </span>
                        <div className="mb-[5px] pt-2 font-bold text-white text-center">
                            Add Product
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed z-[9999] inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>
                        <div className="relative bg-white rounded-lg left-12">
                            {/* Your form content here */}
                            <div className="flex justify-between border-b-[1px] border-[#e5e5e5] p-8">
                                <h2 className="text-3xl font-black">
                                    {editing ? "Edit Product" : "Add Product"}
                                </h2>
                                <button
                                    onClick={toggleModal}
                                    className=" text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {message && (
                                <div className="text-green-500 font-bold text-2xl my-4 text-center">
                                    {message}
                                </div>
                            )}
                            <form className="grid grid-cols-2 gap-12 mx-16 my-4">
                                <div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="item_name"
                                            className="block"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            id="name"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-14"
                                            onChange={(e) =>
                                                handleChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        {nameError && (
                                            <span className="text-red-500">
                                                {nameError}
                                            </span>
                                        )}
                                        {errors.name && (
                                            <p className="error">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="description"
                                            className="block"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            rows="4"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-40"
                                            onChange={(e) =>
                                                handleChange(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
                                        {errors.description && (
                                            <p className="error">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={data.price}
                                            id="price"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-[3.4rem]"
                                            onChange={(e) =>
                                                handleChange(
                                                    "price",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.price && (
                                            <p className="error">
                                                {errors.price}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="stock"
                                            className="block"
                                        >
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={data.stock}
                                            id="stock"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4  border-gray-300 rounded-md border h-[3.4rem]"
                                            onChange={(e) =>
                                                handleChange(
                                                    "stock",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {errors.stock && (
                                            <p className="error">
                                                {errors.stock}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </form>
                            <div className="flex justify-end border-t-[1px] p-8">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md mr-2 focus:outline-none hover:bg-gray-400 transition duration-150 ease-in-out drop-shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none hover:bg-indigo-600 transition duration-150 ease-in-out drop-shadow-md"
                                    disabled={processing}
                                >
                                    {editing ? "Update" : "Submit"}
                                </button>
                                {processing && (
                                    <div className="top-0 bottom-0 right-0 left-0 flex items-center mx-4">
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddProduct;
