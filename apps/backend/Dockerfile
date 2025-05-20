FROM node:22-alpine AS base

FROM base AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat && \
    npm install -g turbo@^2

COPY . .

RUN turbo prune @repo/backend --docker

FROM base AS installer

WORKDIR /app

RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm

COPY --from=builder /app/out/json/ .

RUN echo "node-linker=hoisted" > .npmrc

RUN pnpm install --ignore-scripts --frozen-lockfile && \
    rm -rf ~/.pnpm-store

COPY --from=builder /app/out/full/ .

RUN pnpm turbo run build --filter=@repo/backend... && \
    rm -rf node_modules/.cache

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 backend && \
    mkdir -p /app/node_modules && \
    chown -R backend:nodejs /app

COPY --from=installer --chown=backend:nodejs /app/apps/backend/package.json ./package.json

COPY --from=installer --chown=backend:nodejs /app/node_modules ./node_modules

COPY --from=installer --chown=backend:nodejs /app/apps/backend/dist ./dist

USER backend
EXPOSE 3000

ENV NODE_ENV=production
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=postgres

CMD ["node", "dist/main.js"]