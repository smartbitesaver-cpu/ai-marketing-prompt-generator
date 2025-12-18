'use client'
import { useState, useEffect } from 'react'

const niches = {
  ecommerce: { name: 'E-commerce', icon: '🛒', color: 'from-orange-500 to-pink-500' },
  saas: { name: 'SaaS/B2B', icon: '💼', color: 'from-blue-500 to-indigo-600' },
  local: { name: 'Local Biz', icon: '🏪', color: 'from-green-500 to-teal-500' },
  influencer: { name: 'Influencer', icon: '📱', color: 'from-purple-500 to-pink-500' },
  nonprofit: { name: 'Non-Profit', icon: '❤️', color: 'from-red-500 to-orange-500' }
}

export default function NicheSelector({ niche, setNiche }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {Object.entries(niches).map(([key, data]: any) => (
        <button
          key={key}
          onClick={() => setNiche(key)}
          className={`p-6 rounded-2xl transition-all duration-300 ${
            niche === key 
              ? `bg-gradient-to-r ${data.color} shadow-xl scale-105` 
              : 'bg-white/20 hover:bg-white/30 hover:scale-105'
          }`}
        >
          <div className="text-2xl mb-2">{data.icon}</div>
          <div className="font-semibold">{data.name}</div>
        </button>
      ))}
    </div>
  )
}
