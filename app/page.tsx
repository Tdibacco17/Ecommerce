import { GetSheetData } from "./actions";
import { ProductInterface } from "@/types";

export default async function Home() {
  const data = await GetSheetData()

  return (
    <div>
      <p className="font-geistSans">
        Productos
      </p>
      <div className="flex gap-10 ">
        {data && data.map((productItem: ProductInterface) => {
          return (
            <div key={productItem.id}>
              <p>{productItem.name}</p>
              <p>{productItem.description}</p>
              <p>{productItem.price}</p>
              <p>{productItem.stock}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}