import api from './axios';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test games endpoint
    const gamesResponse = await api.get('/admin/games');
    console.log('Games API Response:', gamesResponse.status, gamesResponse.data);
    
    // Test members endpoint
    const membersResponse = await api.get('/members');
    console.log('Members API Response:', membersResponse.status, membersResponse.data);
    
    return {
      success: true,
      gamesStatus: gamesResponse.status,
      membersStatus: membersResponse.status,
      gamesData: gamesResponse.data,
      membersData: membersResponse.data
    };
  } catch (error) {
    console.error('API Connection Test Failed:', error);
    return {
      success: false,
      error: error
    };
  }
};
