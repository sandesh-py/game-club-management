import React, { useState, useEffect } from 'react';
import { gameService, Game } from '../api/gameService';
import { memberService, Member } from '../api/memberService';

function Admindashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [activeTab, setActiveTab] = useState<'games' | 'members'>('games');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Game form state
  const [gameForm, setGameForm] = useState({
    name: '',
    description: '',
    price: 0
  });

  // Member form state
  const [memberForm, setMemberForm] = useState({
    name: '',
    balance: 0,
    phone: ''
  });

  // Load data on component mount
  useEffect(() => {
    loadGames();
    loadMembers();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await gameService.getAllGames();
      setGames(data);
    } catch (err) {
      setError('Failed to load games');
      console.error('Error loading games:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await memberService.getAllMembers();
      setMembers(data);
    } catch (err) {
      setError('Failed to load members');
      console.error('Error loading members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await gameService.createGame(gameForm);
      setGameForm({ name: '', description: '', price: 0 });
      loadGames();
      setError(null);
    } catch (err) {
      setError('Failed to create game');
      console.error('Error creating game:', err);
    }
  };

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await memberService.createMember(memberForm);
      setMemberForm({ name: '', balance: 0, phone: '' });
      loadMembers();
      setError(null);
    } catch (err) {
      setError('Failed to create member');
      console.error('Error creating member:', err);
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await gameService.deleteGame(id);
        loadGames();
        setError(null);
      } catch (err) {
        setError('Failed to delete game');
        console.error('Error deleting game:', err);
      }
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await memberService.deleteMember(id);
        loadMembers();
        setError(null);
      } catch (err) {
        setError('Failed to delete member');
        console.error('Error deleting member:', err);
      }
    }
  };

    return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>
      
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('games')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'games' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'games' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Games Management
        </button>
        <button
          onClick={() => setActiveTab('members')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'members' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'members' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Members Management
        </button>
      </div>

      {/* Games Tab */}
      {activeTab === 'games' && (
        <div>
          <h2>Games Management</h2>
          
          {/* Add Game Form */}
          <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Add New Game</h3>
            <form onSubmit={handleCreateGame}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Game Name"
                  value={gameForm.name}
                  onChange={(e) => setGameForm({ ...gameForm, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <textarea
                  placeholder="Game Description"
                  value={gameForm.description}
                  onChange={(e) => setGameForm({ ...gameForm, description: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  placeholder="Price"
                  value={gameForm.price}
                  onChange={(e) => setGameForm({ ...gameForm, price: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {loading ? 'Adding...' : 'Add Game'}
              </button>
            </form>
          </div>

          {/* Games Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{game.id}</td>
                    <td style={{ padding: '12px' }}>{game.name}</td>
                    <td style={{ padding: '12px' }}>{game.description}</td>
                    <td style={{ padding: '12px' }}>${game.price.toFixed(2)}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleDeleteGame(game.id!)}
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {games.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No games found. Add some games to get started!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div>
          <h2>Members Management</h2>
          
          {/* Add Member Form */}
          <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Add New Member</h3>
            <form onSubmit={handleCreateMember}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Member Name"
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={memberForm.phone}
                  onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  placeholder="Initial Balance"
                  value={memberForm.balance}
                  onChange={(e) => setMemberForm({ ...memberForm, balance: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {loading ? 'Adding...' : 'Add Member'}
              </button>
            </form>
          </div>

          {/* Members Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Phone</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Balance</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{member.id}</td>
                    <td style={{ padding: '12px' }}>{member.name}</td>
                    <td style={{ padding: '12px' }}>{member.phone}</td>
                    <td style={{ padding: '12px' }}>${member.balance.toFixed(2)}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleDeleteMember(member.id!)}
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {members.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No members found. Add some members to get started!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    );
}

export default Admindashboard;