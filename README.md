# Red-Things
IOT(Internet of things) platform based on Node-Red, Easy but very useful to built a iot system

# Init project
> npm install

# Install views JS lib
```
cd public
npm install
```

why? 

Important pages render in backend;

And login.html is all pages's entry;

There will be different Vue projects in Red-Things in the future;


# Config DB
only support mongoDB

dir /user_settings/index.js  ->  db_url

input your own mongoDB server address

# Start to run
> npm run server

# Create admin account
input below command in terminal:
> node utils/createUser.js username password

or

```
cd utils
node createUser.js username password
```
+ username : your own account name
+ password : your own password

# Test
input url in browser: localhost:3000/login

you can see the web pages

![login](https://github.com/xqli82/Red-Things/blob/master/login.png)

# Interface
+ /login  all url's entry
+ /main   the main dashboard
+ /red    node-red editor
+ /api    node-red http interface

# www.v5w.com
more information on my website: www.v5w.com(威武网)