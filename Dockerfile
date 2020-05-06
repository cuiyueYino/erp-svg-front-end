# FROM node
# WORKDIR /
# COPY package*.json ./
# RUN npm i
# COPY ./ .
# RUN npm run build

FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/nginx.conf
