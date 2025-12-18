'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import NicheSelector from '../components/NicheSelector'
import PromptGenerator from '../components/PromptGenerator'
import ExportButton from '../components/ExportButton'

export default function Home() {
  const [niche, setNiche] = useState('ecommerce')
  const [prompt, setPrompt] = useState('')

  return (
    <main className="min-h-screen gradient-bg text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-16"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-6xl md:text-7xl font-black text-center mb-8 drop-shadow-2xl"
        >
          🚀 AI Marketing <span className="text-yellow-300">Prompt</span> Genius
        </motion.h1>
        
        <p className="text-xl md:text-2xl text-center mb-16 opacity-90 max-w-3xl mx-auto">
          From blank page to viral campaign in <span className="text-yellow-300">seconds</span>. 
          50+ niches. ChatGPT-ready prompts.
        </p>

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl">
          <NicheSelector niche={niche} setNiche={setNiche} />
          <PromptGenerator niche={niche} setPrompt={setPrompt} />
          <ExportButton prompt={prompt} />
        </div>
      </motion.div>
    </main>
  )
}
