import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
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
            } else if (password !== confirmPassword) {
                setError('Password and Confirm Password do not match!');
                return;
            } else if (password.length < 6) {
                setError('Password must be at least 6 characters long!');
                return;
            }

            // Check if username already exists
            const existingUser = localStorage.getItem('registered_user');
            if (existingUser) {
                try {
                    const user = JSON.parse(existingUser);
                    if (user.username === username) {
                        setError('Username already exists! Please choose a different username.');
                        return;
                    }
                } catch (_) {}
            }

            // Create new user
            const user = { username, email, password };
            localStorage.setItem('registered_user', JSON.stringify(user));
            alert('Registration Successful! You can now sign in.');
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 200px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ 
                    textAlign: 'center', 
                    color: '#1976d2',
                    marginBottom: '30px',
                    fontSize: '2rem'
                }}>
                    Sign Up
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

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            minLength={6}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            backgroundColor: loading ? '#ccc' : '#4caf50',
                            color: 'white',
                            padding: '12px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginBottom: '20px'
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#666', marginBottom: '10px' }}>
                        Already have an account? 
                    </p>
                    <Link 
                        to="/login" 
                        style={{ 
                            color: '#1976d2', 
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Login here
                    </Link>
                </div>

                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#e8f5e8',
                    borderRadius: '8px'
                }}>
                    <h4 style={{ color: '#333', marginBottom: '15px', textAlign: 'center' }}>
                        Account Benefits
                    </h4>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                        <p>✅ Browse and purchase games</p>
                        <p>✅ Track your gaming history</p>
                        <p>✅ Manage your account balance</p>
                        <p>✅ Access exclusive member features</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;