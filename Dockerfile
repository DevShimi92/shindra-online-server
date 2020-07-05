FROM node:12.18.2-slim as base
WORKDIR /app
EXPOSE 5003

FROM base as development
COPY src src/
COPY package.json package-lock.json ./
RUN npm i
CMD ["npm", "run",  "dev"]

FROM development as production
COPY src src/
COPY package.json package-lock.json ./
RUN npm i --production
CMD ["npm", "start"]