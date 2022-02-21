[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvirtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js%20and%20Vercel.&demo-url=https%3A%2F%2Fdemo.vercel.events%2F&demo-image=https%3A%2F%2Fdemo.vercel.events%2Fdeploy.png&integration-ids=oac_I1h8Dm9Mf30VNb3xQ0hebYvS&external-id=%7B%22manifest%22%3A%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fvercel%2Fvirtual-event-starter-kit%2Fmain%2Fdatocms.json%22%7D)

# [Virtual Event Starter Kit](https://vercel.com/virtual-event-starter-kit)

### Demo: https://demo.vercel.events

This virtual event starter kit was used to run [Next.js Conf 2020](https://nextjs.org/2020/conf), which had almost 40,000 live attendees. It includes the following features:

- Multiple stages with an embedded YouTube stream
- Sponsor expo, including individual virtual booths
- Career Fair, allowing attendees to network and find job opportunties
- Ticket registration and generation
- Speaker pages and bios
- Schedule

This platform is built upon three principles:

- **Delegation:** Running a conference is difficult – you have to **delegate** tasks to third-parties to ensure success. Certain elements of an online conference experience are tough to get right, and we'd rather lean on established, industry leading solutions.
- **Flexibility:** While delegating certain elements of the conference experience is helpful, it's also important to own the platform. That's why this template provides a **flexible** open-source codebase that can be modified for your event.
- **Reducing Risk:** It's inevitable something will go wrong during your event. This platform **reduces risk** by leaning on a dynamic site that outputs as static files using [Incremental Static Generation](https://nextjs.org/docs/basic-features/data-fetching). These static files are cached, ensuring your site is never down. Then, it uses [API Routes](https://nextjs.org/docs/api-routes/introduction) to sprinkle dynamic content on top, which are hosted by a provider with 99.99% uptime.

### Built With

- Framework: [Next.js](https://nextjs.org)
  - [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support)
  - [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- CMS: [Multiple Options](#cms)
- Videos: [YouTube](https://www.youtube.com)
- Deployment: [Vercel](https://vercel.com)
- Authentication: [GitHub OAuth](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps)
- Database: [Redis](https://redis.io)

## Running Locally

First, set local environment variables. We've included a read-only DatoCMS access token you can use in `.env.local.example`.

```
cp .env.local.example .env.local
```

Then install packages and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Clone and Deploy

Click the button below to clone and deploy this template on [Vercel](https://vercel.com/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvirtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js%20and%20Vercel.&demo-url=https%3A%2F%2Fdemo.vercel.events%2F&demo-image=https%3A%2F%2Fdemo.vercel.events%2Fdeploy.png&integration-ids=oac_I1h8Dm9Mf30VNb3xQ0hebYvS&external-id=%7B%22manifest%22%3A%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fvercel%2Fvirtual-event-starter-kit%2Fmain%2Fdatocms.json%22%7D)

You’ll be asked to install the [DatoCMS](https://www.datocms.com) integration. It lets you sign up or log in to DatoCMS and create a new DatoCMS project based on the data (speakers, stages, etc.) used in the demo.

## Customize

### CMS

Environment variables determine which CMS to use. See [`lib/cms-api.ts`](lib/cms-api.ts) for details and `.env.local.example` for all environment variables. The demo ([demo.vercel.events](https://demo.vercel.events)) uses DatoCMS, but we also have support for:

- [Agility](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvirtual-event-starter-kit&project-name=virtual-event-starter-kit&repository-name=virtual-event-starter-kit&demo-title=Virtual%20Event%20Starter%20Kit&demo-description=Jumpstart%20your%20virtual%20event%20and%20scale%20to%20any%20size%20with%20Next.js%20and%20Vercel.&demo-url=https%3A%2F%2Fdemo.vercel.events%2F&demo-image=https%3A%2F%2Fdemo.vercel.events%2Fdeploy.png&integration-ids=oac_Dnqk9CoC6rZ18k9nVR9KresV&external-id=%7B%22manifest%22%3A%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fvercel%2Fvirtual-event-starter-kit%2Fmain%2Fdatocms.json%22%2C%20%22githubRepo%22%3A%20%22vercel%2Fvirtual-event-starter-kit%22%7D)
- [Contentful](lib/cms-providers/contentful.ts)
- [Prismic](lib/cms-providers/prismic/index.ts) ([Instructions](lib/cms-providers/prismic/README.md))
- [Sanity](https://create.sanity.io/?template=sanity-io%2Fsanity-template-nextjs-event-starter)
- [Storyblok](lib/cms-providers/storyblok.ts) 
  - Click the following link to create the space for this starter kit in Storyblok: [Create Event Space](https://app.storyblok.com/#!/build/101757)

### Constants

`lib/constants.ts` contains a list of variables you should customize.

## Authentication and Database

Some features won’t work until you set up authentication and database. The demo ([demo.vercel.events](https://demo.vercel.events)) uses [GitHub OAuth](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app) for authentication and [Redis](https://redis.io/) for database. You can use different providers as you see fit.

### Authentication

You need to have GitHub OAuth set up to be able to customize the ticket after signing up on the registration form.

First, create a [GitHub OAuth application](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app) to use for authentication.

- Set **Authorization Callback URL** as `<your domain>/api/github-oauth`
- After creating the OAuth app, create a **client secret**.

#### Running Locally:

- Set the Authorization Callback URL as `http://localhost:3000/api/github-oauth` on GitHub.
- On `.env.local`, set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` as the **Client ID** of the OAuth app.
- Set `GITHUB_OAUTH_CLIENT_SECRET` as the **Client secret** of the OAuth app.
- Finally, make sure the `NEXT_PUBLIC_SITE_ORIGIN` environment variable is set as `http://localhost:3000`. This is required to get the OAuth popup to work locally.
- Restart the app (`yarn dev`) after editing `.env.local`.

Once it’s set up, sign up using the registration form on the home page (not on a stage page) and then click "Generate with GitHub".

#### On Vercel:

- Set the Authorization Callback URL as `<your deployment’s URL>/api/github-oauth` on GitHub.
- Set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET` on [Vercel Project Environment Variables Settings](https://vercel.com/docs/environment-variables) for the production environment.
- Edit `SITE_URL` in `lib/constants.ts` to match your deployment’s URL (no trailing slash).
- Push the code to redeploy the Project on Vercel.

### Database

You need a database to save user data and enable the following features:

- Generating a unique ticket number for each email when signing up on the registration form. If DB is not set up, it’ll always be `1234`.
- Generating a unique ticket image or ticket URL after signing in with GitHub. If DB is not set up, each ticket image or URL will show generic data.

The demo ([demo.vercel.events](https://demo.vercel.events)) uses [Redis](https://redis.io/), but you can customize it to use any database you like.

#### Running Redis Locally

1. Install Redis locally and run it.
2. Specify the following in `.env.local`:

```
REDIS_PORT=6379 # Default Redis port number
REDIS_URL=localhost
REDIS_PASSWORD=
REDIS_SSL_ENABLED=
REDIS_EMAIL_TO_ID_SECRET=foo # Come up with your own secret string
```

> `REDIS_EMAIL_TO_ID_SECRET` will be used to create a hash of the email address, which will be used for the Redis key for each user data (i.e. `id:<hash>`). See `lib/redis.ts` for details.

> If your Redis server has SSL (TLS) encryption enabled then set REDIS_SSL_ENABLED=true

3. Restart the app (`yarn dev`) after editing `.env.local`.
4. In a separate terminal window, start the Next.js dev server (`yarn dev`) and sign up using the registration form.
5. In a separate terminal window, run Redis CLI, list keys (`keys *`) and inspect a `id:<hash>` key (`hgetall id:<hash>`). You should see the newly registered user.

#### Using Redis On Vercel

Provision your own Redis instance and set `REDIS_PORT`, `REDIS_URL`, `REDIS_PASSWORD`, `REDIS_SSL_ENABLED` and `REDIS_EMAIL_TO_ID_SECRET` (come up with your own secret string) on [Vercel Project Environment Variables Settings](https://vercel.com/docs/environment-variables) for the production environment.

If you do not want to maintain a Redis server, you can use [Upstash](https://upstash.com) which provides Serverless Redis with a free tier.

## More Details

### Captcha

To help protect your event registration, we've added captcha validation (as an option) with hcaptcha. To use this, popular `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` and `HCAPTCHA_SECRET_KEY` in your `.env` file.

### Stages

There are four different stages included in the seed data. Feel free to add or remove these based on your schedule. Each stage requires the user to enter their email to register with the conference before entering the event. After successfully entering their email and saving the user with your database of choice, the user is able to view the embedded YouTube stream. The login state is persisted as a `httponly` cookie.

One major feature of the conference platform is a near real-time sync with the CMS. Every five seconds, the stage queries `/api/stages` to fetch the latest information from the CMS. This allows you to make changes on the fly, without the user having the refresh the page. No need for websockets.

The primary use case for this is updating the YouTube embedded URL. Next.js Conf used this to seamlessly switch between pre-recorded videos running as a live premiere, and truly live content (e.g. panels). Plus, we had a few instances where our schedule needed to be tweaked on the fly. This implementation is fault tolerant, as well. The API route is properly cached and if the CMS was to somewhow go down, it won't break the page.

### Schedule / Speaker Pages

Schedule and speaker information is hosted in the CMS. The demo ([demo.vercel.events](https://demo.vercel.events)) is seeded with images from Unsplash and a placeholder schedule. Each speaker has their own page with an image, bio, social media links, and information about their talk. The schedule is also shown as a sidebar on each corresponding stage.

### Sponsor Expo

If you'd like to have your event sponsored, the Expo provides a platform to showcase sponsors with:

- Their logo
- Four call-to-action links
- Embedded YouTube video
- Link to chat room (Discord)

For Next.js Conf, we created a Discord channel for each sponsor.

### Career Fair

Networking is vital for in-person conferences and replicating that environment virtually poses a challege. For the Career Fair, this starter provides the ability to list job postings, as well as an external link to talk with the company's recruiters on Discord.

## Adding Meilisearch to Event Starter Kit

1. Clone the project
```
git clone https://github.com/shivaylamba/NextJS-Event-Starter-Kit.git
```

2. Install all the dependencies for the project
```
yarn
```

3. Install and launch meilisearch server
```
# Install Meilisearch
curl -L https://install.meilisearch.com | sh

# Launch Meilisearch
./meilisearch
```

4. Update the `NEXT_PUBLIC_HOST_NAME` and `NEXT_PUBLIC_API_KEY` in `.env` file
```
NEXT_PUBLIC_HOST_NAME=http://localhost:7777

# Add Api key, if enabled
NEXT_PUBLIC_API_KEY=<API_KEY>
```

5. Open another terminal and seed the Meilisearch instance by:
```
yarn seed
```

6. Start the Nextjs server
```
yarn dev
```

Test out the server at http://localhost:3000
