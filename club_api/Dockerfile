FROM node:14

WORKDIR /club_api
COPY package.json .
RUN npm install
COPY . .
# RUN npm run migrate
CMD npm run start
