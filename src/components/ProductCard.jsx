import React from "react";
import { Heart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="relative group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg h-60">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm cursor-pointer transition-opacity duration-300 ${
              isHovered || isFavorite ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center text-amber-500 mb-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating?.rate)
                      ? "fill-amber-500"
                      : "fill-gray-200"
                  }`}
                />
              ))}
            <span className="text-gray-600 text-xs ml-1">
              {product.rating?.rate}
            </span>
          </div>

          <h3 className="font-medium text-gray-900 mb-1 truncate">
            {product.title}
          </h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-blue-700 font-semibold">
              Rs. {product.price}
            </span>
            <Button
              size="sm"
              variant="primary"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;