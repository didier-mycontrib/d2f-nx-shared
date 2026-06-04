REM npm install -g verdaccio
REM verdaccio
REM npm adduser --registry http://localhost:4873
REM        (user1/pwd1  user1@xyz.com or ...)
call npm set registry http://localhost:4873/
npm login
REM (user1/pwd1 or ...)
REM npm whoami