const webhook = process.env.DISCORD_WEBHOOK!

const resp = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCEUR")
if (!resp.ok) {
  throw new Error(`Binance API error: ${resp.status} ${resp.statusText}`)
}
const data = await resp.json() as { price?: string }
const price = data?.price ? parseFloat(data.price) : undefined
if (price === undefined) {
  throw new Error(`Unexpected response: ${JSON.stringify(data)}`)
}

await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: `BTC: ${price} EUR` }),
})

console.log(`[INFO] service=aboba-btc-ds BTC: ${price} EUR. Sent to Discord.`)