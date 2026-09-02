# App assets

One folder per app, named with the app's slug. Paths referenced from
`content/apps/<slug>/app.ts` are relative to `/public`.

```
public/apps/<slug>/
├── icon.svg            square, referenced as `icon`
├── screenshots/        device shots, referenced as `screenshots[].src`
└── art/                illustrations, decorative bits, store artwork
```

Nothing here is required. An app with no `icon` gets a drawn placeholder, and
an app with no `screenshots` simply doesn't render that row.
