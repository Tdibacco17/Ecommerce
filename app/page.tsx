import ProductList from "@/components/ProductList/component.server";

export default async function Home() {

  return (
    <div className="">
      <p className="font-geistSans">
        Productos
      </p>

      <ProductList />
    </div>
  );
}