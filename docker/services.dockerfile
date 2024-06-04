ARG BASE_IMAGE

FROM $BASE_IMAGE

ARG SERVICE_NAME

LABEL org.opencontainers.image.title=$IMAGE_TITLE
LABEL org.opencontainers.image.version=$RELEASE
LABEL org.opencontainers.image.description=$IMAGE_DESCRIPTION
LABEL org.opencontainers.image.authors="The Guild"
LABEL org.opencontainers.image.vendor="The Guild"
LABEL org.opencontainers.image.source="https://github.com/saihaj/graph-webhooks"

ENV ENVIRONMENT production
ENV RELEASE $RELEASE
ENV PORT $PORT
ENV SERVICE_NAME $SERVICE_NAME

WORKDIR /app/$SERVICE_NAME
RUN cp ../docker/start.sh start.sh
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

HEALTHCHECK --interval=5s \
  --timeout=5s \
  --start-period=5s \
  --retries=6 \
  CMD $HEALTHCHECK_CMD

RUN chmod +x start.sh

# very important to run stuff as non-root user
# we do it in start.sh because dotenv-vault needs to modify some files
# USER node

CMD ["./start.sh"]
