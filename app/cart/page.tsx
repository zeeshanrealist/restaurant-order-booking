"use client";
import Image from "next/image";
import { useCart } from "../cartContext/CartContext";
import Link from "next/link";

const Page = () => {
  const { cartProducts } = useCart();
  return (
    <div className="max-w-[900px] my-0 mx-auto">
      <h1 className="text-center text-4xl mt-3 mb-4">Cart</h1>
      <Link href={'/products'} className="text-center rounded text-blue-600 mb-3 block">Add more products</Link>
      {cartProducts.length ? (
        <ul className="flex flex-col gap-4 items-center">
          {cartProducts.map((product) => (
            <li key={product.id} className="flex gap-x-6">
              <Image
                alt={product.name}
                src={product.imageUrl}
                width={150}
                height={150}
              />
              <div>
                <div className="font-bold">{product.name.toUpperCase()}</div>
                <div className="mt-3 mb-1">{product.description}</div>
                <div className="flex gap-x-2">
                  <div>Quantity:</div>
                  <div className="flex gap-x-2">
                    <span>{product.quantity ?? 0}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
      ) : (
        <div className="text-center text-xl mb-4">No products added to the cart</div>
      )}
    </div>
  );
};

export default Page;
