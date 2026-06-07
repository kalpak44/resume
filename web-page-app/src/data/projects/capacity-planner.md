A zero-dependency single-file tool I built for my own day-to-day capacity planning. When I need to figure out how many work hours fit into a month, distribute them across workdays, or quickly check available capacity for a date range - I open this page. It lives in my homelab as a tiny public app and gets deployed via FluxCD like everything else.

### Key Features & Details

- **Two distribution modes**: _Spread evenly_ distributes hours proportionally across all available workdays; _Compress_ front- or back-loads hours into fewer full workdays up to a configurable daily max
- **Year overview**: 12-month grid with per-month capacity inputs and live scheduled/avg stats - click any card to jump to that month's calendar
- **One-off exceptions**: Mark individual days as full day-off or set partial hour-offs (for things like half-day meetings); exceptions can apply to a single day, all same weekdays in a month, or all same weekdays in a year
- **Date range filter**: Set a start/end boundary and instantly see total scheduled work hours and workday count for that interval
- **Overtime mode**: Optional flag to allow the last fill day in a week to absorb leftover hours beyond the daily cap
- **Import / Export**: Full state round-trips as a JSON snapshot - useful for saving plans or sharing them
- **Dark mode**: Persisted via localStorage, no flicker on load
- **Deployed on homelab**: Served as a static file via nginx, exposed through Traefik + Cloudflare, managed by FluxCD GitOps

```
[ Inputs sidebar ]  ──►  [ Calendar grid ]  ──►  [ Stats bar ]
   mode, date range          color-coded days        capacity / avg
   max hours, fill order     click to edit           scheduled hours
   exceptions list           day-off badges
```

> Built as a single HTML file with vanilla JS and Tailwind CDN - no build step, no framework, no dependencies. Runs anywhere a browser exists.
