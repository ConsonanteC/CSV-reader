import { DataTable } from "../models/models"; // archivo al que se le hará la búsqueda.

export function filterData(arrayTable : DataTable, searchTerm : string) : DataTable {
    if (!searchTerm) return arrayTable; // si no hay elemento de búsqueda, se muestra la tabla inicial (base).
    const lowerCaseTerm = searchTerm.toLowerCase();
    return arrayTable.filter(row => 
        Object.values(row).some(cell => { // se busca celda por celda para filtrar, según el parámetro de búsqueda.
            if (cell == null) return false; // manejo de valores nulos - inexistentes. 
            return cell.toString().toLowerCase().includes(lowerCaseTerm); // convierte todos los valores a string y a minúscula, e incluye el parámetro de búsqueda.
        })
    );
}