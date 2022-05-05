import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserStatistics } from 'pages/reports/components/pages/systemReport/components/UserItem/components/UserStatistics';

interface IUserItem {
  last6Months: any;
  name: string;
  topProjects: Array<any>;
  totalTracked: string;
}

export const UserItem: React.FC<IUserItem> = ({ last6Months, name, topProjects, totalTracked }) => {
  const [open, setOpen] = useState(false);

  return (
    <Accordion expanded={open} onChange={() => setOpen(prev => !prev)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography fontWeight="500" fontSize="1.25rem">{name.toLocaleUpperCase()}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <UserStatistics last6Months={last6Months} topProjects={topProjects} totalTracked={totalTracked} />
      </AccordionDetails>
    </Accordion>
  )

}