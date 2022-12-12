This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# **Screen Id**
![preview](https://i.imgur.com/J16nUeY.png)

# BACKEND

## Environment Variables
You need a PosgreSQL database to fill the information of the environments starting with PG.

```
PGPASSWORD=
PGDATABASE=
PGHOST=
PGPORT=
PGUSER=
PORT=
JWT_SECRET=
STAGE= #dev || #prod
```

***A PostgreSQL database can be created with docker with the docker-compose file provided in this repo***
```
docker-compose up -d
```

## Run backend

```bash
npm run start:dev
# or
yarn start:dev
```

# FRONTEND

## Environment Variables
First, you need an API key from [TMDB](https://www.themoviedb.org) and back-end deployment to create a .env that look like this:

```
NEXT_PUBLIC_TMDB=
NEXT_PUBLIC_BACKEND=
```

## Start frontend

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
