var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FileController } from "./models/fileControllers.js";
import { renderTable } from "./controllers/table.js";
import { filterData } from "./controllers/filter.js";
import { convertCsv, downloadCSV } from "./controllers/download.csv.js";
const cvsForm = document.querySelector('#csvForm');
const cvsFile = document.querySelector('#csvFile');
const searchInput = document.querySelector('#searchInput');
const downloadButton = document.querySelector('#downloadCSV');
const displayArea = document.querySelector('#displayArea');
const paginationSettings = document.querySelector("#paginationControls");
const recordsPerPage = 15;
let currentPage = 1;
let finalValues = []; // se almacenan todos los valores que se van obteniendo. 
let columnNames = [];
// paginación 
function pagination(totalRecords, currentPage, recordsPerPage) {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const maxButtons = 10;
    let paginationHTML = '<ul class="pagination">';
    if (currentPage > 1) {
        paginationHTML += ` <li class="page-item"><a class="page-link" data-page="1" href="#">start</a></li>`;
    }
    if (currentPage > 1) {
        paginationHTML += ` <li class="page-item"><a class="page-link" data-page="${currentPage - 1}" href="#">previous</a></li>`;
    }
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let finalPage = Math.min(totalPages, currentPage + Math.floor(maxButtons / 2));
    for (let i = startPage; i <= finalPage; i++) {
        paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
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
    cvsForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        const csvReader = new FileReader();
        const input = cvsFile.files[0]; // ! -> no será nulo.
        const fileName = input.name; // se busca el nombre del archivo.
        const fileExtension = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase(); // ? -> no será indefinido. Se extrae la extensión del archivo.
        if (fileExtension !== 'csv' && fileExtension !== 'txt') {
            alert('select a .csv or .txt file.');
            return;
        }
        csvReader.onload = function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                const text = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                const fileController = new FileController(text); // se instancia la clase con el archivo interpretado.
                finalValues = fileController.getData();
                columnNames = fileController.getColumNames();
                yield renderTableControls();
            });
        };
        csvReader.readAsText(input);
    }));
    // download csv file.
    downloadButton.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const filteredValues = filterData(finalValues, searchInput.value);
        const csvData = yield convertCsv(filteredValues, columnNames);
        yield downloadCSV(csvData, 'filtered_data.csv');
    }));
    // búsqueda 
    searchInput.addEventListener('input', () => __awaiter(void 0, void 0, void 0, function* () {
        yield renderTableControls();
    }));
});
// renderizar la tabla y añadir los controles.
function renderTableControls() {
    return __awaiter(this, void 0, void 0, function* () {
        // search.
        const searchTerm = searchInput.value;
        const filteredValues = filterData(finalValues, searchTerm);
        //render with filtered values.
        const tableHTML = yield renderTable(filteredValues, currentPage, recordsPerPage);
        displayArea.innerHTML = tableHTML;
        // pagination.
        const paginationControls = pagination(filteredValues.length, currentPage, recordsPerPage);
        paginationSettings.innerHTML = paginationControls;
        // number buttons.
        document.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', (event) => {
                const targetPage = Number(event.target.dataset.page);
                if (targetPage) {
                    currentPage = targetPage;
                    renderTableControls();
                }
            });
        });
    });
}
