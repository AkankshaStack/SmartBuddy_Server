#!/usr/bin/env bash

cd /home/ec2-user/smart-buddy-backend

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

nvm install node
nvm install 16
npm install -g npm@9.1.2

npm install
npm install -g pm2

pm2 kill 

export NODE_ENV=staging
pm2 start -f server.js


