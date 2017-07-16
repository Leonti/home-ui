FROM mhart/alpine-node:8.1.4

COPY . /root/app

WORKDIR /root/app/api
RUN JOBS=MAX npm install --unsafe-perm && npm cache clean --force && rm -rf /tmp/*

WORKDIR /root/app/client
RUN JOBS=MAX npm install --unsafe-perm && npm cache clean --force && rm -rf /tmp/*
RUN JOBS=MAX npm run build

WORKDIR /root/app/api

CMD ["npm", "start"]
