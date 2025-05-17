// const API_BASE_URL = "https://pahal-backend.vercel.app/api";
const API_BASE_URL = "http://localhost:5000/api"; // Uncomment for local development

export const apiService = {
  // Method to get the authentication token from localStorage
  getToken: () => {
    return localStorage.getItem("token");
  },
  
  // Generic method to make authenticated API requests
  request: async (endpoint, method = "GET", data = null) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = apiService.getToken();
    
    const headers = {
      "Content-Type": "application/json",
    };
    
    // Add authorization header if token exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const config = {
      method,
      headers,
    };
    
    // Add body for POST, PUT, PATCH requests
    if (data && ["POST", "PUT", "PATCH"].includes(method)) {
      config.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(url, config);
      const result = await response.json();
      
      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401) {
          // Clear localStorage and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("admin");
          window.location.href = "/login";
          throw new Error("Session expired. Please login again.");
        }
        
        throw new Error(result.message || "API request failed");
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  },
  
  // Helper methods for common HTTP methods
  get: (endpoint) => {
    return apiService.request(endpoint, "GET");
  },
  
  post: (endpoint, data) => {
    return apiService.request(endpoint, "POST", data);
  },
  
  put: (endpoint, data) => {
    return apiService.request(endpoint, "PUT", data);
  },
  
  patch: (endpoint, data) => {
    return apiService.request(endpoint, "PATCH", data);
  },
  
  delete: (endpoint) => {
    return apiService.request(endpoint, "DELETE");
  }
};

export default apiService;