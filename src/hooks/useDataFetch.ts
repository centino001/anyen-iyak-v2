import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

interface FetchOptions {
  isAdminRoute?: boolean;
  refreshTrigger?: boolean;
}

const useDataFetch = <T>(endpoint: string, options: FetchOptions = {}): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get admin data from localStorage if it's an admin route
        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };

        if (options.isAdminRoute) {
          const adminData = localStorage.getItem('admin');
          if (adminData) {
            const { token } = JSON.parse(adminData);
            headers['Authorization'] = `Bearer ${token}`;
          }
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
          headers
        });

        if (!response.ok) {
          // Check for specific error status
          if (response.status === 404) {
            throw new Error('Resource not found');
          } else if (response.status === 401) {
            throw new Error('Unauthorized access');
          } else if (response.status === 500) {
            throw new Error('Server error - please try again later');
          } else {
            throw new Error(`Failed to fetch data (Status: ${response.status})`);
          }
        }
        
        const result = await response.json();
        
        // Handle different response formats
        let data: T[] = [];
        if (Array.isArray(result)) {
          data = result;
        } else if (result.data) {
          data = result.data;
        } else if (result.programs) {
          data = result.programs;
        } else if (result.news) {
          data = result.news;
        } else if (result.people) {
          data = result.people;
        } else if (result.person) {
          // Handle single person response
          data = [result.person];
        } else if (result && typeof result === 'object') {
          // If the result is a single object, wrap it in an array
          data = [result];
        } else {
          console.warn('Unexpected response format:', result);
          data = [];
        }

        setState({
          data,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Fetch error:', error);
        setState({
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred while fetching data'
        });
      }
    };

    fetchData();
  }, [endpoint, options.isAdminRoute, options.refreshTrigger]);

  return state;
};

export default useDataFetch; 