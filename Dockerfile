FROM bitnami/node:12

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY tsconfig.json ./
COPY '@solidcrafters' './@solidcrafters'
RUN yarn build

EXPOSE 3333 4444

CMD ["yarn", "start"]
