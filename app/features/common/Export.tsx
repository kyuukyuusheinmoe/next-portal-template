import React from 'react'
import * as XLSX from 'xlsx-js-style';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ColumnProps, KeyValueObject } from '@/app/types/common';
import { processTableData } from '@/app/utils/table.utils';

export type ExportProps = {
    title: string;
    columns: ColumnProps[],
    data: KeyValueObject[]
}

const Export = ({columns, data, title}: ExportProps) => {
  const handleExport = () => {
    const processedData = processTableData(columns, data);
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    // updated the font for first row.
    columns.forEach((col, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 }); // Get cell address
      if (!worksheet[cellAddress]) worksheet[cellAddress] = {}; // Ensure the cell object exists
      worksheet[cellAddress].v = col.label; // Set the value to the header text
      worksheet[cellAddress].s = {
        // Set the style object
        wpx: col.label?.length || 20,
        font: { bold: true },
      };
    });

    const columnWidths = columns.map((col) => ({ wch: col.label.length + 10 }));
    worksheet['!cols'] = columnWidths;

    // Create a new workbook and append the styled worksheet
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');

    // Write the new file
    XLSX.writeFile(newWorkbook, `${title}.xlsx`);
  }

  return (
    <div>
        <button type="button" className="btn btn-primary py-2 text-sm" onClick={handleExport}><ArrowDownTrayIcon className="w-6 "/>Export</button>
    </div>
  )
}

export default Export
