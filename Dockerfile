FROM mhart/alpine-node:8.1.4

COPY . /root/app

WORKDIR /root/app/api
RUN JOBS=MAX yarn install --unsafe-perm && yarn cache clean --force && rm -rf /tmp/*

WORKDIR /root/app/client
RUN JOBS=MAX yarn install --unsafe-perm && yarn cache clean --force && rm -rf /tmp/*
RUN JOBS=MAX yarn run build

WORKDIR /root/app/api

CMD ["npm", "start"]
