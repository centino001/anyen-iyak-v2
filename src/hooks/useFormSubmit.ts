import { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface SubmitOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const useFormSubmit = () => {
  const { admin } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (
    url: string,
    formData: FormData,
    method: 'POST' | 'PUT' = 'POST',
    options: SubmitOptions = {}
  ) => {
    setIsSubmitting(true);
    try {
      if (!admin?.token) {
        throw new Error('No authentication token found');
      }

      console.log(`Submitting form to ${url} with method ${method}`);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${admin.token}`,
          // Don't set Content-Type header - browser will set it automatically with boundary for multipart/form-data
        },
        body: formData,
      });

      const responseData = await response.json().catch(() => null);
      
      if (!response.ok) {
        console.error('Form submission failed:', responseData);
        
        // Extract error message from response
        let errorMessage = 'Failed to submit form';
        if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        } else if (responseData?.errors && Array.isArray(responseData.errors)) {
          errorMessage = responseData.errors.join(', ');
        } else if (response.statusText) {
          errorMessage = `Failed to submit form: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      console.log('Form submission successful:', responseData);
      options.onSuccess?.();
      return responseData;
    } catch (error) {
      console.error('Form submission error:', error);
      options.onError?.(error as Error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting,
  };
};

export default useFormSubmit; 