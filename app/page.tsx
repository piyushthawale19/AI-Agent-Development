'use client'

import { useState } from 'react'

export default function Home() {
  const [topic, setTopic] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [journal, setJournal] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const generateMockResults = (userTopic: string) => {
    const topicVariations = {
      'sustainable fashion': {
        interpretedTopic: "Exploring eco-friendly materials and ethical supply chains shaping fashion in 2025.",
        targetAudience: ["Fashion enthusiasts", "Sustainability-conscious shoppers", "Brand marketers"],
        writingGoal: "Educate readers and drive awareness with practical insights.",
        seoKeywords: ["sustainable fashion", "ethical supply chain", "eco-friendly fabrics", "2025 trends"],
        finalPrompt: "Write a comprehensive blog post exploring the top sustainable fashion trends of 2025, focusing on eco-friendly materials, ethical manufacturing, and brand transparency. Include practical tips for consumers and highlight emerging brands setting new standards.",
        suggestedHeadings: [
          "Why Sustainability Defines Fashion in 2025",
          "Materials That Matter: From Hemp to Recycled Polyester",
          "Ethical Supply Chains: How Brands Are Evolving",
          "Consumer Guide: Shopping More Sustainably"
        ],
        toneSuggestions: ["Educational", "Optimistic", "Practical", "Data-informed"]
      },
      'default': {
        interpretedTopic: `Analyzing the key aspects and implications of ${userTopic} in today's context.`,
        targetAudience: ["Industry professionals", "Curious learners", "Decision makers"],
        writingGoal: "Inform and engage readers with comprehensive insights and actionable takeaways.",
        seoKeywords: [userTopic.toLowerCase(), "industry trends", "best practices", "expert analysis"],
        finalPrompt: `Create an in-depth blog post about ${userTopic}, covering current trends, challenges, opportunities, and practical applications. Include expert insights, case studies, and actionable recommendations for readers looking to understand and implement related strategies.`,
        suggestedHeadings: [
          `Understanding ${userTopic}: A Comprehensive Overview`,
          "Current Trends and Market Dynamics",
          "Challenges and Solutions",
          "Practical Implementation Strategies"
        ],
        toneSuggestions: ["Professional", "Insightful", "Action-oriented", "Comprehensive"]
      }
    }

    const key = Object.keys(topicVariations).find(k => userTopic.toLowerCase().includes(k)) || 'default'
    return topicVariations[key as keyof typeof topicVariations]
  }

  const processingSteps = [
    {
      title: "Input Understanding",
      logs: [
        "Parsing user input and extracting key concepts...",
        "Identifying topic domain and context...",
        "Analyzing semantic intent and scope...",
        "Topic classification complete."
      ]
    },
    {
      title: "State Tracker",
      logs: [
        "Determining target audience segments...",
        "Establishing writing goals and objectives...",
        "Analyzing tone and style preferences...",
        "State parameters initialized."
      ]
    },
    {
      title: "Task Planner",
      logs: [
        "Generating content structure outline...",
        "Planning section hierarchy and flow...",
        "Identifying SEO optimization opportunities...",
        "Content architecture ready."
      ]
    },
    {
      title: "Output Generator",
      logs: [
        "Synthesizing final writing prompt...",
        "Generating suggested headings...",
        "Determining optimal tone and style...",
        "Finalizing SEO keywords and metadata...",
        "Output generation complete."
      ]
    }
  ]

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const handleRunAgent = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic to continue.")
      setTimeout(() => setError(null), 3000)
      return
    }

    setIsRunning(true)
    setResults(null)
    setJournal([])
    setCurrentStep(0)
    setError(null)

    try {
      // Simulate random errors for demonstration (10% chance)
      if (Math.random() < 0.1 && retryCount < 2) {
        throw new Error("Network timeout occurred")
      }

      for (let stepIndex = 0; stepIndex < processingSteps.length; stepIndex++) {
        const step = processingSteps[stepIndex]
        setCurrentStep(stepIndex + 1)
        
        setJournal(prev => [...prev, `=== ${step.title} ===`])
        await sleep(300)

        for (let logIndex = 0; logIndex < step.logs.length; logIndex++) {
          const log = step.logs[logIndex]
          const delay = logIndex === step.logs.length - 1 ? 800 : 600 + Math.random() * 400
          
          setJournal(prev => [...prev, log])
          await sleep(delay)
        }

        if (stepIndex < processingSteps.length - 1) {
          await sleep(500)
        }
      }

      await sleep(600)
      const mockResults = generateMockResults(topic)
      setResults(mockResults)
      
      setJournal(prev => [...prev, "=== Results Ready ===", "All processing steps completed successfully."])
      setRetryCount(0)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      setJournal(prev => [...prev, `❌ Error: ${errorMessage}`])
      setRetryCount(prev => prev + 1)
    } finally {
      setIsRunning(false)
      setCurrentStep(0)
    }
  }

  const handleReset = () => {
    setTopic('')
    setResults(null)
    setJournal([])
    setError(null)
    setRetryCount(0)
    setCurrentStep(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <header className="px-6 py-10 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100 animate-fadeIn">
            AI Blog Prompt Agent
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl animate-slideUp">
            Turn Any Topic into a Perfect Blog Prompt with AI
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 md:text-base animate-slideUp animation-delay-200">
            Our 4-layer agent analyzes your topic, plans structure, and returns SEO-friendly prompts ready for publishing.
          </p>
        </div>
      </header>

      <main className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {/* Flow Visualization */}
          <section className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-slate-900">4-Step AI Flow</h2>
              <p className="mt-1 text-sm text-slate-600">
                A simple, reliable pipeline from topic to SEO-ready prompt.
              </p>
              <ol className="mt-6 space-y-4">
                {processingSteps.map((step, index) => (
                  <li 
                    key={index} 
                    className={`flex items-start gap-3 transition-all duration-500 hover:scale-105 ${
                      currentStep > index ? 'opacity-100' : currentStep === index + 1 ? 'opacity-100 scale-105' : 'opacity-60'
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold transition-all duration-500 ${
                      currentStep > index + 1 ? 'bg-green-600 text-white shadow-lg' : 
                      currentStep === index + 1 ? 'bg-indigo-600 text-white animate-pulse shadow-lg' : 
                      'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}>
                      {currentStep > index + 1 ? '✓' : index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">{step.title}</p>
                      <p className="text-sm text-slate-600">
                        {index === 0 && "Interpret your topic, context, and constraints."}
                        {index === 1 && "Track audience, goals, tone, and keywords."}
                        {index === 2 && "Plan headings, sections, and content outline."}
                        {index === 3 && "Produce a polished, SEO-friendly writing prompt."}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Info Sections */}
            <div className="mt-8 grid gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-semibold text-slate-900">How It Works</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Enter any blog topic, and our agent runs through four architecture layers to deliver a refined prompt,
                  suggested headings, and tone guidance. Designed to be fast, reliable, and clear.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-semibold text-slate-900">Who It's For</h3>
                <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                  {["Bloggers", "Content Creators", "Marketers"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 hover:bg-slate-50 rounded-lg p-2 transition-colors duration-200">
                      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Interactive Area */}
          <section className="lg:col-span-2 space-y-8">
            {/* Error Alert */}
            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-200 p-4 animate-slideDown">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">⚠️</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Processing Error</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                    {retryCount > 0 && (
                      <p className="text-xs text-red-600 mt-2">Retry attempt {retryCount}/3</p>
                    )}
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Input Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-lg font-semibold text-slate-900">Enter Your Topic</h2>
              <p className="mt-1 text-sm text-slate-600">Describe your idea, product, trend, or concept.</p>
              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  placeholder="e.g., Sustainable fashion trends for 2025"
                  aria-label="Blog topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isRunning}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleRunAgent}
                  disabled={isRunning || !topic.trim()}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  {isRunning ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Running...
                    </span>
                  ) : (
                    'Run Agent'
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Tip: Add target audience or platform for better results.
                </p>
                {(results || journal.length > 0) && (
                  <button
                    onClick={handleReset}
                    className="text-xs text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                  >
                    Clear Results
                  </button>
                )}
              </div>
            </div>

            {/* Results Panels */}
            <div className={`grid gap-6 md:grid-cols-2 transition-all duration-700 ${
              results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-semibold text-slate-900">Interpreted Topic</h3>
                <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200">
                  {results?.interpretedTopic}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-semibold text-slate-900">Target Audience</h3>
                <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                  {results?.targetAudience.map((audience: string, idx: number) => (
                    <li 
                      key={idx} 
                      className="rounded-lg bg-slate-50 p-3 hover:bg-slate-100 transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-semibold text-slate-900">Writing Goal</h3>
                <p className="mt-2 text-sm text-slate-700">{results?.writingGoal}</p>
                <h3 className="mt-5 text-base font-semibold text-slate-900">SEO Keywords</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {results?.seoKeywords.map((keyword: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100 hover:bg-indigo-100 transition-colors duration-200 cursor-pointer hover:scale-105"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-base font-semibold text-slate-900">Final Writing Prompt</h3>
                <p className="mt-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200">
                  {results?.finalPrompt}
                </p>
                <h3 className="mt-5 text-base font-semibold text-slate-900">Suggested Headings</h3>
                <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                  {results?.suggestedHeadings.map((heading: string, idx: number) => (
                    <li 
                      key={idx} 
                      className="rounded-lg bg-slate-50 p-3 hover:bg-slate-100 transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                      {heading}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-5 text-base font-semibold text-slate-900">Tone Suggestions</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {results?.toneSuggestions.map((tone: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100 hover:bg-emerald-100 transition-colors duration-200 cursor-pointer hover:scale-105"
                    >
                      {tone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent Journal */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Process View · Agent Journal</h2>
                <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                  <span className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isRunning ? 'animate-pulse bg-indigo-500' : 
                    journal.length > 0 && !isRunning ? 'bg-green-500' : 
                    'bg-slate-400'
                  }`} />
                  {isRunning ? `Step ${currentStep}/4` : journal.length > 0 ? 'Complete' : 'Idle'}
                </span>
              </div>
              <div className="mt-4 grid gap-3 text-sm max-h-96 overflow-y-auto">
                {journal.length === 0 && !isRunning ? (
                  <div className="rounded-lg bg-slate-50 p-4 text-slate-500 text-center">
                    <span className="text-2xl mb-2 block">🤖</span>
                    Enter a topic and run the agent to see the processing steps here.
                  </div>
                ) : (
                  journal.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-4 animate-fadeIn hover:shadow-sm transition-all duration-200 ${
                        entry.startsWith('===') ? 
                          'bg-indigo-50 text-indigo-900 font-semibold border-l-4 border-indigo-400' : 
                          entry.includes('❌') ?
                          'bg-red-50 text-red-700 border-l-4 border-red-400' :
                          'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      {entry.startsWith('===') ? (
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-600">🔍</span>
                          {entry.replace(/===/g, '').trim()}
                        </div>
                      ) : entry.includes('❌') ? (
                        <div className="flex items-center gap-2">
                          <span>❌</span>
                          {entry.replace('❌ Error:', '').trim()}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">▸</span>
                          {entry}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-slate-500 md:flex-row">
              <div className="flex items-center gap-3">
                {["Save Prompt", "Export to Docs", "History"].map((item, idx) => (
                  <a 
                    key={idx}
                    className="rounded-md px-2 py-1 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 hover:scale-105" 
                    href="#"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <p className="flex items-center gap-2">
                <span className="text-slate-400">©</span>
                {new Date().getFullYear()} AI Blog Prompt Agent
              </p>
            </footer>
          </section>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  )
}
