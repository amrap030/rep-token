# Cron Job

This folder of the mono repository contains a `main.py` file, which is used in a Google Cloud function, called by a Google Cloud Scheduler. The scheduler is based on the stock exchange hours of the german stock exchanges _Xetra_ & _Frankfurt_ with the following schedules:

- **Job 1**: `*/5 9-16 * * 1-5` - Every 5 minutes, between 09:00 AM and 04:59 PM, Monday through Friday
- **Job 2**: `0,5,10,15,20,25,30 17 * * 1-5` - At 0, 5, 10, 15, 20, 25, and 30 minutes past the hour, at 05:00 PM, Monday through Friday
