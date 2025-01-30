FROM imbios/bun-node:1.2.1-22.13.1-alpine AS base

ENV TZ=Australia/Sydney

################################################################
# Install dependencies

FROM base AS deps
WORKDIR /app

COPY package.json bun.lock ./

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat \ 
  && bun install --frozen-lockfile --ignore-scripts

################################################################
# only run payload migrate if ENV is set (with DATABASE_URI)

FROM deps AS migration
WORKDIR /app

ARG ENV
ENV ENV=$ENV

COPY . .
RUN echo "$ENV" > /app/.env && ([ -z $ENV ] || bun run payload migrate)

################################################################
# Build the project

FROM base AS builder
WORKDIR /app
ENV NEXT_OUTPUT=standalone

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN mkdir -p /app/public && bun run build

################################################################
# copy all the files and create production image

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# for app
COPY --from=builder /app/public ./public

RUN mkdir .next && chown -R bun:bun .next

COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static

# finish

USER bun

EXPOSE $PORT
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["bun","run", "server.js"]
