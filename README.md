# Description 
This application is used to show a relationship between a retailer and a supplier. As a process, a retailer can logged in the portal which will list down all the products from a different supplier. Now he can make a request for the supplier of the required product.

Now supplier can view this request after login into his account, he can see the requests from different venders and has an ability to approve or delete the request. 

Also, a supplier can edit his product details.

# Tech stack
 * MongoDB 
 * Nodejs 
 * Expressjs
 * Oauth
 * Reactjs
 * SASS
 * Webpack  
 
# Security   
### database security  
few policies for database security.  
1. One admin policy
2. Use TLS/SSL
3. LDAP protocol
4. Role base autherization and authentication

### API security 
1. express rate limit 
2. limit body payload
3. use helmet library
4. use mongo-sanitize and Xss-clean library
5. two-way authentication and bcrypt 

# User View  

### Login on the home page  
![login](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/LoginPage.png)  

### github login    
![githublogin](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/githubLogin.png)

### After login 
![](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/Afterlogin.png) 

### Request section  
![Requests](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/request_Panel.png)

### update product  
![product update panel](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/update_product.png)



# Code explanation
### project structure
![project structure](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/project%20structure.png)

### Configuration
![configuration](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/config.png)

### Backend  

1. configuration  and MongoDB connectivity  
![connectivity](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/mongoConnection.png)  

2. MongoDB queries  
![Mongo query](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/MongoQuery.png) 
![](https://github.com/rghvndr99/repo-code-snippet/blob/master/MERN/query.PNG)
    

4. Node APIs  
   ![from node](https://github.com/rghvndr99/repo-code-snippet/blob/master/MERN/usingquery.PNG)  ![API](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/API.png)  


### frontend  
1. React Hooks  and functional components  
![react hooks](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/reactHooks.png)  

2. Import Oauth provider  
  ![import FB ](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/import%20gitgubfacebook.png)

3. Include facebook and github for login   
![include login](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/FacebookGithubLogin.png)

4. Oauth- handler  
![Auth handler](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/Facebook_githubOauth.png)

5. An API connection to the backend  
   ![](https://github.com/rghvndr99/repo-code-snippet/blob/master/MERN/frontendServices.PNG) 
   ![](https://github.com/rghvndr99/repo-code-snippet/blob/master/supply%20chain/login%20service%20for%20facebook.png) 



   
  








