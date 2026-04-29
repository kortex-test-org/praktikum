const webhook = process.env.DISCORD_WEBHOOK!

const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur")
const data = await resp.json() as { bitcoin: { eur: number } }
const price = data.bitcoin.eur

await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: `BTC: ${price} EUR` }),
})

console.log(`[INFO] service=btcbot BTC: ${price} EUR. Sent to Discord.`)