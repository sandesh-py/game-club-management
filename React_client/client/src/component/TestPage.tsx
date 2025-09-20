import React, { useState } from 'react';
import { memberService, Member } from '../api/memberService';
import { gameService, Game } from '../api/gameService';

function TestPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testMembersAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      addTestResult('Testing Members API...');
      
      const data = await memberService.getAllMembers();
      setMembers(data);
      addTestResult(`✅ Members API working! Found ${data.length} members`);
    } catch (err) {
      const errorMsg = `❌ Members API failed: ${err}`;
      setError(errorMsg);
      addTestResult(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const testGamesAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      addTestResult('Testing Games API...');
      
      const data = await gameService.getAllGames();
      setGames(data);
      addTestResult(`✅ Games API working! Found ${data.length} games`);
    } catch (err) {
      const errorMsg = `❌ Games API failed: ${err}`;
      setError(errorMsg);
      addTestResult(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const testCreateMember = async () => {
    try {
      setLoading(true);
      setError(null);
      addTestResult('Testing Create Member...');
      
      const newMember = {
        name: `Test Member ${Date.now()}`,
        phone: '123-456-7890',
        balance: 100.0
      };
      
      const created = await memberService.createMember(newMember);
      addTestResult(`✅ Member created successfully! ID: ${created.id}`);
      testMembersAPI(); // Refresh the list
    } catch (err) {
      const errorMsg = `❌ Create Member failed: ${err}`;
      setError(errorMsg);
      addTestResult(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const testCreateGame = async () => {
    try {
      setLoading(true);
      setError(null);
      addTestResult('Testing Create Game...');
      
      const newGame = {
        name: `Test Game ${Date.now()}`,
        description: 'A test game for API testing',
        price: 29.99
      };
      
      const created = await gameService.createGame(newGame);
      addTestResult(`✅ Game created successfully! ID: ${created.id}`);
      testGamesAPI(); // Refresh the list
    } catch (err) {
      const errorMsg = `❌ Create Game failed: ${err}`;
      setError(errorMsg);
      addTestResult(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
    setError(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>API Connection Test Page</h1>
      
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

      {/* Test Controls */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>API Tests</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button
            onClick={testMembersAPI}
            disabled={loading}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Test Members API
          </button>
          <button
            onClick={testGamesAPI}
            disabled={loading}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Test Games API
          </button>
          <button
            onClick={testCreateMember}
            disabled={loading}
            style={{
              backgroundColor: '#ff9800',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Test Create Member
          </button>
          <button
            onClick={testCreateGame}
            disabled={loading}
            style={{
              backgroundColor: '#9c27b0',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Test Create Game
          </button>
          <button
            onClick={clearResults}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Results
          </button>
        </div>
        
        {loading && (
          <div style={{ color: '#1976d2', fontWeight: 'bold' }}>
            Testing API connection...
          </div>
        )}
      </div>

      {/* Test Results */}
      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>Test Results</h3>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '4px',
          maxHeight: '300px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          {testResults.length === 0 ? (
            <div style={{ color: '#666' }}>No tests run yet. Click a test button above.</div>
          ) : (
            testResults.map((result, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Data Display */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Members */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Members ({members.length})</h3>
          {members.length === 0 ? (
            <div style={{ color: '#666' }}>No members found</div>
          ) : (
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {members.map((member) => (
                <div key={member.id} style={{
                  padding: '10px',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}>
                  <div><strong>ID:</strong> {member.id}</div>
                  <div><strong>Name:</strong> {member.name}</div>
                  <div><strong>Phone:</strong> {member.phone}</div>
                  <div><strong>Balance:</strong> ${member.balance}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Games */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Games ({games.length})</h3>
          {games.length === 0 ? (
            <div style={{ color: '#666' }}>No games found</div>
          ) : (
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {games.map((game) => (
                <div key={game.id} style={{
                  padding: '10px',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}>
                  <div><strong>ID:</strong> {game.id}</div>
                  <div><strong>Name:</strong> {game.name}</div>
                  <div><strong>Description:</strong> {game.description}</div>
                  <div><strong>Price:</strong> ${game.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestPage;