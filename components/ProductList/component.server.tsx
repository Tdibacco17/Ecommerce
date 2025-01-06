import { GetSheetData } from "@/app/actions"
import ProductListClient from "./component.client"

export default async function ProductList() {
    const data = await GetSheetData()

    return <ProductListClient data={data} />
}