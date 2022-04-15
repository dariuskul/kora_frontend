export const getErrorMessage = (error: unknown) => {
  if (typeof error === 'string') {
    return String(error);
  }

  if ((error as any).response) {
    return (error as any).response.data.message
  }


  return 'Something went wrong';
}