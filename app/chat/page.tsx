"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Database, Search, Cpu, MessageSquare, Terminal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const SUGGESTED_QUERIES = [
  "Who won the most matches in IPL 2011?",
  "Which venue hosted the most matches in 2015?",
  "Who was the Player of the Match in the 2013 final?",
  "How many matches did Mumbai Indians win in 2019?",
]

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleQuery = async (query: string) => {
    if (!query.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: query }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      })

      const data = await response.json()
      
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.llm_answer }])
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: System failed to retrieve context from Vector DB." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col">
      {/* Header Section */}
      <section className="py-8 border-b border-dashed border-border px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-border bg-background">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">RAG Intelligence</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Cricket-Bot</h1>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Natural Language Interface for IPL Historical Datasets</p>
          </div>
          <div className="flex gap-4 border-l border-dashed border-border pl-6 hidden lg:flex">
             <div className="text-right">
                <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">Vector Store</p>
                <p className="text-xs font-black">ChromaDB</p>
             </div>
             <div className="text-right">
                <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">Engine</p>
                <p className="text-xs font-black">Gemini 1.5 Flash</p>
             </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Sidebar: Technical Architecture (Great for Viva) */}
        <div className="lg:col-span-3 border-r border-dashed border-border p-6 hidden lg:block space-y-8">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Pipeline Status</h3>
            <div className="space-y-4">
              {[
                { label: 'Data Ingestion', icon: Database, status: 'Complete' },
                { label: 'Chunking (Size: 20)', icon: Search, status: 'Active' },
                { label: 'Embedding (all-MiniLM)', icon: Cpu, status: 'Online' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-primary/60" />
                  <div>
                    <p className="text-[11px] font-bold uppercase leading-none mb-1">{item.label}</p>
                    <p className="text-[9px] font-mono text-emerald-500 uppercase">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-dashed">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Major Project Brief</h3>
            <p className="text-[10px] font-medium leading-relaxed text-muted-foreground uppercase tracking-tight">
              This module implements Retrieval-Augmented Generation to mitigate LLM hallucinations. 
              By querying a local vector store containing match-level CSV data, the assistant provides 
              mathematically verified historical facts rather than generative guesswork.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-9 flex flex-col h-[70vh]">
          <ScrollArea className="flex-grow p-6" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-12">
                <div className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-muted-foreground/40" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Awaiting Query</h3>
                  <p className="text-xs text-muted-foreground max-w-[280px] uppercase font-medium">Ask specific questions about IPL seasons, winners, or match venues.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-lg px-4">
                  {SUGGESTED_QUERIES.map((q, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleQuery(q)}
                      className="text-left p-3 border border-dashed rounded-lg text-[10px] font-bold uppercase tracking-wide hover:border-primary transition-colors bg-background"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-4 ${m.role === 'assistant' ? 'bg-muted/30 p-4 rounded-xl border border-dashed' : ''}`}>
                    <div className="mt-1">
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {m.role === 'user' ? 'Request' : 'System Response'}
                      </p>
                      <p className="text-sm font-medium leading-relaxed tracking-tight">{m.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 animate-pulse">
                    <Terminal className="w-4 h-4 text-primary" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Synthesizing Context...</p>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 border-t border-dashed border-border bg-background">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleQuery(input); }}
              className="relative max-w-4xl mx-auto"
            >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query the IPL database..."
                className="w-full bg-background border-2 border-border rounded-xl h-14 pl-6 pr-16 text-sm font-semibold focus:border-primary outline-none transition-all"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-center mt-4 text-[9px] font-bold uppercase text-muted-foreground tracking-widest">
              Verified Contextual Retrieval Active
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}