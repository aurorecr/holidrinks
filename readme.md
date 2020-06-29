# Holidrinks

## Description
Holidrinks is an app for travellers or anyone in holidays who wish to meet some people around drinks in the location of their travel. This app allow people to form groups during their trip in order to share experiences, advices and activities, especially for solo travellers.

## User Stories
homepage - Here the user is getting informed about the subject of the app and can login and signup
sign up - This page allow the user to create an account on the app in order to join an event/Holidrinks
login - The user can access the personal account by login
logout - The user can log out from the app so the data of the personal account are keept safe from anyone else
404 - This page will show up if the user enter incorrect URL
500 - This page will show up if the the application is broken, internal error

## Backlog

#Client

## React Router Routes (React App)
| Path              | Component                      | Permissions | Behavior                                                     |
| ------------------| --------------------           | ----------- | ------------------------------------------------------------ |
| `/`               | SplashPage                     | public `<Route>`            | Home page                                        |
| `/signup`         | SignupPage, ProfilPic           | anon only  `<AnonRoute>`    | Signup form, navigate to MenuPage after signup |
| `/signin`         | SigninPage                      | anon only `<AnonRoute>`     | Login form, navigate to MenuPage after login  |
| `/logout`         | n/a                            | user only `<PrivateRoute>`  | Navigate to splashpage after logout, expire session             |
| `/menu`           | General Menu Button,Log out    | user only `<PrivateRoute>`  | Shows the 4 sections of the app                        |
| `/`       |DatesSearchBar, GroupItem, NavBar| user only `<PrivateRoute>`| Shows events from others host, navigate to HoliHostPage
| `/events/new`     |DatesSearchBar, AddEvent, NavBar| user only `<PrivateRoute>`| Shows create Holidrinks, Holidrinks made already, Navigate to EditEvent page
| `/:userId/events`      |NavBar,DatesSearchBar, EditEvent,DeletEvent,ViewMap | user only `<PrivateRoute>`| Shows Holidrinks edit section, Navigate to CreateEvent page


## Routes
* GET/
* GET /auth/signup
* POST /auth/signup
 * redirects to / if user logged in
 * body:
  full name
  email
  password
* GET /auth/login 
* POST /auth/login
* redirects to / if user logged in
 body:
 username:
 password:
* GET / 
* POST /
* GET /logout


#SERVER

## Models
User profil
{
username: {type: String, required: true, unique: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
image :{type: String, required: true, unique: true},
description : {type: String, required: true, unique: true},
}

Event 
{
image :{type: String, required: true, unique: true},
owner id :{objectmodel } {type: String, required: true},
address :{type: String, required: true},
description :{type: String, required: true},
localisation : {type: String, required: true},
}


## Links
Trello
[GitHub]( )

Git
Repository Link
[GitHub] ( )

Deploy Link
 

