#FROM node:13.8.0-stretch as dev
FROM ubuntu:20.04 as base

USER root
RUN apt-get update && apt-get upgrade -y
RUN apt-get update && apt-get install -y --no-install-recommends nodejs npm wget

RUN useradd -ms /bin/bash ubuntu

USER ubuntu
RUN mkdir -p /home/ubuntu/vuetify-jsonschema-form

#WORKDIR /home/ubuntu
#RUN git clone https://github.com/koumoul-dev/vuetify-jsonschema-form.git
WORKDIR /home/ubuntu/vuetify-jsonschema-form
COPY --chown=ubuntu:ubuntu ./ ./

RUN npm install
#RUN npm update
#RUN npm run lint
##RUN npm test
#RUN npm run build
#RUN npm run doc-build

FROM base as dev

WORKDIR /home/ubuntu
RUN cp -a vuetify-jsonschema-form vuetify-jsonschema-form_backup && rm -rf vuetify-jsonschema-form
RUN mkdir vuetify-jsonschema-form

WORKDIR /home/ubuntu/vuetify-jsonschema-form
# Using the symbolic link below makes it impossible for VS code to show errors.
# If we instead copy the node_modules to the mounted host folder, this is possible again.
#CMD ln -s ../frontend_backup/node_modules/ node_modules && npm run doc-dev
CMD rm -rf ./node_modules && cp -a ../vuetify-jsonschema-form_backup/node_modules/ ./node_modules && npm run doc-build && npm run doc-dev
