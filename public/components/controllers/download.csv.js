// Blob -> objeto binario inmutable tipado (extensión).
// URL.createObject() -> recibe un Blob como parámetro para crear una url. 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function convertCsv(data, columNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const csvRows = [];
        // add headers (nombres de las columnas).
        csvRows.push(columNames.join(',')); // añade los nombres de las columnas en el arreglo, unidos y separados por comas.
        // add data rows (líneas).
        data.forEach(row => {
            const values = columNames.map(column => row[column] || ''); // se recorre, y por cada índice se asgina el valor de la columna. 
            csvRows.push(values.join(''));
        });
        return csvRows.join('\n'); // une las filas por saltos de líneas. 
    });
}
export function downloadCSV(csvContent, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        // blob
        const blob = new Blob([csvContent], { type: 'text/csv;charset=UTF-8' }); // construcción del 'blob'.
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
    });
}
