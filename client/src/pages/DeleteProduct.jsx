import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/products";

const DeleteProduct = () => {
    const [productId, setProductId] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await deleteProduct(productId);

            if (response.success) {
                setErrorMessage('Product deleted successfully');
                setShowMessage(true);
                // Clear the form field
                setProductId('');
            } else {
                setErrorMessage('Failed to delete product');
                setShowMessage(true);
            }
        } catch (error) {
            setErrorMessage('An error occurred while deleting the product');
            setShowMessage(true);
        }

        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    };

    const redirectToInventory = () => {
        navigate('/inventory');
    };

    return (
        <>
         <div className="h-screen flex items-center justify-center bg-green-200">
    <div className="p-5 border border-green-900 rounded bg-green-100">
        <div className="m-3 text-3xl font-bold text-center text-green-900">Delete Product</div>

        <div className="flex flex-col gap-4">
            <div className="flex grid-cols-2 gap-3">
                <label className="text-lg w-36 text-green-700">Product ID</label>
                <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border border-green-500 p-2 w-full" />
            </div>

            <div className="flex grid-cols-2 gap-3">
                <label className="text-lg w-36 text-green-700">Product Name</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded border border-green-500 p-2 w-full" />
            </div>

            <div className="flex grid-cols-2 gap-3">
                <label className="text-lg w-36 text-green-700">Quantity</label>
                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-green-500 p-2 w-full" />
            </div>

            <div className="flex grid-cols-2 gap-3">
                <label className="text-lg w-36 text-green-700">Unit</label>
                <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border border-green-500 p-2 w-full" />
            </div>

            <div className="flex grid-cols-2 gap-3">
                <label className="text-lg w-36 text-green-700">Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-green-500 p-2 w-full" />
            </div>

            <button type="button" onClick={handleDelete} className="bg-green-700 text-white p-3 rounded-full hover:bg-green-900">DELETE</button>
        </div>

        {showMessage && <div className="text-center mt-4 text-green-600">{errorMessage}</div>}
    </div>
</div>

        </>
    );
};

export default DeleteProduct;
