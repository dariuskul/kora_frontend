import { Box, Button, Paper, Typography } from '@mui/material';
import { EmailSendForm } from 'components/forms/EmailSendForm';
import { NotificationsForm } from 'components/forms/NotificationsForm';
import { SelectInput } from 'components/inputs/Select';
import { EditUserModal } from 'components/tracking/modals/EditUserModal';
import React, { useState } from 'react';
import { Form } from "react-final-form";

export const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <Paper>
      <Box p="1rem 0.5rem">
        <Box mb="1rem" alignItems="center" justifyContent="space-between" display="flex">
          <Typography fontSize="2rem" variant="h3">
            Settings
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="1.5rem" variant="h3">
            Timer
          </Typography>
          <Box flexDirection="column" display="flex" mt="0.5rem">
            <NotificationsForm />
          </Box>
        </Box>
        <Box mt="1rem">
          <Typography fontSize="1.5rem" variant="h3">
            Notifications
          </Typography>
          <EmailSendForm />
        </Box>
        <Box mt="1.5rem">
          <Button onClick={() => setOpen(true)}>
            Edit profile
          </Button>
        </Box>
      </Box>
      <EditUserModal open={open} setOpen={setOpen} />
    </Paper>
  )
}
