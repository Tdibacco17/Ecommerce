'use client'
import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect, useRef, useState } from "react";

export default function ProductSheet() {
    const { productSelected, setProductSelected } = useGlobalContext();
    const sheetRef = useRef<HTMLDivElement | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (productSelected && sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        if (productSelected) { document.addEventListener("mousedown", handleClickOutside); }
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, [productSelected, setProductSelected]);

    const handleClose = () => {
        if (!isClosing) {
            setIsClosing(true);
            closeTimeoutRef.current = setTimeout(() => {
                setIsClosing(false);
                setProductSelected(null);
            }, 300);
        }
    };

    useEffect(() => {
        if (productSelected) {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
            }
            setIsClosing(false);
        }
    }, [productSelected]);

    return (
        <>
            <div className={`${(productSelected && !isClosing)
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
                } w-full h-full bg-black/80 fixed top-0 left-0 transition duration-300`} />

            <div
                ref={sheetRef}
                className={`${(productSelected && !isClosing)
                    ? "right-0 pointer-events-auto"
                    : "-right-96 pointer-events-none"
                    } fixed top-0  bg-black border-l-white/20 border-l-[1px] w-96 h-full transition-[right] duration-300 p-4`}>
                <p onClick={handleClose} className="cursor-pointer">Cerrar</p>

                {productSelected && <div>
                    <p>{productSelected.name}</p>
                    <p>{productSelected.description}</p>
                    <p>{productSelected.price}</p>
                    <p>{productSelected.stock}</p>
                    <div>
                    </div>
                </div>}
            </div>
        </>
    )
}