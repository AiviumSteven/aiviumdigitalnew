# Deploying aiviumdigital.com

Astro site with one server-rendered endpoint (`/api/lead`, the Attio lead
relay). Everything — static pages and the API — is served by a single Node
process behind Caddy.

## One-time server setup

Requires Node 20+ on the VPS.

```bash
# wherever you keep apps, e.g. /srv
git clone <repo-url> /srv/aiviumdigital
cd /srv/aiviumdigital
npm ci
npm run build

# the secret lives only on the server
cp .env.example .env
nano .env        # paste the real ATTIO_TOKEN
```

### systemd unit — `/etc/systemd/system/aivium.service`

```ini
[Unit]
Description=Aivium Digital (Astro)
After=network.target

[Service]
WorkingDirectory=/srv/aiviumdigital
EnvironmentFile=/srv/aiviumdigital/.env
Environment=HOST=127.0.0.1
Environment=PORT=4321
ExecStart=/usr/bin/node ./dist/server/entry.mjs
Restart=on-failure
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now aivium
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4321/   # expect 200
```

### Caddyfile block

```caddy
aiviumdigital.com {
    reverse_proxy 127.0.0.1:4321
}

www.aiviumdigital.com {
    redir https://aiviumdigital.com{uri} permanent
}
```

```bash
sudo systemctl reload caddy
```

## Releases

```bash
cd /srv/aiviumdigital
git pull
npm ci
npm run build
sudo systemctl restart aivium
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

- `ATTIO_TOKEN` exists only in `/srv/aiviumdigital/.env` (gitignored). If the
  token ever leaks, regenerate it in Attio → Workspace settings → Developers
  and update `.env`.
- The quiz posts same-origin to `/api/lead`; no CORS configuration needed.
- A CRM failure returns 502 from the API but the quiz never blocks the
  Calendly booking on it.
