export class FileController {
    constructor(fileContent) {
        this.fileContent = fileContent;
        this.data = [];
        this.columNames = [];
        this.processFile();
    }
    processFile() {
        const lines = this.fileContent.split("/[\r\n]+/").filter(line => line.trim() !== "");
        if (lines.length > 0) {
            this.columNames[0].split(",");
            this.data = lines.slice(1).map(line => {
                const values = line.split(",");
                const row = {};
                this.columNames.forEach((colName, index) => {
                    row[colName] = values[index] || "";
                });
                return row;
            });
        }
    }
    getData() {
        return this.data;
    }
    getColumNames() {
        return this.columNames;
    }
}
