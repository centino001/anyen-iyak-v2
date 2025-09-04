const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Cache for API responses
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
const getCachedData = (key: string) => {
  const cached = apiCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (key: string, data: any) => {
  apiCache.set(key, { data, timestamp: Date.now() });
};

// Helper function for API requests with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

export const fetchProjects = async (): Promise<any[]> => {
  const cacheKey = 'projects';
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }
    const data = await response.json();
    const projects = data.projects || data;
    
    // Cache the result
    setCachedData(cacheKey, projects);
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchPeople = async (): Promise<any[]> => {
  const cacheKey = 'people';
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/people`);
    if (!response.ok) {
      throw new Error(`Failed to fetch people: ${response.status}`);
    }
    const data = await response.json();
    const people = data.people || data;
    
    // Cache the result
    setCachedData(cacheKey, people);
    
    return people;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

export const fetchPeopleByDepartment = async (department: string): Promise<any[]> => {
  const cacheKey = `people-${department}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/people?department=${encodeURIComponent(department)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch people: ${response.status}`);
    }
    const data = await response.json();
    const people = data.people || data;
    
    // Cache the result
    setCachedData(cacheKey, people);
    
    return people;
  } catch (error) {
    console.error('Error fetching people by department:', error);
    throw error;
  }
};

export const submitVolunteerApplication = async (volunteerData: any): Promise<any> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/volunteers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to submit volunteer application: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting volunteer application:', error);
    throw error;
  }
};

// Function to clear cache (useful for admin operations)
export const clearApiCache = () => {
  apiCache.clear();
};

// Function to clear specific cache entry
export const clearCacheEntry = (key: string) => {
  apiCache.delete(key);
}; 