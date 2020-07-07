import { useState, useCallback, useEffect } from 'react';

let logoutTimer;


export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  
  const login = useCallback((uid, token, expirationDate) => {
    //useCallback to avoid infinity loops
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date (new Date().getTime() + 1000 * 60 * 60);
    //get time gives number of milliseconde , so 1 seconde , 1min , then 1h
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({ userId:uid, token: token, expiration: tokenExpirationDate.toISOString()
       })
      );
    //with JSON.stringify i can turn an object into text, JSON is a text that looks like an object
  }, []);

  const logout = useCallback(() => {
    //useCallback to avoid infinity loops
    setToken(null);
    setTokenExpirationDate(null);
    //here i clear the experationDate when the user log out
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

    useEffect(() => {
        if (token && tokenExpirationDate){
          const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
         logoutTimer = setTimeout(logout, remainingTime);
            } else {
              clearTimeout(logoutTimer);
            }
         }, [token, logout, tokenExpirationDate]);
         //when the user log out , it clears the timer, when the user login it set a new timer
       
         useEffect(() =>{
           const storedData= JSON.parse(localStorage.getItem('userData'));
             if (storedData && 
               storedData.token &&
               new Date(storedData.expiration) > new Date()
               ){
             login(storedData.userId, storedData.token, new Date(storedData.expiration));
             }
           }, [login]);
           return { token, login, logout, userId };
};


   