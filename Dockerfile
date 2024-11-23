# NOTE: Docker build requires `output` in next.config.mjs to be 'standalone'
FROM node:22-alpine AS base

WORKDIR /app

RUN npm install -g bun@1.1.37 \
  # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
  && apk add --no-cache libc6-compat=1.1.0

# Install dependencies

FROM base AS deps

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build the project

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# create production image, copy all the files and run next

FROM base AS runner

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN addgroup --system --gid 1001 payload \
  && adduser --system --uid 1001 payload \
  && chown payload:payload .

USER payload

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["HOSTNAME=\"0.0.0.0\"", "bun", "run", ".next/standalone/server.js"]
