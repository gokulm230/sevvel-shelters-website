"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  showCursor?: boolean
  onComplete?: () => void
  repeat?: boolean
  repeatDelay?: number
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 100, 
  className = "", 
  showCursor = true,
  onComplete,
  repeat = false,
  repeatDelay = 3000
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursorBlink, setShowCursorBlink] = useState(true)
  const [isErasing, setIsErasing] = useState(false)

  useEffect(() => {
    if (!isErasing && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, currentIndex === 0 ? delay : speed)

      return () => clearTimeout(timeout)
    } else if (!isErasing && !isComplete) {
      setIsComplete(true)
      onComplete?.()
      
      // Start repeat cycle if enabled
      if (repeat) {
        setTimeout(() => {
          setIsErasing(true)
          setIsComplete(false)
        }, repeatDelay)
      } else if (showCursor) {
        setTimeout(() => {
          setShowCursorBlink(false)
        }, 2000)
      }
    } else if (isErasing && displayedText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1))
      }, speed / 2) // Erase faster than typing

      return () => clearTimeout(timeout)
    } else if (isErasing && displayedText.length === 0) {
      // Reset for next cycle
      setIsErasing(false)
      setCurrentIndex(0)
      setTimeout(() => {
        // Small delay before starting next cycle
      }, 500)
    }
  }, [currentIndex, text, delay, speed, isComplete, onComplete, showCursor, repeat, repeatDelay, isErasing, displayedText])

  return (
    <motion.span 
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayedText}
      {showCursor && showCursorBlink && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      )}
    </motion.span>
  )
}

interface TypewriterLinesProps {
  lines: string[]
  delay?: number
  speed?: number
  lineDelay?: number
  className?: string
  showCursor?: boolean
  lineColors?: string[]
  repeat?: boolean
  repeatDelay?: number
}

export function TypewriterLines({ 
  lines, 
  delay = 0, 
  speed = 100, 
  lineDelay = 1000,
  className = "",
  showCursor = true,
  lineColors = [],
  repeat = false,
  repeatDelay = 3000
}: TypewriterLinesProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [completedLines, setCompletedLines] = useState<boolean[]>(new Array(lines.length).fill(false))
  const [isAllComplete, setIsAllComplete] = useState(false)
  const [cycleKey, setCycleKey] = useState(0) // Force re-render for repeat cycles

  const handleLineComplete = (lineIndex: number) => {
    setCompletedLines(prev => {
      const newCompleted = [...prev]
      newCompleted[lineIndex] = true
      return newCompleted
    })

    if (lineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(lineIndex + 1)
      }, lineDelay)
    } else if (!isAllComplete) {
      setIsAllComplete(true)
      
      // Start repeat cycle if enabled
      if (repeat) {
        setTimeout(() => {
          // Reset all states for next cycle
          setCurrentLineIndex(0)
          setCompletedLines(new Array(lines.length).fill(false))
          setIsAllComplete(false)
          setCycleKey(prev => prev + 1) // Force re-render
        }, repeatDelay)
      }
    }
  }

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div 
          key={`${index}-${cycleKey}`} 
          className={`block ${lineColors[index] || ''}`}
        >
          {index <= currentLineIndex && (
            <TypewriterText
              key={`${index}-${cycleKey}`}
              text={line}
              delay={index === 0 ? delay : 0}
              speed={speed}
              showCursor={showCursor && index === lines.length - 1 && !repeat}
              onComplete={() => handleLineComplete(index)}
              repeat={false} // Individual lines don't repeat, only the whole sequence
            />
          )}
        </div>
      ))}
    </div>
  )
}