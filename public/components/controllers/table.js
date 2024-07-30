var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function renderTable(arrayTable, currentPage, recordsPerPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const startIndex = (currentPage - 1) * recordsPerPage; // índice incial -> para la definir la paginación.
        const finalIndex = startIndex + recordsPerPage; // índice final.
        const paginatedData = arrayTable.slice(startIndex, finalIndex); // divide la tabla en cierta porción, (según la indicada en el índice de inicio y el índice final).
        // columns names from the first row if they are avaliable.
        const columnNames = arrayTable.length > 0 ? Object.keys(arrayTable[0]) : []; // recorre la tabla y asigna como keys todos los valores en la posición 0 (títulos).
        return `
        <table class="table table-stripped"> 
            <thead>
                ${columnNames.map(value => `
                    <th scope="col">${value}</th>
                    `).join('')}
            </thead>
            <tbody>
                    ${paginatedData.map(row => `
                        <tr>
                            ${columnNames.map(columnName => `
                                <td>
                                    ${row[columnName] || ''} 
                                </td>
                            `).join('')}
                        </tr>
                        `).join('')}
            </tbody>
        </table>
    
    `;
    });
}
// '${row[columnName] || ''}' por cada iteración trae una key con su respectivo valor. 
