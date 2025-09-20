import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Simple Login Component
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check for registered users first
    const stored = localStorage.getItem('registered_user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.username === username && user?.password === password) {
          localStorage.setItem('current_user', JSON.stringify({ 
            username: user.username, 
            email: user.email, 
            role: 'customer' 
          }));
          navigate('/customer-dashboard');
          return;
        }
      } catch (_) {}
    }

    // Check demo credentials
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('current_user', JSON.stringify({ 
        username: 'admin', 
        role: 'admin' 
      }));
      navigate('/admin-dashboard');
    } else if (username === 'customer' && password === 'password') {
      localStorage.setItem('current_user', JSON.stringify({ 
        username: 'customer', 
        role: 'customer' 
      }));
      navigate('/customer-dashboard');
    } else {
      setError('Invalid credentials! Use admin/password or customer/password');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '30px' }}>
          🎮 Game Club Login
        </h1>
        
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
        
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          <strong>Demo Credentials:</strong><br/>
          Admin: admin / password<br/>
          Customer: customer / password
        </div>
      </div>
    </div>
  );
}

// Simple Signup Component
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (username.trim() === '') {
      setError('Username cannot be empty!');
      return;
    } else if (email.trim() === '') {
      setError('Email cannot be empty!');
      return;
    } else if (password === '') {
      setError('Password cannot be empty!');
      return;
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    // Create new user
    const user = { username, email, password };
    localStorage.setItem('registered_user', JSON.stringify(user));
    
    alert('Signup successful! You can now login.');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#4caf50', marginBottom: '30px' }}>
          🎮 Game Club Signup
        </h1>

        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              color: '#1976d2',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Already have an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple Home Component
function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{ color: '#1976d2', fontSize: '2.5rem', marginBottom: '20px' }}>
          🎮 Game Club Management
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Welcome to the Game Club Management System
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          
          <button
            onClick={() => navigate('/signup')}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </div>
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '5px',
          fontSize: '14px'
        }}>
          <strong>Demo Credentials:</strong><br/>
          Admin: admin / password<br/>
          Customer: customer / password
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard with Game Management
function AdminDashboard() {
  const navigate = useNavigate();
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem('games');
    if (savedGames) {
      return JSON.parse(savedGames);
    }
    return [
      { id: '1', name: 'Sample Game 1', description: 'A fun adventure game', price: 29.99 },
      { id: '2', name: 'Sample Game 2', description: 'An exciting puzzle game', price: 19.99 }
    ];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGame, setNewGame] = useState({ name: '', description: '', price: 0 });

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    const game = {
      id: Date.now().toString(),
      name: newGame.name,
      description: newGame.description,
      price: newGame.price
    };
    const updatedGames = [...games, game];
    setGames(updatedGames);
    localStorage.setItem('games', JSON.stringify(updatedGames));
    setNewGame({ name: '', description: '', price: 0 });
    setShowAddForm(false);
  };

  const handleDeleteGame = (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      const updatedGames = games.filter(game => game.id !== id);
      setGames(updatedGames);
      localStorage.setItem('games', JSON.stringify(updatedGames));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1976d2' }}>🎮 Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('current_user');
              navigate('/');
            }}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {showAddForm ? 'Cancel' : 'Add New Game'}
          </button>
        </div>

        {showAddForm && (
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Add New Game</h3>
            <form onSubmit={handleAddGame}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Game Name"
                  value={newGame.name}
                  onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <textarea
                  placeholder="Game Description"
                  value={newGame.description}
                  onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  placeholder="Price"
                  value={newGame.price}
                  onChange={(e) => setNewGame({ ...newGame, price: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="0.01"
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add Game
              </button>
            </form>
          </div>
        )}

        <h2>Games Management</h2>
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
                      onClick={() => handleDeleteGame(game.id)}
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
        </div>
      </div>
    </div>
  );
}

// Customer Dashboard with Game Browsing
function CustomerDashboard() {
  const navigate = useNavigate();
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem('games');
    if (savedGames) {
      return JSON.parse(savedGames);
    }
    return [
      { id: '1', name: 'Sample Game 1', description: 'A fun adventure game', price: 29.99 },
      { id: '2', name: 'Sample Game 2', description: 'An exciting puzzle game', price: 19.99 },
      { id: '3', name: 'Sample Game 3', description: 'A thrilling action game', price: 39.99 }
    ];
  });

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('customer_balance');
    return savedBalance ? parseFloat(savedBalance) : 100.0;
  });

  const [showRechargeForm, setShowRechargeForm] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(0);

  // Refresh games when component mounts or when localStorage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      const savedGames = localStorage.getItem('games');
      if (savedGames) {
        setGames(JSON.parse(savedGames));
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      const savedGames = localStorage.getItem('games');
      if (savedGames) {
        const parsedGames = JSON.parse(savedGames);
        if (JSON.stringify(parsedGames) !== JSON.stringify(games)) {
          setGames(parsedGames);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [games]);

  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (rechargeAmount > 0) {
      const newBalance = balance + rechargeAmount;
      setBalance(newBalance);
      localStorage.setItem('customer_balance', newBalance.toString());
      setRechargeAmount(0);
      setShowRechargeForm(false);
      alert(`Recharge successful! New balance: $${newBalance.toFixed(2)}`);
    } else {
      alert('Please enter a valid amount');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#4caf50' }}>🎮 Customer Dashboard</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '10px 15px',
              borderRadius: '5px',
              border: '1px solid #4caf50'
            }}>
              <strong>Balance: ${balance.toFixed(2)}</strong>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('current_user');
                navigate('/');
              }}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Recharge Section */}
        <div style={{
          backgroundColor: '#fff3e0',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: '#ff9800', margin: '0 0 5px 0' }}>Account Balance</h3>
              <p style={{ margin: '0', color: '#666' }}>Current balance: <strong>${balance.toFixed(2)}</strong></p>
            </div>
            <button
              onClick={() => setShowRechargeForm(!showRechargeForm)}
              style={{
                backgroundColor: '#ff9800',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {showRechargeForm ? 'Cancel' : 'Recharge Account'}
            </button>
        </div>
        
          {showRechargeForm && (
        <div style={{
              backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
              marginTop: '15px',
              border: '1px solid #ffcc02'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#ff9800' }}>Recharge Your Account</h4>
              <form onSubmit={handleRecharge}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Amount to Recharge:
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(parseFloat(e.target.value) || 0)}
                    required
                    min="1"
                    step="0.01"
                    style={{
                      width: '200px',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
          <button 
                    type="submit"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
                    Recharge Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRechargeForm(false)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <h2>Available Games</h2>
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
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
    </Routes>
  );
}

export default App;