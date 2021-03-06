import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';


const UsersList = props => {
 if (props.items.length === 0){
     return (
         <div className="center">
           <Card>
             <h2>No users found</h2>
           </Card>
         </div>
     )
    //  in case of no users found 
 }
  return (
    <ul className="users-list">
      {props.items.map(user => (
           <UserItem 
           key = {user.id} 
           id={user.id} 
           image={user.image} 
           name={user.name} 
           eventCount={user.events.length}
           />
      ))}
    </ul>
 );
};

export default UsersList;