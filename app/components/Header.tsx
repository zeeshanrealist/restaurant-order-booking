'use client';

import Image from 'next/image';
import cartImage from '../../images/shopping-cart.png';
import { useCart } from '../cartContext/CartContext';
import Link from 'next/link';
const Header = () => {
  const { cartProducts } = useCart();
  return (
    <header className='h-20 shadow-md flex justify-end items-center px-8 gap-x-3'>
      <Link href={'/cart'}><Image src={cartImage} width={30} height={30} alt='Cart' /></Link>
      <div className='text-white bg-black rounded p-2 text-xs'>{cartProducts.length ?? 0}</div>
    </header>
  )
}

export default Header;
