'use server'
import { sheets } from '@/lib/googleSheets';
import { ProductInterface } from '@/types';

export type SheetRow = string[];
export type SheetData = SheetRow[];

export type ApiResponse = { success: boolean, message: string }

export const GetSheetData = async (): Promise<ProductInterface[] | undefined> => {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) throw new Error(`SPREADSHEET_ID is not defined.`);

    const range = 'productos!A:Z';

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        // Filtrar las filas que no estén vacías
        const rows = response.data.values || [];
        const filteredData: SheetRow[] = rows.slice(1).filter(row => row.some(cell => cell.trim() !== ''));

        if (filteredData.length === 0) throw new Error(`No products found.`);

        const products: ProductInterface[] = filteredData.map(row => ({
            id: row[0],
            name: row[1],
            description: row[2],
            price: parseFloat(row[3]),
            stock: parseInt(row[4]),
        }));

        return products;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return undefined
    }
}
