import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("https://icppu-production.up.railway.app/data") // 替换成你真实 API 地址
      .then(res => res.json())
      .then(json => {
        const formatted = json.prices.map((price, i) => ({
          day: i + 1,
          price: price,
          volatility: json.rolling_vols[i]
        }))
        setData(formatted)
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
