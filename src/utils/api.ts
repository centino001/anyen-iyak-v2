const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

export const fetchProjects = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }
    const data = await response.json();
    return data.projects || data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchPeople = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/people`);
    if (!response.ok) {
      throw new Error(`Failed to fetch people: ${response.status}`);
    }
    const data = await response.json();
    return data.people || data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

export const fetchPeopleByDepartment = async (department: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/people?department=${encodeURIComponent(department)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch people: ${response.status}`);
    }
    const data = await response.json();
    return data.people || data;
  } catch (error) {
    console.error('Error fetching people by department:', error);
    throw error;
  }
};

export const submitVolunteerApplication = async (volunteerData: any): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteers`, {
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