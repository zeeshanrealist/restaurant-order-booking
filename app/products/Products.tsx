'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../cartContext/CartContext';

type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

type SelectedProduct = Product & {
  quantity: number;
};

const Products = ({ products }: { products: Product[] }) => {
  const { cartProducts, setCartProducts } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(cartProducts);

  const findSelectedProduct = (productId: number) => {
    return selectedProducts.find(product => product.id === productId)
  }

  const decreaseQuantity = (productId: number, currentCount: number) => {
    if (currentCount === 0) {
      return;
    }
    const productsToSelect = [...selectedProducts];
    const productToSelect = findSelectedProduct(productId);
    if (productToSelect) {
      
      if (productToSelect.quantity === 1) { // if quantity is 1, remove the products from selected products
        const productToDeleteIdx = productsToSelect.findIndex(product => product.id === productId);
        if (productToDeleteIdx !== -1) {
          productsToSelect.splice(productToDeleteIdx, 1);
        }
      } else {
        productToSelect.quantity = productToSelect.quantity - 1;
      }
      setSelectedProducts(productsToSelect);
      setCartProducts(productsToSelect);
    }
  }

  const increaseQuantity = (productId: number) => {
    const productsToSelect = [...selectedProducts];
    const productToSelect = findSelectedProduct(productId);
    if (!productToSelect) {
      // from the original list of products
      const product = products.find(product => product.id === productId);
      if (product) {
        productsToSelect.push({
          ...product,
          quantity: 1
        })
      }
    } else {
      productToSelect.quantity = productToSelect.quantity + 1;
    }
    setSelectedProducts(productsToSelect);
    setCartProducts(productsToSelect);
  }

  return (
    <div className='max-w-[900px] my-0 mx-auto'>
      <h1 className='text-center text-4xl mt-3 mb-4'>Products</h1>
      <ul className='flex flex-col gap-4 items-center'>
        {
          products.map(product => <li key={product.id} className='flex gap-x-6'>
            <Image alt={product.name} src={product.imageUrl} width={150} height={150} />
            <div>
              <div className='font-bold'>{product.name.toUpperCase()}</div>
              <div className='mt-3 mb-1'>{product.description}</div>
              <div className='flex gap-x-2'>
                <div>Quantity:</div>
                <div className='flex gap-x-2'>
                  <button
                    onClick={() => decreaseQuantity(product.id, findSelectedProduct(product.id)?.quantity ?? 0)}
                    className='text-white bg-black text-base px-3 rounded text-center'
                  >
                    -
                  </button>
                  <span>{findSelectedProduct(product.id)?.quantity ?? 0}</span>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className='text-white bg-black text-base px-3 rounded text-center'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </li>)
        }
      </ul>
    </div>
  )
}

export default Products;
