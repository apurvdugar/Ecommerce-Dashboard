import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 100;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button variant="primary" onClick={() => window.location.href = "/products"}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex justify-between">
                  <h2 className="font-semibold text-gray-900">Product</h2>
                  <div className="flex justify-between gap-x-10">
                    <span className="w-20 mr-2">Quantity</span>
                    <span className="w-20">Total</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200 p-4">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>

              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <Link to="/products" className="text-gray-600 hover:text-gray-900">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>

                <Button variant="ghost" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `Rs. ${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">GST & Other Charges</span>
                  <span className="font-medium">Rs. {tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">Rs. {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button variant="primary" fullWidth onClick={() => window.location.href = "/checkout"}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;