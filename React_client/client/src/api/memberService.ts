import api from './axios';

export interface Member {
  id?: string;
  name: string;
  balance: number;
  phone: string;
}

export const memberService = {
  // Get all members
  getAllMembers: async (): Promise<Member[]> => {
    const response = await api.get('/members');
    return response.data;
  },

  // Get member by ID
  getMemberById: async (id: string): Promise<Member> => {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  // Create new member
  createMember: async (member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await api.post('/members', member);
    return response.data;
  },

  // Update member
  updateMember: async (id: string, member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await api.put(`/members/${id}`, member);
    return response.data;
  },

  // Delete member
  deleteMember: async (id: string): Promise<void> => {
    await api.delete(`/members/${id}`);
  }
};