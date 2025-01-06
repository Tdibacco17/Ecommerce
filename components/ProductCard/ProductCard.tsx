import { ProductInterface } from "@/types";
import Image from "next/image";

export default function ProductCard({
    product,
    handleProductSelect
}: {
    product: ProductInterface,
    handleProductSelect: (productItem: ProductInterface) => void
}) {
    return (
        <div
            onClick={() => handleProductSelect(product)}
            className="cursor-pointer border-[1px] border-white/20 rounded-md flex flex-row justify-between gap-4 relative overflow-hidden">
            <div className="min-h-36 flex flex-col justify-between p-4">
                <div>
                    <p className="text-base">{product.name}</p>
                    <p className="text-sm">{product.description}</p>
                </div>
                <p className="text-sm">{`$${product.price}`}</p>
            </div>
            {/* Imagen */}
            <div className="bg-white/20 w-36 h-full select-none relative">
                <Image
                    src={`/assets/images/${product.id}/image.jpg`}
                    alt="img"
                    height={768}
                    width={1024}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 bg-transparent w-full h-full" />
            </div>
        </div>
    )
}