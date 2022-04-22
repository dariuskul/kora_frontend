import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

import { PageContainer } from "components/containers/PageContainer";
import { RegisterForm } from "components/forms/RegisterForm";
import { Toast } from "components/others/Toast";
import { getUserByVerificationToken } from "services/auth.service";
import { getErrorMessage } from "utils/error";
import { PasswordResetForm } from "components/forms/PasswordResetForm";

export const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      toast.error(<Toast message="Link does not exist" />)
      return;
    }

    const getUser = async () => {
      try {
        const user = await getUserByVerificationToken(token);
        setUser(user.data);
      } catch (error) {
        const err = getErrorMessage(error);
        toast.error(<Toast message={err} />)
      }

    }
    getUser();

  }, [])

  if (!user) {
    return null;
  }
  return (
    <PageContainer>
      <Box width="100%" minHeight="inherit" display="flex" justifyContent="center" alignItems="center">
        <PasswordResetForm email={user.email} />
      </Box>
    </PageContainer>
  )
}
