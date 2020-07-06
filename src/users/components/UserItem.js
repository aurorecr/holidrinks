import React from 'react';
import {Link} from 'react-router-dom';
//Link > renders an anchor tag and add extra block of navigation on same page

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
return(
    <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${props.id}/events`}>
                {/* to > define where 'to' wants to go, will reflect the id of the user as it will be the users events creation, it's dynamic, so we use curly braces */}
                {/* so {props.id} here is the user id */}
                    <div className="user-image">
                    <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        <h3>{props.eventCount} {props.eventCount === 1 ? 'Holidrink' : 'Holidrinks'}</h3> 
                        {/* will write down event in plurial if user created several events */}
                    </div>
              </Link> 
            </Card>
    </li>
)
    
};

export default UserItem;