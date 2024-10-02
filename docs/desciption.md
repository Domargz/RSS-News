# Classes
## /db/Sqlite3.js
- Management database creation and query operation
- Create database and tables by init(filename) method.
## /events/RssEvents
- Make HTTP request  and save the content in Database.
## /rss/ProcessRssFile
- Make the HTTP request and serialice the content 
- And check if some source needs updates 
- Change the checkIfUpdateByDate() to RssEvents class file.
## /server
### /server/middleware
- Check the user authorization 
### /server/controller
- /signup: Create user in databse.
- /login: Check if user is in Database and return the JWT.

