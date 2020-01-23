### STAGE 1: Build ###
#
#FROM node:13.6.0-alpine as builder
#
#RUN mkdir /ng-app
#WORKDIR /ng-app
#
#COPY numerus-textus/package*.json ./
#RUN npm install
#
#COPY numerus-textus/ .
#RUN npm run build-prod-i18n



### STAGE 2: Setup ###

FROM nginx:1.16.1-alpine

RUN rm -f /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/nginx.conf

# Copy dist folder from builder stage
#COPY --from=builder /ng-app/dist/ /var/www/
COPY numerus-textus/dist/ /var/www/

CMD ["nginx", "-g", "daemon off;"]
