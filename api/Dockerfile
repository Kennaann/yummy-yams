FROM node:20

WORKDIR /usr/src/app

ENV NODE_TLS_REJECT_UNAUTHORIZED 0

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]