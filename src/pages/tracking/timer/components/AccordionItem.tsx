import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import { IDayEntry } from 'store/types/Task';
import { DayEntry } from 'pages/tracking/timer/components/DayEntry';

interface IAccordionItem {
  summaryTitle: string;
  projectEntries: Array<IDayEntry>;
}

export const AccordionItem: React.FC<IAccordionItem> = React.memo(({ summaryTitle, projectEntries }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <Accordion expanded={expanded} onChange={() => setExpanded(prev => !prev)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontSize="1.5rem">
            {summaryTitle}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {projectEntries?.map((projectEntry, idx) => (
            <Box key={`${projectEntry.day}_projectEntry`}>
              <DayEntry day={projectEntry.day} times={projectEntry.projectEntries} />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  )
});