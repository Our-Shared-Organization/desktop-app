export const decodeJWT = (token: string): any | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  
  if (!payload || !payload.exp) {
    // expired token
    return true;
  }
  
  // JWT exp is in seconds, Date.now() is in milliseconds
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  
  return currentTime >= expirationTime;
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }
  
  return !isTokenExpired(token);
};
