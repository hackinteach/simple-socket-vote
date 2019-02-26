FROM node:alpine
WORKDIR /app
ENV production yes
COPY package.json .
RUN yarn install
COPY . .
CMD NODE_ENV=production yarn start
