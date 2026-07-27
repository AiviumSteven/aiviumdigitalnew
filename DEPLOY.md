# Deploying aiviumdigital.com

Astro site with one server-rendered endpoint (`/api/lead`, the Attio lead
relay). Runs as a Docker container on the VPS, on the shared `web` network,
behind the existing Caddy container (`/opt/caddy`).

## First deploy

```bash
cd /opt
sudo git clone https://github.com/AiviumSteven/aiviumdigitalnew.git aiviumdigital
sudo chown -R steven:steven aiviumdigital
cd aiviumdigital

# the secret lives only here, never in git or the image
cp .env.example .env
nano .env            # paste the real ATTIO_TOKEN

docker compose up -d --build
docker compose logs --tail 20   # expect the server listening on 3000

# reachable on the web network?
docker run --rm --network web curlimages/curl -s -o /dev/null -w '%{http_code}\n' http://aiviumdigital:3000/
```

Then point Caddy at it — in `/opt/caddy/Caddyfile`, change the
`aiviumdigital.com` block's proxy target:

```caddy
aiviumdigital.com {
    reverse_proxy aiviumdigital:3000
    encode gzip
}
```

```bash
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
```

The old Next.js site (`/opt/aivium-site`) keeps running untouched — instant
rollback is changing the proxy line back and reloading Caddy. Once the new
site is verified, free its resources with:

```bash
cd /opt/aivium-site && docker compose down
```

## Releases

```bash
cd /opt/aiviumdigital
git pull
docker compose up -d --build
```

## Smoke test after deploy

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://aiviumdigital.com/            # 200
curl -s -X POST https://aiviumdigital.com/api/lead -d 'not json'               # {"ok":false,...}
```

Then submit the quiz at `/discovery/` with a test email and confirm the
person, company, and "Discovery quiz submission" note appear in Attio
(delete the test records afterward).

## Notes

- `ATTIO_TOKEN` exists only in `/opt/aiviumdigital/.env` (gitignored and
  dockerignored; injected at runtime via `env_file`). If it ever leaks,
  regenerate in Attio → Workspace settings → Developers and update `.env`,
  then `docker compose up -d`.
- The quiz posts same-origin to `/api/lead`; no CORS configuration needed.
- A CRM failure returns 502 from the API but the quiz never blocks the
  Calendly booking on it.
- `lead-relay` (`/home/steven/lead-relay`) belongs to aivium.com and is
  unrelated to this site.
