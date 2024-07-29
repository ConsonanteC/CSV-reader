// Blob -> objeto binario inmutable tipado (extensión).
// URL.createObject() -> recibe un Blob como parámetro para crear una url. 

import { DataRow, ColumnName } from "../models/models"; // se manipula lo que compone a la tabla.

export async function convertCsv(data : DataRow[], columNames : ColumnName) : Promise <string> {
    const csvRows = [];

    // add headers (nombres de las columnas).
    csvRows.push(columNames.join(',')); // añade los nombres de las columnas en el arreglo, unidos y separados por comas.

    // add data rows (líneas).
    data.forEach(row => {
        const values = columNames.map(column => row[column] || ''); // se recorre, y por cada índice se asgina el valor de la columna. 
        csvRows.push(values.join(''));
    })

    return csvRows.join('\n'); // une las filas por saltos de líneas. 
}

export async function downloadCSV(csvContent : string, fileName : string) {
    // blob
    const blob = new Blob([csvContent], {type : 'text/csv;charset=UTF-8'}); // construcción del 'blob'.
    // link
    const link = document.createElement('a');
    // url
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    // add html
    document.body.appendChild(link);
    // trigger
    link.click();
    // remove from html
    document.body.removeChild(link);
}