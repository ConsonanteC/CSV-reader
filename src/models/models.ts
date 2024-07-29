export interface DataRow { // componne cada fila, dándole formato de clave/valor
    [key:string]:string
};

export type DataTable = DataRow[]; // compone la tabla, dándole formato de filas ( DataRow )

export type ColumnName = string[]; // compondrá las columnas, títulos