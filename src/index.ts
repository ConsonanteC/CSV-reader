import { FileController } from "./models/fileControllers.js";
import { renderTable } from "./controllers/table.js";
import { filterData } from "./controllers/filter.js";
import { ColumnName, DataRow } from "./models/models.js";
import { convertCsv, downloadCSV } from "./controllers/download.csv.js";

const cvsForm = <HTMLFormElement> document.querySelector('#csvForm');
const cvsFile = <HTMLInputElement> document.querySelector('#csvFile');
const searchInput = <HTMLInputElement> document.querySelector('#searchInput');
const downloadButton = <HTMLButtonElement> document.querySelector('#downloadCSV');
const displayArea = <HTMLDivElement> document.querySelector('#displayArea');
const paginationSettings = document.querySelector("#paginationControls");

const recordsPerPage = 15;
let currentPage = 1;
let finalValues : DataRow[] = []; // se almacenan todos los valores que se van obteniendo. 
let columnNames : ColumnName = []; 

// paginación 
function pagination(totalRecords : number, currentPage : number, recordsPerPage : number) : string { // retorna string porque se devuelven líneas de HTML.
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const maxButtons = 10;
    let paginationHTML = '<ul class="pagination">';

    if (currentPage > 1) {
        paginationHTML += ` <li class="page-item"><a class="page-link" data-page="1" href="#">start</a></li>`;
    }
    if (currentPage > 1) {
        paginationHTML += ` <li class="page-item"><a class="page-link" data-page="${currentPage - 1}" href="#">previous</a></li>`;
    }
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons/2));
    let finalPage = Math.min(totalPages, currentPage + Math.floor(maxButtons/2));

    for (let i = startPage; i <= finalPage; i++) {
        paginationHTML +=  `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" data-page="${i}" href="#">${i}</a>
            </li>
        `;
    }
    if (currentPage < totalPages) {
        paginationHTML += ` <li class="page-item"><a class="page-link" data-page="${currentPage + 1}" href="#">next</a></li>`;
    }
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}" href="#">end</a></li>`;
    }

    paginationHTML += '</ul>';

    return paginationHTML;
}

document.addEventListener('DOMContentLoaded', () => {

    // upload csv file.
    cvsForm.addEventListener('submit', async (event : Event) => {
        event.preventDefault();

        const csvReader = new FileReader();
        const input = cvsFile.files![0]; // ! -> no será nulo.
        const fileName = input.name; // se busca el nombre del archivo.
        const fileExtension = fileName.split('.').pop()?.toLowerCase(); // ? -> no será indefinido. Se extrae la extensión del archivo.

        if (fileExtension !== 'csv' && fileExtension !== 'txt') {
            alert('select a .csv or .txt file.');
            return;
        }

        csvReader.onload = async function(event) {
            const text = event.target?.result as string;
            const fileController = new FileController(text); // se instancia la clase con el archivo interpretado.
            finalValues = fileController.getData();
            columnNames = fileController.getColumNames();

            await renderTableControls();
        }

        csvReader.readAsText(input);
    });

    // download csv file.
    downloadButton.addEventListener('click', async (event : Event) => {
        event.preventDefault();
        const filteredValues = filterData(finalValues, searchInput.value);
        const csvData = await convertCsv(filteredValues, columnNames);
        await downloadCSV(csvData, 'filtered_data.csv');
    });

    // búsqueda 
    searchInput.addEventListener('input', async() => {
        await renderTableControls();
    });
})

// renderizar la tabla y añadir los controles.
async function renderTableControls(){

    // search.
    const searchTerm = searchInput.value;
    const filteredValues = filterData(finalValues, searchTerm);

    //render with filtered values.
    const tableHTML = await renderTable(filteredValues, currentPage, recordsPerPage);
    displayArea.innerHTML = tableHTML;

    // pagination.
    const paginationControls = pagination(filteredValues.length, currentPage, recordsPerPage);
    paginationSettings!.innerHTML = paginationControls;

    // number buttons.
    document.querySelectorAll('.page-link').forEach(button => {
        button.addEventListener('click', (event : Event) => {
            const targetPage = Number((event.target as HTMLElement).dataset.page);
            if (targetPage) {
                currentPage = targetPage;
                renderTableControls();
            }
        })
    })
}
 