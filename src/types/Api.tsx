type ApiErrorResponse = {
    response: {
      data: {
        message: string | string[];
      };
    };
  };
  
export function isApiErrorType(error: unknown): error is ApiErrorResponse {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error
    ) {
      const response = (error as { response: unknown }).response;
  
      if (
        typeof response === 'object' &&
        response !== null &&
        'data' in response
      ) {
        const data = (response as { data: unknown }).data;
  
        if (
          typeof data === 'object' &&
          data !== null &&
          'message' in data
        ) {
          const message = (data as { message: unknown }).message;
          return (
            typeof message === 'string' ||
            (Array.isArray(message) && message.every(m => typeof m === 'string'))
          );
        }
      }
    }
  
    return false;
  }
  