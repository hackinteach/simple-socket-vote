FROM node:alpine
WORKDIR /app
ENV production yes
COPY package.json .
RUN yarn install
COPY . .
CMD yarn start
