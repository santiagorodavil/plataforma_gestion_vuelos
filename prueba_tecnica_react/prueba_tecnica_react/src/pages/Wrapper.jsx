import React, { useState, useEffect } from 'react';
import supabase  from '../helper/supabaseClient';
import { Navigate } from 'react-router-dom';
import  Header  from '../components/HeaderComponent';

function Wrapper({children}){
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getSession = async () => {
        const{
          data: { session },
        } = await supabase.auth.getSession();
        console.log(session.user.id);
        setUserId(session.user.id);
        setAuthenticated(!!session);
        setLoading(false);
    };

    getSession();
    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } 
  
  if (authenticated) {
      const childrenWithProps = React.cloneElement(children, { userId });
      return <>
              <Header userId={userId} />
              {childrenWithProps}
            </>
  }

  return <Navigate to='/login' />
}

export default Wrapper;