import { DataTable } from "../models/models";

export async function renderTable(arrayTable : DataTable, currentPage : number, recordsPerPage : number) : Promise <string> {

    const startIndex = (currentPage -1) * recordsPerPage; // índice incial -> para la definir la paginación.
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
                            ` ).join('')}
                        </tr>
                        `).join('')}
            </tbody>
        </table>
    
    `
}

// '${row[columnName] || ''}' por cada iteración trae una key con su respectivo valor. 