import { Link } from "react-router-dom";

function Home(){
    return ( 
     <div style={{ 
       padding: '40px', 
       textAlign: 'center', 
       maxWidth: '800px', 
       margin: '0 auto',
       fontFamily: 'Arial, sans-serif'
     }}>
       <h1 style={{ 
         color: '#1976d2', 
         marginBottom: '30px',
         fontSize: '2.5em'
       }}>
         🎮 Game Club Management System
       </h1>
       
       <p style={{ 
         fontSize: '1.2em', 
         color: '#666', 
         marginBottom: '40px',
         lineHeight: '1.6'
       }}>
         Welcome to the Game Club Management System! Manage games, members, and transactions 
         all in one place. Choose your role to get started.
       </p>
       
       <div style={{ 
         display: 'flex', 
         justifyContent: 'center', 
         gap: '30px',
         marginBottom: '40px',
         flexWrap: 'wrap'
       }}>
         <div style={{ 
           backgroundColor: '#f5f5f5', 
           padding: '30px', 
           borderRadius: '10px',
           boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
           minWidth: '250px'
         }}>
           <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>👨‍💼 Admin</h3>
           <p style={{ color: '#666', marginBottom: '20px' }}>
             Manage games, members, and view system analytics
           </p>
           <Link 
             to="/login" 
             style={{ 
               backgroundColor: '#1976d2', 
               color: 'white', 
               padding: '12px 24px', 
               textDecoration: 'none', 
               borderRadius: '5px',
               display: 'inline-block'
             }}
           >
             Admin Login
           </Link>
         </div>
         
         <div style={{ 
           backgroundColor: '#f5f5f5', 
           padding: '30px', 
           borderRadius: '10px',
           boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
           minWidth: '250px'
         }}>
           <h3 style={{ color: '#4caf50', marginBottom: '15px' }}>👤 Customer</h3>
           <p style={{ color: '#666', marginBottom: '20px' }}>
             Browse games, manage your account, and make purchases
           </p>
           <Link 
             to="/login" 
             style={{ 
               backgroundColor: '#4caf50', 
               color: 'white', 
               padding: '12px 24px', 
               textDecoration: 'none', 
               borderRadius: '5px',
               display: 'inline-block'
             }}
           >
             Customer Login
           </Link>
         </div>
       </div>
       
       <div style={{ 
         backgroundColor: '#e3f2fd', 
         padding: '20px', 
         borderRadius: '8px',
         marginTop: '30px'
       }}>
         <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>Demo Credentials</h4>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
           <div>
             <strong>Admin:</strong> username: <code>admin</code>, password: <code>password</code>
           </div>
           <div>
             <strong>Customer:</strong> username: <code>customer</code>, password: <code>password</code>
           </div>
         </div>
       </div>
       
       <div style={{ marginTop: '30px' }}>
         <Link 
           to="/signup" 
           style={{ 
             color: '#1976d2', 
             textDecoration: 'none',
             fontSize: '1.1em',
             marginRight: '20px'
           }}
         >
           Don't have an account? Sign up here
         </Link>
         <Link 
           to="/test" 
           style={{ 
             color: '#4caf50', 
             textDecoration: 'none',
             fontSize: '1.1em'
           }}
         >
           Test Page
         </Link>
       </div>
     </div>
    );
}   
export default Home;
