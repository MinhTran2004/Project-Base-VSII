import HttpCodes from '../constants/HttpCode';

export const handleError = (statusCode: number, navigate: any) => {
  console.log('HTTP Error Code received:', statusCode);

  const errorMessage = HttpCodes[statusCode as keyof typeof HttpCodes] || 'Unexpected error occurred';
  console.log('Error Message:', errorMessage);
  
  console.error(`Error ${statusCode}: ${errorMessage}`);

  navigate(`/error?code=${statusCode}`);
  
};