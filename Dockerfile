# Required environment variables:
# - JWT_SECRET: string
# - JWT_REFRESH_SECRET
# - ENV: Envs
# export enum Envs {
#   prod = 'prod',
#   preprod = 'preprod',
#   local = 'local',
# }
#  - DEV_WAIT_TIME: it needs to be set just if ENV is 'local' 
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

RUN npm install --only=production

EXPOSE 3000

ENV ENV=prod
RUN apk add --no-cache postgresql-client

CMD ["node", "dist/main"]

