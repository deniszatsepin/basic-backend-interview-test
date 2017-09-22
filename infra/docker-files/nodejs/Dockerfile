FROM node:6

RUN useradd --user-group --create-home --shell /bin/false service 

ENV HOME=/home/service
ENV APP=$HOME/app

COPY ./codebase/package.json $APP/package.json
COPY ./codebase/package-lock.json $APP/package-lock.json
COPY ./codebase/service $APP/service
RUN chown -R service:service $HOME/*

USER service
WORKDIR $APP

CMD ["npm", "start"]
