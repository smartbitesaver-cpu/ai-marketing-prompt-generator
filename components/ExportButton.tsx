'use client'
import { motion } from 'framer-motion'
import { Copy, Download } from 'lucide-react'

export default function ExportButton({ prompt }: any) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt)
    // Add toast notification here
  }

  return (
    <div className="flex gap-4 pt-8 border-t border-white/20">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="flex-1 bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
      >
        <Copy className="w-5 h-5" /> Copy to ChatGPT
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-white/20 backdrop-blur-xl px-8 py-4 rounded-2xl font-bold hover:bg-white/30"
      >
        <Download className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
