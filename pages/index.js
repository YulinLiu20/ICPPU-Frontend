import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log("🔥 useEffect triggered")
    fetch("https://icppu-production.up.railway.app/data")
      .then(res => {
        console.log("📦 Fetch status:", res.status)
        return res.json()
      })
      .then(json => {
        console.log("📈 Received JSON:", json)
        const formatted = json.prices.map((price, i) => ({
          day: i + 1,
          price,
          volatility: json.rolling_vols[i]
        }))
        setData(formatted)
      })
      .catch(err => {
        console.error("❌ Fetch failed:", err)
      })
  }, [])

  if (!data) return <p>Loading...</p>

  return (
    <div style={{ width: '100%', height: '100vh', padding: 32 }}>
      <h1>ICP Dashboard</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price (USD)" />
          <Line type="monotone" dataKey="volatility" stroke="#82ca9d" name="Volatility" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
