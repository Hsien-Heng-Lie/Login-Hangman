# Hangman

## Creating the databases
### Requirements:
- local sql server express installed
- sql login mode enabled for sql server (https://stackoverflow.com/a/58329203)
- create sql login (username and password) (https://learn.microsoft.com/en-us/sql/t-sql/statements/create-login-transact-sql?view=sql-server-ver16)
### Steps
- open local instance of sql server
- run Database_Creation.sql script in sql server management studio or dbeaver

## Enviroment Variables
- Create an .env file with the following variables
- FIll in your details where a '*' is placed
  
Identity_Server_API_PORT=4040  
Identity_Server_Key= *  
Identity_Server_Base_Url=http://localHost:4040  
TOKEN_KEY= *  

DATABASE_Connection_String= *  
DATABASE_Port= *  
DATABASE_User= *  
DATABASE_KEY= *  
DATABASE_Identity=Identity_Server  
DATABASE_Hangman=Hangman  

enviroment=dev  


## Running the boy

- navigate in to the root folder

  ### To run the identity server
- open a terminal and run:
  ```bash
    npm run id-install
  ```
- navigate to the root directory of the project ('/Login-Hangman') and run:

  ```bash
    npm run id-start
  ```

  ### To run the resource server
- open a terminal and run:
  ```bash
    npm run server-install
  ```
- navigate to the root directory of the project ('/Login-Hangman') and run:

  ```bash
     npm run server-start
  ```
  ### Web Page
- Access the website at http://localhost:4000/