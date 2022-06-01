import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserStatistics } from 'pages/reports/components/pages/systemReport/components/UserItem/components/UserStatistics';

interface IUserItem {
  project: any;
  weeklyEntries: any;
}

export const UserItem: React.FC<IUserItem> = ({ project, weeklyEntries }) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion expanded={open} onChange={() => setOpen(prev => !prev)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography fontWeight="500" fontSize="1.25rem">{project.name.toLocaleUpperCase()}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <UserStatistics weeklyEntries={weeklyEntries[0]} />
      </AccordionDetails>
    </Accordion>
  )

}