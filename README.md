# The Grand Exchanger - OSRS Trading Tool
Simple web app tool for one of my favorite games of all time: Old School RuneScape.

This tool is useful for getting hourly data from the Grand Exchange. It lists all items, buy and sell prices, margin and volume.
Through the UI filter, you can quickly and easily find potential lucrative trades in Old School RuneScape. 

_**CREATED with Vite + React-TS**_

## How to use (for now)
1. Fetch/clone this repo to your local directory
3. Run 'npm install'
4. Run 'npm run dev'
5. Go to http://localhost:5173/ (default)

## Future plans (when time)
1. Click item for additional details, incl. latest trade prices. And/or link to item page on prices.runescape.wiki
2. Add item sets: a list of individual items buy prices and possible profit when selling sets of these items (e.g. Barrows equipment).
3. Same as above, but for smithing / craftable items
4. Add (simple) accounts: keep track of your own trades and progress. Also add favorite trade items in your account. This will require connection to a database.
5. ... ?

## API end-point used
prices.runescape.wiki/api/v1/osrs
