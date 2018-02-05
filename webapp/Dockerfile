### STAGE 1: Build ###

FROM node:9.4-alpine as builder

COPY numerus-textus/package.json ./

RUN npm install && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY numerus-textus/ .

RUN npm run build-prod-i18n



### STAGE 2: Setup ###

FROM nginx:1.13.8-alpine

RUN rm -f /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/nginx.conf

# Certificates
COPY ./certs /etc/ssl/numerus-textus.com

# Copy dist folder from builder stage
COPY --from=builder /ng-app/dist /var/www

CMD ["nginx", "-g", "daemon off;"]