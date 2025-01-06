'use client'
import { ProductInterface } from "@/types"
import ProductCard from "@/components/ProductCard/ProductCard"
import { useGlobalContext } from "@/context/GlobalProvider"

export default function ProductListClient({ data }: { data: ProductInterface[] | undefined }) {
    const { handleProductSelect } = useGlobalContext();

    return (
        <>
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-10">
                {data && data.map((productItem: ProductInterface) => {
                    return (
                        <ProductCard
                            key={productItem.id}
                            product={productItem}
                            handleProductSelect={handleProductSelect}
                        />
                    )
                })}
            </div>
        </>
    )
}