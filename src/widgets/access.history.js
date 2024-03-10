
import { useState } from 'react';

import { DataGrid, csCZ  } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import AccessController from '@/utils/access.controller';



const AccessHistory = () => {

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
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
    { field: 'survey', headerName: 'Průzkum', flex: 2},
    { field: 'access', headerName: 'Přístup', flex: 2},
    { field: 'dateTime', headerName: 'Datum a čas', flex: 1},
    { 
      field: 'link', 
      headerName: 'Odkaz', 
      flex: 1,
      renderCell: (params) => (
        <Button href={params.value}>přístup</Button>
      )
    },
  ];

  const toggle = (open) => (event) => {
    setRows(AccessController.getAccesses());
    setOpen(open);
  };


    return(
            <Accordion
              expanded={open}
              sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
              }}
            >
              <AccordionSummary
                onClick={toggle(!open)}
                expandIcon={<ArrowDropUpIcon />}
                aria-controls="historical-access-content"
                id="historical-access-header"
              >
                <Button 
                  variant="outlined" 
                  size="small"
                  disabled={!AccessController.hasHistoricalAccess()}
                >
                  Historie přístupů
                </Button>
              </AccordionSummary>
              {
                rows.length > 0 &&
                  <AccordionDetails>
                    <AccordionDetails>
                          <DataGrid 
                            density={"compact"} 
                            rows={rows}
                            columns={columns} 
                            localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
                            disableRowSelectionOnClick
                          />
                    </AccordionDetails>
                  </AccordionDetails>
              }

            </Accordion>
        );



}

export default AccessHistory;