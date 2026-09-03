# Email signature

For `hello@mikanoko.studio` and anyone else on the domain.

## Files

| file | what it is |
| --- | --- |
| *(the signature itself)* | lives at [`/signature`](https://mikanoko.studio/signature) on the site — open it and press the copy button |
| `mark-source.html` | the source the logo PNG is rendered from |
| `../../public/studio/signature/mikanoko-signature.png` | the logo, 660×150, displayed at 330×75 |

## Putting it in Gmail

1. Go to <https://mikanoko.studio/signature> and press **copy the signature**.
2. Gmail → Settings → See all settings → General → Signature → Create new.
3. Paste. Save changes at the bottom of the page.

The page copies real `text/html` to the clipboard, so Gmail keeps the table and
the inline styles instead of receiving flat text.

**The logo needs the site deployed**, because it loads from
`https://mikanoko.studio/studio/signature/mikanoko-signature.png`. If it shows
as a broken image, either the site isn't live yet or the path changed. The
alternative that works immediately: delete the pasted image, then use Gmail's
own **Insert image → Upload** with the PNG from `public/studio/signature/`.
Google then hosts it and the signature no longer depends on the site at all.

## Why it looks the way it does

Gmail strips `<style>` blocks, CSS classes, web fonts and SVG. So:

- The logo is a **PNG**, not an SVG, and the wordmark is baked into it — that is
  the only way to keep Zen Maru Gothic, since no email client will load it.
- Everything else is a **table with inline styles**, which is the one layout
  approach every mail client renders the same way.
- The text is a system font stack, because that is all there is.
- The logo sits on its own cream card rather than a transparent background, so
  it stays readable in Gmail's dark mode instead of disappearing.

## Regenerating the logo

Edit `mark-source.html`, then:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=10000 --default-background-color=00000000 \
  --window-size=660,150 \
  --screenshot=public/studio/signature/mikanoko-signature.png \
  "file://$PWD/docs/signature/mark-source.html"
```

It renders at 660×150 and is displayed at 330×75, so it stays sharp on retina
screens. Keep that 2:1 ratio if you change the size.
