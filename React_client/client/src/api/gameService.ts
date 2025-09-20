import api from './axios';

export interface Game {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export const gameService = {
  // Get all games
  getAllGames: async (): Promise<Game[]> => {
    const response = await api.get('/admin/games');
    return response.data;
  },

  // Get game by ID
  getGameById: async (id: string): Promise<Game> => {
    const response = await api.get(`/admin/games/${id}`);
    return response.data;
  },

  // Create new game
  createGame: async (game: Omit<Game, 'id'>): Promise<Game> => {
    const response = await api.post('/admin/games', game);
    return response.data;
  },

  // Update game
  updateGame: async (id: string, game: Omit<Game, 'id'>): Promise<Game> => {
    const response = await api.put(`/admin/games/${id}`, game);
    return response.data;
  },

  // Delete game
  deleteGame: async (id: string): Promise<void> => {
    await api.delete(`/admin/games/${id}`);
  }
};