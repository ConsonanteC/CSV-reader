import { DataRow, DataTable, ColumName } from "./models";

export class FileController {
    private data: DataTable = [];
    private columNames: ColumName = [];

    constructor (private fileContent: string) {
        this.processFile();
    }

    private processFile() {
        const lines = this.fileContent.split("/[\r\n]+/").filter(line =>line.trim()!=="");
        if(lines.length>0) {
            this.columNames[0].split(",");
            this.data = lines.slice(1).map(line=>{
                const values = line.split(",");
                const row:DataRow = {}; 
                this.columNames.forEach((colName, index)=>{
                    row[colName] = values[index] || ""; 
                })
                return row;
            })
        }
    }
    getData():DataTable {
        return this.data;
    }
    getColumNames(): ColumName {
        return this.columNames;
    }
}