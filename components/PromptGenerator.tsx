'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const prompts = {
  ecommerce: [
    "Write a high-converting product description for [PRODUCT] targeting [AUDIENCE]. Include 3 bullet benefits, urgency trigger, and FAQ.",
    "Create abandoned cart email sequence (3 emails) for [PRODUCT] with subject lines above 40% open rate."
  ],
  saas: [
    "Generate LinkedIn post announcing [FEATURE] launch for [PRODUCT]. Include hook, 3 benefits, social proof, CTA.",
    "Write churn reduction email for [PRODUCT] users who haven't logged in 14 days."
  ],
  // Add more from previous table...
}

export default function PromptGenerator({ niche, setPrompt }: any) {
  const [selectedPrompt, setSelectedPrompt] = useState(0)

  useEffect(() => {
    setPrompt(prompts[niche as keyof typeof prompts]?.[0] || '')
  }, [niche])

  return (
    <div className="space-y-6">
      <select 
        className="w-full p-4 bg-white/20 rounded-2xl text-xl"
        onChange={(e) => {
          setSelectedPrompt(Number(e.target.value))
          setPrompt(prompts[niche as keyof typeof prompts]?.[Number(e.target.value)] || '')
        }}
      >
        {prompts[niche as keyof typeof prompts]?.map((p, i) => (
          <option key={i} value={i}>{p.slice(0, 60)}...</option>
        ))}
      </select>
      
      <motion.textarea
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        className="w-full p-6 bg-white text-gray-900 rounded-2xl text-lg font-mono min-h-[200px] resize-none"
        value={prompts[niche as keyof typeof prompts]?.[selectedPrompt] || ''}
        readOnly
      />
    </div>
  )
}
