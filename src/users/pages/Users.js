import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id:'u1', 
            name:'Julia', 
            image:'https://i.imgur.com/0p9zSZy.jpg', 
            events:3,
        }
    ];

    return <UsersList items={USERS}/>;

};

export default Users;