// // src/globalstate/authcontext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); 
//   console.log('user in authcontext', user);
  

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/auth/me', {
//           credentials: 'include',
//         });

//         if (!res.ok) throw new Error('Not authenticated');
//         const data = await res.json();
//         setUser(data);
//       } catch (err) {
//         console.log('No active session');
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
// src/globalstate/authcontext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  console.log('user in authcontext', user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });

        setUser(res.data);
      } catch (err) {
        console.log('No active session');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
