import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
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
                        alert('Login successful!');
                        navigate('/customerdashboard');
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
                alert('Admin login successful!');
                navigate('/admindashboard');
            } else if (username === 'customer' && password === 'password') {
                localStorage.setItem('current_user', JSON.stringify({ 
                    username: 'customer', 
                    role: 'customer' 
                }));
                alert('Customer login successful!');
                navigate('/customerdashboard');
            } else {
                setError('Invalid credentials, please try again.');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
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
                    Login
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
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
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
                            backgroundColor: loading ? '#ccc' : '#1976d2',
                            color: 'white',
                            padding: '12px',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginBottom: '20px'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#666', marginBottom: '10px' }}>
                        Don't have an account? 
                    </p>
                    <Link 
                        to="/signup" 
                        style={{ 
                            color: '#1976d2', 
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Sign up here
                    </Link>
                </div>

                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px'
                }}>
                    <h4 style={{ color: '#333', marginBottom: '15px', textAlign: 'center' }}>
                        Demo Credentials
                    </h4>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                        <p><strong>Admin:</strong> admin / password</p>
                        <p><strong>Customer:</strong> customer / password</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;