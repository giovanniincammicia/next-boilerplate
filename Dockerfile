FROM node:lts-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Uncomment these if you need to pass build-time arguments (also, add them to the docker-compose file)
# ARG ENV_VAR_NEEDED_AT_BUILD_TIME
# ENV ENV_VAR_NEEDED_AT_BUILD_TIME=$ENV_VAR_NEEDED_AT_BUILD_TIME

# print env
# RUN echo "ENV_VAR_NEEDED_AT_BUILD_TIME: $ENV_VAR_NEEDED_AT_BUILD_TIME"

RUN corepack enable pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]