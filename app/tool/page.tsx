'use client'

import React, { useState, useEffect } from 'react'
// 階層が一つ深くなったので ../../ に修正済み
import { situations, theories } from '../../data/list'

interface SavedIdea {
  id: number;
  situation: string;
  theory: string;
  memo: string;
}

export default function ToolPage() {
  const [situation, setSituation] = useState("カードを引いてください")
  const [theory, setTheory] = useState("カードを引いてください")
  const [memo, setMemo] = useState("")
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('my-ideas')
    if (data) setSavedIdeas(JSON.parse(data))
    setIsLoaded(true)
  }, [])

  const drawCard = () => {
    const sIndex = Math.floor(Math.random() * situations.length)
    const tIndex = Math.floor(Math.random() * theories.length)
    setSituation(situations[sIndex])
    setTheory(theories[tIndex])
    setMemo("")
  }

  const saveIdea = () => {
    if (situation === "カードを引いてください" || !memo) return;
    const newIdea = { id: Date.now(), situation, theory, memo }
    const newList = [newIdea, ...savedIdeas]
    setSavedIdeas(newList)
    localStorage.setItem('my-ideas', JSON.stringify(newList))
    setMemo("")
  }

  if (!isLoaded) return null;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-4 md:p-12 text-black">
      <Link href="/" className="self-start mb-8 text-blue-600">← ブランドサイトへ戻る</Link>
      <h1 className="text-2xl font-bold mb-8">行動経済学アイディア出しツール</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-72 h-40 bg-white border-2 border-blue-400 rounded-xl flex flex-col items-center justify-center p-4 text-center shadow">
          <span className="text-xs font-bold text-blue-500 mb-1 uppercase">Situation</span>
          <p className="font-medium">{situation}</p>
        </div>
        <div className="w-full md:w-72 h-40 bg-white border-2 border-green-400 rounded-xl flex flex-col items-center justify-center p-4 text-center shadow">
          <span className="text-xs font-bold text-green-500 mb-1 uppercase">Theory</span>
          <p className="font-medium">{theory}</p>
        </div>
      </div>
      <button onClick={drawCard} className="mb-8 px-8 py-3 bg-black text-white rounded-full font-bold">カードを引く</button>
      {situation !== "カードを引いてください" && (
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md mb-12">
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="アイディアを入力..." className="w-full p-3 border rounded-lg mb-4 h-24" />
          <button onClick={saveIdea} className="w-full py-2 bg-blue-500 text-white rounded-lg font-bold">保存する</button>
        </div>
      )}
    </main>
  )
}

// Linkコンポーネントを有効にするため
import Link from 'next/link'