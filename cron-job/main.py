import asyncio
import aiohttp
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
import datetime
import os

url = "{}quote?symbol={}&apikey={}"
host = os.environ.get('HOST')
api_key = os.environ.get('API_KEY')
gql_url = os.environ.get('GRAPHQL')
hasura_secret = os.environ.get('HASURA_SECRET')

def get_tasks(session):
    tasks = []
    tasks.append(asyncio.create_task(session.get(url.format(host, "AAPL", api_key), ssl=False)))
    return tasks

async def getQuotes():
    async with aiohttp.ClientSession() as session:
        tasks = get_tasks(session)
        quote = await asyncio.gather(*tasks)
        for q in quote:
            data = await q.json()
            transport = AIOHTTPTransport(url=gql_url, headers={ 'x-hasura-admin-secret': hasura_secret })
            async with Client(transport=transport, fetch_schema_from_transport=True) as session:
                query = gql(
                    """
                    mutation insertStockQuotes($symbol: String!, $name: String!, $high: String!, $low: String!, $open: String!, $close: String!, $volume: String!, $change: String!, $change_percent: String!, $time: timestamptz!) {
                        insert_Stock_Quotes(objects: { symbol: $symbol, name: $name, high: $high, low: $low, open: $open, close: $close, volume: $volume, change: $change, change_percent: $change_percent, time: $time }) {
                            returning {
                                id
                            }
                        }
                    }
                """
                )
                params = {
                    "symbol": data['symbol'],
                    "name": data['name'],
                    "high": data['high'],
                    "low": data['low'],
                    "open": data['open'],
                    "close": data['volume'],
                    "volume": data['volume'],
                    "change": data['change'],
                    "change_percent": data['percent_change'],
                    "time": datetime.datetime.now().astimezone().isoformat()
                }
                await session.execute(query, variable_values=params)

def saveQuotes(request):
    asyncio.run(getQuotes())