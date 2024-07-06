import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct, } from "../api/products";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    const handleEdit = (productId) => {
        console.log("Editing product with ID:", productId);
        navigate(`/edit-product/${productId}`);
    };

    const handleDelete = async (productId) => {
        console.log("Deleting product with ID:", productId);
        try {
            await deleteProduct(productId);
            getAllProducts();
        } catch (error) {
            console.log("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    const gotoAddProduct = () => {
        navigate('/add-product');
    };

    const gotoUpdateProduct = () => {
        navigate('/update-product')
    };

    return (
        <div className="p-8 bg-green-500 h-screen font-serif">
    <div className="text-3xl font-extrabold text-center text-green-800 mb-6">MICHELLE'S INVENTORY</div>

    <table className="min-w-full bg-transparent shadow-md rounded-lg">
        <thead>
            <tr className="bg-green-900 text-green-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Product Id</th>
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Unit</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Actions</th>
            </tr>
        </thead>
        <tbody className="text-gray-950 text-m font-light">
            {
                products.map((element, index) => (
                    <tr key={index} className="border-b border-green-200 hover:bg-green-100">
                        <td className="py-3 px-6 text-center">{element.product_id}</td>
                        <td className="py-3 px-6 text-left">{element.product_name}</td>
                        <td className="py-3 px-6 text-left">{element.quantity}</td>
                        <td className="py-3 px-6 text-left">{element.unit}</td>
                        <td className="py-3 px-6 text-left">{element.price}</td>
                        <td className="py-3 px-6 text-left">
                            <button onClick={() => handleEdit(element.product_id)} className="p-1 bg-transparent text-black mr-2 hover:bg-green-300">Edit</button>
                            <button onClick={() => handleDelete(element.product_id)} className="p-1 bg-transparent text-black hover:bg-green-300">Delete</button>
                        </td>
                    </tr>
                ))
            }
            <tr>
                <td colSpan="6" className="text-right py-4">
                    <button onClick={gotoAddProduct} className="p-2 rounded bg-transparent text-white hover:bg-blue-500">Add Product</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    );
};

export default Inventory;
