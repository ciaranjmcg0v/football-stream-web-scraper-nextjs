This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Change Log

  

 

> 2dd1a4d3-4b6a-4c78-aca8-09fc657e1b75

**Initial build of this project**.

 - Implemented a web scraping tool using [cheerio](https://github.com/cheeriojs/cheerio) and [axios](https://github.com/axios/axios) to scrape a football streaming site 'https://socceronline.me/football-streams' and return available live stream URL's.
 
 - After retrieving a list of available live streams, I store them in a global store using [zustand](https://github.com/pmndrs/zustand) then add the available live streams to a select list styled using [shadcn](https://github.com/shadcn-ui/ui).

 - Once the select list is populated and a user chooses a live stream, the URL of the live stream is set as the source of an iframe, which is rendered below the select list and the live stream can begin.


> Screenshots

Fetching Links
![Fetching Links](https://onedrive.live.com/embed?resid=6E65D15292C05867!2516767&authkey=!AMVLEwVIirW_iVE&width=1920&height=828)

Stream Select
![Stream Select](https://onedrive.live.com/embed?resid=6E65D15292C05867!2516764&authkey=!AE-a2PPnY4uVyOQ&width=1920&height=823)

List of all Streams
![List of all Streams](https://onedrive.live.com/embed?resid=6E65D15292C05867!2516766&authkey=!AKc8JfSeQmgh3Xw&width=1920&height=826)

Live Stream Viewer
![Live Stream Viewer](https://onedrive.live.com/embed?resid=6E65D15292C05867!2516765&authkey=!AHEl-VFozrHJqOI&width=1920&height=824)

> To Do

 - [ ] Convert iframe into video?
 - [ ] Redesign layout and styling for mobile
 - [ ] Search bar to search available matches and select from results 

