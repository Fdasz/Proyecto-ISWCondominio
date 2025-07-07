import { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import '@styles/table.css';

function useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange }) {
    const tableRef = useRef(null);
    const [table, setTable] = useState(null);
    const [isTableBuilt, setIsTableBuilt] = useState(false);

    // Initialize table
    useEffect(() => {
        let tabulatorTable = null;

        if (tableRef.current && data) {  // Only initialize if we have both ref and data
            const updatedColumns = [
                { 
                    formatter: "rowSelection", 
                    titleFormatter: false, 
                    hozAlign: "center", 
                    headerSort: false, 
                    cellClick: function (e, cell) {
                        cell.getRow().toggleSelect();
                    } 
                },
                ...columns
            ];

            tabulatorTable = new Tabulator(tableRef.current, {
                data: data, // Initialize with data immediately
                columns: updatedColumns,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: true,
                paginationSize: 6,
                selectableRows: 1,
                rowHeight: 46,
                langs: {
                    "default": {
                        "pagination": {
                            "first": "Primero",
                            "prev": "Anterior",
                            "next": "Siguiente",
                            "last": "Último",
                        }
                    }
                },
                initialSort: [
                    { column: initialSortName, dir: "asc" }
                ],
            });

            // Set up event listeners
            tabulatorTable.on("rowSelectionChanged", function(selectedData) {
                if (onSelectionChange) {
                    onSelectionChange(selectedData);
                }
            });

            tabulatorTable.on("tableBuilt", function() {
                setIsTableBuilt(true);
            });

            setTable(tabulatorTable);
        }

        // Cleanup
        return () => {
            if (tabulatorTable) {
                tabulatorTable.destroy();
                setIsTableBuilt(false);
                setTable(null);
            }
        };
    }, [data]); // Re-initialize when data changes

    // Handle filter changes
    useEffect(() => {
        if (table && isTableBuilt) {
            try {
                if (filter) {
                    table.setFilter(dataToFilter, "like", filter);
                } else {
                    table.clearFilter();
                }
                table.redraw(true); // Force redraw
            } catch (error) {
                console.error('Error updating table filter:', error);
            }
        }
    }, [filter, dataToFilter, table, isTableBuilt]);

    return { tableRef };
}

export default useTable;