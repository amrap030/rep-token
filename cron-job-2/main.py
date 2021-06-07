import asyncio
import aiohttp
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
import datetime
from datetime import datetime, timedelta
from pytz import timezone
import os

gql_url = os.environ.get('GRAPHQL')
hasura_secret = os.environ.get('HASURA_SECRET')

async def removeOldestQuotes():
    today = datetime.now().astimezone(timezone('Europe/Berlin'))
    delta = ""
    if today.weekday() == 0:
        delta = timedelta(days=4)
    elif today.weekday() == 1:
        delta = timedelta(days=3)
    else:
        delta = timedelta(days=2)
    date = today - delta
    transport = AIOHTTPTransport(url=gql_url, headers={ 'x-hasura-admin-secret': hasura_secret })
    async with Client(transport=transport, fetch_schema_from_transport=True) as session:
        query = gql(
            """
            mutation deleteStockQuotes($time: timestamptz!) {
                delete_quotes(where: {time: { _lt: $time }}) {
                    returning {
                        id
                    }
                }
            }
        """
        )
        params = {
            "time": date.isoformat()
        }
        await session.execute(query, variable_values=params)

def removeQuotes(request):
    asyncio.run(removeOldestQuotes())