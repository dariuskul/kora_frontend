import React, { useState } from "react";
import { Box, Paper } from "@mui/material";

import moment from "moment";

import { useAppSelector } from "store/selectors";
import { AccordionItem } from "pages/tracking/timer/components/AccordionItem";
import { EditTimesModal } from "components/tracking/modals/EditTimesModal";

interface IStatistics {
  entries?: any;
}

export const Statistics: React.FC<IStatistics> = ({ entries }) => {
  const { timeEntries } = useAppSelector((s) => s.tasksState);
  const [openEdit, setOpenEdit] = useState(false);
  const formattedTimeEntries = entries || timeEntries;
  if (!timeEntries.length) {
    return null;
  }
  return (
    <Box marginTop="4rem">
      <Paper>
        <Box
          padding="1.5rem 1rem"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
        >
          {formattedTimeEntries.map((timeEntry: any) => (
            <div key={timeEntry.week}>
              <AccordionItem
                summaryTitle={`${moment(new Date(timeEntry.startDate)).format(
                  "MMM DD"
                )} - ${moment(new Date(timeEntry.endDate)).format("MMM DD")}`}
                projectEntries={timeEntry.projectEntries}
              />
            </div>
          ))}
          <EditTimesModal open={openEdit} setOpen={setOpenEdit} data="test" />
        </Box>
      </Paper>
    </Box>
  );
};
