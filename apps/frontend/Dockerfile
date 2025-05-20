FROM node:22-alpine AS base

RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g turbo pnpm

COPY . .

RUN turbo prune @repo/frontend --docker

FROM base AS installer
WORKDIR /app

COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --ignore-scripts

COPY --from=base /app/out/full/ .

FROM base AS builder
WORKDIR /app

COPY --from=installer /app/ .

RUN pnpm turbo run build --filter=@repo/frontend...

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/apps/frontend/dist .

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 