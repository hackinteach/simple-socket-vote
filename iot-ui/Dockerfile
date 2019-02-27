FROM node:alpine as builder
WORKDIR /frontend
RUN export PATH="$(yarn global bin):$PATH"
RUN yarn global add @vue/cli @vue/cli-service-global
COPY package.json .
RUN yarn install
COPY . .
# RUN yarn cache clean

# RUN ./node_modules/.bin/vue-cli-service build
RUN yarn build

FROM nginx:alpine
COPY --from=builder /frontend/dist /usr/share/nginx/html
# RUN mkdir -p /usr/share/nginx/html

# COPY dist /usr/share/nginx/html
RUN ls /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY deployment/app.template /etc/nginx/conf.d/app.template
WORKDIR /etc/nginx
# CMD nginx -g 'daemon off;'

CMD envsubst "$(env | sed -e 's/=.*//' -e 's/^/\$/g')" < /etc/nginx/conf.d/app.template > /etc/nginx/conf.d/app.conf && exec nginx -g 'daemon off;'