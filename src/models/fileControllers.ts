import { DataRow, DataTable, ColumnName } from "./models"; 

export class FileController { 
    private data : DataTable = []; 
    private columNames : ColumnName = []; 

    constructor (private fileContent : string) { 
        this.processFile(); 
    };

    private processFile() {
        const lines : string[] = this.fileContent.split(/[\r\n]+/).filter(line => line.trim()!=='');
        if (lines.length > 0) { 
            this.columNames = lines[0].split(','); 
            this.data = lines.slice(1).map(line => { 
                const values = line.split(','); 
                const row : DataRow = {}; 
                this.columNames.forEach((colName, index) => { 
                    row[colName] = values[index] || '';
                });
                return row; 
            });
        }
    }

    getData() : DataTable { 
        return this.data
    }

    getColumNames() : ColumnName {
        return this.columNames
    }
}