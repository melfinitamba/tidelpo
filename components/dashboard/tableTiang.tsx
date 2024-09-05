"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
//   import { data, type Person } from './makeData';
// import React from "react";
import { dataTiang } from "@/lib/mock/mockTiang";
import Link from "next/link";

export default function TableTiang({ data }: { data: DataTiang[] }) {
  // const data = dataTiang;
  // create  column initial
  const columnHelper = createMRTColumnHelper<DataTiang>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      size: 10,
    }),
    columnHelper.accessor("nama", {
      header: "Nama Tiang",
      size: 120,
      Cell: ({ renderedCellValue, row }) => (
        <Link href={`/tabel/${row.original.deviceCode}`} className="">
          <Button className=" w-16 text-purple-800 bg-white hover:bg-purple-800 hover:text-white ">
            {renderedCellValue}
          </Button>
        </Link>
      ),
    }),
    columnHelper.accessor("deviceCode", {
      header: "Kode Alat",
      size: 120,
    }),
    columnHelper.accessor("lat", {
      header: "Latitude",
      size: 200,
    }),
    columnHelper.accessor("lng", {
      header: "Longitude",
      size: 200,
    }),
  ];

  // create config for export csv
  const formatDate = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Bulan dimulai dari 0
    const year = date.getFullYear().toString().slice(-2);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}-${month}-${year}--${hours}-${minutes}`;
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: `Data Tiang ${formatDate(new Date())}`,
  });

  const handleExportRows = (rows: MRT_Row<DataTiang>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  // config table
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableStickyHeader: true,
    enableStickyFooter: true,
    muiTableContainerProps: { sx: { maxHeight: "580px" } },
    initialState: {
      pagination: { pageSize: 25, pageIndex: 0 },
      sorting: [{ id: "id", desc: false }],
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          className="bg-transparent hover:bg-purple-800  text-purple-800 hover:text-white py-2 px-4 rounded"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          className="bg-transparent hover:bg-purple-800  text-purple-800 hover:text-white py-2 px-4 rounded"
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          className="bg-transparent hover:bg-purple-800  text-purple-800 hover:text-white py-2 px-4 rounded"
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          className="bg-transparent hover:bg-purple-800  text-purple-800 hover:text-white py-2 px-4 rounded"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
}
