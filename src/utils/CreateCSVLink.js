import { CSVLink } from 'react-csv';
import React from 'react';

export function CreateCSVLink(columns, data) {
  const columnHeaderObjects = [];

  // expose the actual data columns below the top level headers
  columns.map(header => columnHeaderObjects.push(...header.columns));

  const accountArray = data.map(line => {
    return columnHeaderObjects.map(headerObject => line[headerObject.accessor]);
  });

  const csvData = [
    ['Maturity'],
    columnHeaderObjects.map(column => column.Header),
    ...accountArray
  ];

  return <CSVLink data={csvData}>Download CSV</CSVLink>;
}
