import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { getProduct, updateQuantity, removeFromCart } = useCart();
  const product = getProduct(item.productId);

  if (!product) return null;

  return (
    <div className="flex items-center py-4 border-b">
      <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded mr-4" />

      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-500">Rs. {product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center mr-4">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4 text-gray-600" />
        </button>

        <span className="mx-2 w-8 text-center">{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="text-right w-20 mr-2">
        <p className="font-medium">Rs. {(product.price * item.quantity).toFixed(2)}</p>
      </div>

      <button
        onClick={() => removeFromCart(item.productId)}
        className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
        aria-label="Remove item"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;