'use client'

import { useState, useEffect } from 'react'
import { situations, theories } from '../data/list'

// アイディアの型定義
interface SavedIdea {
  id: number;
  situation: string;
  theory: string;
  memo: string;
}

export default function Home() {
  const [situation, setSituation] = useState("カードを引いてください")
  const [theory, setTheory] = useState("カードを引いてください")
  const [memo, setMemo] = useState("")
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([])

  // 【機能1】ページ読み込み時に保存されたアイディアを読み込む
  useEffect(() => {
    const data = localStorage.getItem('my-ideas')
    if (data) setSavedIdeas(JSON.parse(data))
  }, [])

  // カードを引く
  const drawCard = () => {
    const sIndex = Math.floor(Math.random() * situations.length)
    const tIndex = Math.floor(Math.random() * theories.length)
    setSituation(situations[sIndex])
    setTheory(theories[tIndex])
    setMemo("") // 新しいカードを引いたらメモをリセット
  }

  // 【機能2】アイディアを保存する
  const saveIdea = () => {
    if (situation === "カードを引いてください" || !memo) return;
    
    const newIdea: SavedIdea = {
      id: Date.now(),
      situation,
      theory,
      memo
    }
    
    const newList = [newIdea, ...savedIdeas]
    setSavedIdeas(newList)
    localStorage.setItem('my-ideas', JSON.stringify(newList))
    setMemo("") // 保存したら入力をクリア
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-4 md:p-12">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">行動経済学アイディア出しツール</h1>
      
      {/* カードエリア */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-72 h-40 bg-white border-2 border-blue-400 rounded-xl flex flex-col items-center justify-center p-4 text-center shadow">
          <span className="text-xs font-bold text-blue-500 mb-1">SITUATION</span>
          <p className="text-gray-800 font-medium">{situation}</p>
        </div>
        <div className="w-full md:w-72 h-40 bg-white border-2 border-green-400 rounded-xl flex flex-col items-center justify-center p-4 text-center shadow">
          <span className="text-xs font-bold text-green-500 mb-1">THEORY</span>
          <p className="text-gray-800 font-medium">{theory}</p>
        </div>
      </div>

      <button onClick={drawCard} className="mb-8 px-8 py-3 bg-black text-white rounded-full font-bold hover:opacity-80 transition">
        カードを引く
      </button>

      {/* アイディア入力エリア */}
      {situation !== "カードを引いてください" && (
        <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md mb-12">
          <h2 className="font-bold mb-4 text-gray-700">アイディアをメモする</h2>
          <textarea 
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="ここにアイディアを書いてください..."
            className="w-full p-3 border rounded-lg mb-4 text-gray-700 h-24 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button onClick={saveIdea} className="w-full py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">
            保存する
          </button>
        </div>
      )}

      {/* 保存済みリスト */}
      <div className="w-full max-w-2xl">
        <h2 className="font-bold mb-4 text-gray-700 border-b pb-2">保存されたアイディア ({savedIdeas.length})</h2>
        <div className="space-y-4">
          {savedIdeas.map((idea) => (
            <div key={idea.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-400 text-gray-700">
              <div className="text-xs text-gray-500 mb-1">
                {idea.situation} × {idea.theory}
              </div>
              <div className="font-medium whitespace-pre-wrap">{idea.memo}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}