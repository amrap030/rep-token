import asyncio
import aiohttp
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
from datetime import datetime
from pytz import timezone
import os

quotes = []

url = "{}quote?symbol={}&interval=5min&exchange=XETR&apikey={}"
host = os.environ.get('HOST')
api_key = os.environ.get('API_KEY')
gql_url = os.environ.get('GRAPHQL')
hasura_secret = os.environ.get('HASURA_SECRET')

symbols = ['ADS', 'ALV', 'BASA', 'BAYN', 'BMW', 'CON', '1COV', 'DAI', 'DHER', 'DBK', 'DB1', 'DPW', 'DTEA', 'DWNI', 'EOAA', 'FRE', 'FME', 'HEI', 'HEN', 'IFX', 'LIN', 'MRK', 'MTX', 'MUV2', 'RWE', 'SAP', 'SIE', 'ENR', 'VOW', 'VNA']

def get_tasks(session):
    tasks = []
    for symbol in symbols:
        tasks.append(asyncio.create_task(session.get(url.format(host, symbol, api_key), ssl=False)))
    return tasks

async def getQuotes():
    time = datetime.now(timezone('CET')).isoformat()
    async with aiohttp.ClientSession() as session:
        tasks = get_tasks(session)
        quote = await asyncio.gather(*tasks)
        for q in quote:
            data = await q.json()
            quotes.append({ "symbol": data['symbol'], "name": data['name'], "high": data['high'], "low": data['low'], "open": data['open'], "close": data['close'], "volume": data['volume'], "change": data['change'], "change_percent": data['percent_change'], "time": time })
        transport = AIOHTTPTransport(url=gql_url, headers={ 'x-hasura-admin-secret': hasura_secret })
        async with Client(transport=transport, fetch_schema_from_transport=True) as session:
            query = gql(
                """
                mutation insertStockQuotes($objects: [quotes_insert_input!]!) {
                    insert_quotes(objects: $objects) {
                        returning {
                            id
                        }
                    }
                }
            """
            )
            await session.execute(query, variable_values={ "objects": quotes })

def saveQuotes(request):
    asyncio.run(getQuotes())    