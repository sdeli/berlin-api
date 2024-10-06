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

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
