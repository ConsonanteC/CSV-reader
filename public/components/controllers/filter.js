export function filterData(arrayTable, searchTerm) {
    if (!searchTerm)
        return arrayTable; // si no hay elemento de búsqueda, se muestra la tabla inicial (base).
    const lowerCaseTerm = searchTerm.toLowerCase();
    return arrayTable.filter(row => Object.values(row).some(cell => {
        if (cell == null)
            return false; // manejo de valores nulos - inexistentes. 
        return cell.toString().toLowerCase().includes(lowerCaseTerm); // convierte todos los valores a string y a minúscula, e incluye el parámetro de búsqueda.
    }));
}
