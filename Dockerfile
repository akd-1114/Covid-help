FROM node:14

COPY ./package.json /app/package.json
WORKDIR "/app"
RUN npm install
RUN npm install node-sass
COPY . /app

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
