import Products from "./Products";

export default async function Page() {
  let data = await fetch('https://my-json-server.typicode.com/zeeshanrealist/restaurant-order-booking/products');
  let products = await data.json();
  if (products?.length) {
    return <Products products={products} />
  }
  return <div>Produtcs API error</div>
}
