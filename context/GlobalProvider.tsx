'use client'
import { ProductInterface } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextProps {
    productSelected: ProductInterface | null;
    setProductSelected: (productItem: ProductInterface | null) => void;
    handleProductSelect: (productItem: ProductInterface) => void
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [openSheet, setOpenSheet] = useState<boolean>(false)
    const [productSelected, setProductSelected] = useState<ProductInterface | null>(null)

    const handleProductSelect = (productItem: ProductInterface) => {
        setProductSelected(productItem);
    }

    return (
        <GlobalContext.Provider
            value={{
                productSelected,
                setProductSelected,
                handleProductSelect,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};