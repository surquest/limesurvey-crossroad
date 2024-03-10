
import { useState, useEffect } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Table from '@/components/table';
import AccessController from '@/utils/access.controller';



const AccessHistory = () => {

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  

  useEffect(() => {
    setOpen(AccessController.hasHistoricalAccess());
  }, [AccessController.hasHistoricalAccess()]);

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
                <Typography
                  variant="button" display="block" gutterBottom
                >
                  Historie přístupů
                </Typography>
              </AccordionSummary>
              {
                rows.length > 0 &&
                  <AccordionDetails>
                    <AccordionDetails>
                      <Table/>
                    </AccordionDetails>
                  </AccordionDetails>
              }

            </Accordion>
        );



}

export default AccessHistory;