# Cron Job 2

This folder of the mono repository contains a `main.py` file, which is used in a Google Cloud function, called by a Google Cloud Scheduler. It is scheduled on Monday - Friday 08:00 pm to remove all rows from the oldest day, because Hasura only allows 10.000 rows in the free plan:

- **Job 1**: `0 20 * * 1-5` - At 08:00 PM, Monday through Friday

**Calculation:**

```
opening time = 8 hours 30 minutes (09:00 am until 05:30 pm)
30 stocks each 5 minutes = 360 requests/hour = 3060 requests/opening time
3060 requests/opening time * 3 days = 9180 requests
```

We will reach 9180 rows in 3 days, so after 3 days, we have to remove the oldest day. This means, we will always have at least data of two days in the frontend.
