FROM node:20.13.1-alpine3.19 as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci

RUN npm install -g @angular/cli
COPY . ./
RUN ng build --configuration=production

FROM node:20.13.1-alpine3.19
RUN addgroup -S exampleusergroup && adduser -S exampleuser -G exampleusergroup
USER exampleuser
WORKDIR /usr/app
COPY --from=build /app/src/dist/trace-key-stroke-app/ ./
CMD ["node", "server/server.mjs"]
EXPOSE 4000
