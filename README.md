# Talent Recruitment - Raja Choudhary

Next.js recruitment form with a MongoDB-backed applicant dashboard.

## Vercel Setup

Add these environment variables in the Vercel project settings:

```text
MONGODB_URI=mongodb+srv://...
MONGODB_DB=raja_recruitment
ADMIN_PASSWORD=replace-with-a-strong-password
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
```

`MONGODB_URI` must be a MongoDB Atlas application connection string. A local
address such as `mongodb://127.0.0.1:27017` cannot be reached from Vercel.

After changing Vercel environment variables, redeploy the production
deployment. In MongoDB Atlas, create a database user and configure the Atlas IP
access list so the deployed app can connect.
