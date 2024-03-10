import { useState } from 'react';
import { DataGrid, csCZ, GridToolbarContainer } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AccessController from '@/utils/access.controller';

const Table = () => {

    // State variables
    const [rows, setRows] = useState(AccessController.getAccesses()); // State for table rows
    const [selected, setSelected] = useState([]); // State for selected rows

    // Table columns configuration
    const columns = [
        {
            field: 'id',
            headerName: '',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            widht: 50,
            renderCell: (params) => (
                <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                        AccessController.deleteAccess(params.value);
                        setRows(AccessController.getAccesses());
                    }}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            )
        },
        { field: 'survey', headerName: 'Průzkum', flex: 2 },
        { field: 'access', headerName: 'Přístup', flex: 2 },
        { field: 'dateTime', headerName: 'Datum a čas', flex: 1 },
        {
            field: 'link',
            headerName: 'Odkaz',
            flex: 1,
            renderCell: (params) => (
                <Button href={params.value}>přístup</Button>
            )
        },
    ];

    // Handle row selection
    const handleSelection = (selection) => {
        setSelected(selection);
    }

    // Custom toolbar for the table
    const getToolbar = () => {
        return (
            <GridToolbarContainer>
                <Button
                    variant="text"
                    onClick={() => {
                        AccessController.clearAccesses();
                        setRows(AccessController.getAccesses());
                    }}
                >
                    Smazat vše
                </Button>
                <Button
                    variant="text"
                    disabled={selected.length === 0}
                    onClick={() => {
                        selected.forEach((id) => {
                            AccessController.deleteAccess(id);
                        });
                        setRows(AccessController.getAccesses());
                    }}
                >
                    Smazat vybrané
                </Button>
            </GridToolbarContainer>
        )
    }

    // Render the table component
    return (
        <DataGrid
            density={"compact"}
            rows={rows}
            columns={columns}
            localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
            onRowSelectionModelChange={handleSelection}
            slots={{
                toolbar: getToolbar,
            }}
            checkboxSelection
            disableRowSelectionOnClick
        />
    )

}

export default Table;
