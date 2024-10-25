# Connecting to Supabase and Querying Data

This is a practice repository for the course Web Servers and Databases at Changemaker Educations.

## About the Repository

- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
- It uses TypeScript and Tailwind CSS.

### Server and browser client

This weeks version of the practice repository has been converted to only use the server supabase client and route handlers, instead of mixing the use of the server and browser client.

- Check out `@/app/api` to see the newly created [route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).
- Note that `@/utils/supabase/client` has been deleted
- Changes have been made to `@/utils/supabase/queries` and the query functions in `SearchBar` and `HomePosts` to work with route handlers

#### This change is not obligatory to do in your own repository

But it is very common that database clients don't have a broswer version and creating a route handler where you use the server client to fetch data is the way to handle that in Next.js

## Getting Started

First, install the dependencies and run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
