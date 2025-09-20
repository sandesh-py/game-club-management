import React, { useState, useEffect } from 'react';
import { gameService, Game } from '../api/gameService';
import { memberService, Member } from '../api/memberService';

function Customerdashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'games' | 'profile'>('games');

  // Load data on component mount
  useEffect(() => {
    loadGames();
    loadMemberProfile();
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

  const loadMemberProfile = async () => {
    try {
      setLoading(true);
      // For demo purposes, we'll get the first member
      // In a real app, this would be based on the logged-in user
      const members = await memberService.getAllMembers();
      if (members.length > 0) {
        setMember(members[0]); // Use first member as demo
      }
    } catch (err) {
      setError('Failed to load member profile');
      console.error('Error loading member profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Customer Dashboard</h1>
      
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
          Browse Games
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'profile' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'profile' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          My Profile
        </button>
      </div>

      {/* Games Tab */}
      {activeTab === 'games' && (
        <div>
          <h2>Available Games</h2>
          
          {/* Games Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px',
            marginTop: '20px'
          }}>
            {games.map((game) => (
              <div
                key={game.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
                  {game.name}
                </h3>
                <p style={{ 
                  color: '#666', 
                  margin: '0 0 15px 0',
                  lineHeight: '1.5'
                }}>
                  {game.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '15px'
                }}>
                  <span style={{ 
                    fontSize: '1.2em', 
                    fontWeight: 'bold', 
                    color: '#4caf50'
                  }}>
                    ${game.price.toFixed(2)}
                  </span>
                  <button
                    style={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                    onClick={() => alert(`Game "${game.name}" added to cart! (Demo feature)`)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {games.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }}>
              <h3>No games available</h3>
              <p>Check back later for new games!</p>
            </div>
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div>
          <h2>My Profile</h2>
          
          {member ? (
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              maxWidth: '500px'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  marginBottom: '5px',
                  color: '#333'
                }}>
                  Member ID:
                </label>
                <span style={{ color: '#666' }}>{member.id}</span>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  marginBottom: '5px',
                  color: '#333'
                }}>
                  Name:
                </label>
                <span style={{ color: '#666' }}>{member.name}</span>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  marginBottom: '5px',
                  color: '#333'
                }}>
                  Phone:
                </label>
                <span style={{ color: '#666' }}>{member.phone}</span>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  marginBottom: '5px',
                  color: '#333'
                }}>
                  Account Balance:
                </label>
                <span style={{ 
                  color: '#4caf50', 
                  fontSize: '1.2em', 
                  fontWeight: 'bold'
                }}>
                  ${member.balance.toFixed(2)}
                </span>
              </div>
              
              <div style={{ 
                backgroundColor: '#e3f2fd', 
                padding: '15px', 
                borderRadius: '4px',
                marginTop: '20px'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
                  Account Actions
                </h4>
                <button
                  style={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                  onClick={() => alert('Recharge feature coming soon!')}
                >
                  Recharge Account
                </button>
                <button
                  style={{
                    backgroundColor: '#ff9800',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => alert('Transaction history coming soon!')}
                >
                  View Transactions
                </button>
              </div>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }}>
              <h3>No profile found</h3>
              <p>Please contact support if you're having trouble accessing your profile.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Customerdashboard;