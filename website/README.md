# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Instagram Footer Feed

The footer is configured to show the most recent 4 Instagram posts.

1. Copy `.env.example` to `.env`.
2. Set `INSTAGRAM_ACCESS_TOKEN` to a valid long-lived Instagram Basic Display token.
3. Keep `PUBLIC_INSTAGRAM_PROFILE_URL` set to your account URL.

When `INSTAGRAM_ACCESS_TOKEN` is present, the build fetches the latest posts automatically. If Instagram rate-limits public requests, `PUBLIC_INSTAGRAM_FALLBACK_POST_SHORTCODES` is used as a backup so the footer still renders 4 post images.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
