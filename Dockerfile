FROM buildpack-deps:stretch-curl as entrykit

# Install Entrykit
ENV ENTRYKIT_VERSION="0.4.0"
RUN wget https://github.com/progrium/entrykit/releases/download/v${ENTRYKIT_VERSION}/entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz && \
  tar -xvzf entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz

FROM node:10.21.0-stretch as dev
LABEL MAINTAINER "cheezenaan <cheezenaan@gmail.com>"

ENV \
  APP_ROOT="/app" \
  LANG="C.UTF-8"

WORKDIR $APP_ROOT

COPY --from=entrykit entrykit /bin/entrykit
RUN chmod +x /bin/entrykit && \
  /bin/entrykit --symlink

ENTRYPOINT [ \
  "prehook", "node -v", "--", \
  "prehook", "yarn install --no-progress", "--" \
  ]
