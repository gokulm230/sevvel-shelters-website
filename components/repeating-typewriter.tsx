"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RepeatingTypewriterProps {
  lines: string[]
  delay?: number
  speed?: number
  lineDelay?: number
  className?: string
  lineColors?: string[]
  pauseDuration?: number
  eraseSpeed?: number
}

export function RepeatingTypewriter({ 
  lines, 
  delay = 0, 
  speed = 100, 
  lineDelay = 1000,
  className = "",
  lineColors = [],
  pauseDuration = 3000,
  eraseSpeed = 50
}: RepeatingTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedLines, setDisplayedLines] = useState<string[]>(lines.map(() => ""))
  const [isTyping, setIsTyping] = useState(true)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [cycleComplete, setCycleComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping && currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex]
      
      if (currentCharIndex < currentLine.length) {
        // Typing animation
        timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev]
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
            return newLines
          })
          setCurrentCharIndex(prev => prev + 1)
        }, currentCharIndex === 0 && currentLineIndex === 0 ? delay : speed)
      } else {
        // Line complete, move to next line or complete cycle
        if (currentLineIndex < lines.length - 1) {
          timeout = setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1)
            setCurrentCharIndex(0)
          }, lineDelay)
        } else {
          // All lines complete
          setCycleComplete(true)
          timeout = setTimeout(() => {
            setIsTyping(false)
            setCurrentLineIndex(lines.length - 1)
            setCurrentCharIndex(lines[lines.length - 1].length)
          }, pauseDuration)
        }
      }
    } else if (!isTyping && currentLineIndex >= 0) {
      // Erasing animation - erase from last line to first
      const currentLine = lines[currentLineIndex]
      
      if (currentCharIndex > 0) {
        // Erase current line
        timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev]
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex - 1)
            return newLines
          })
          setCurrentCharIndex(prev => prev - 1)
        }, eraseSpeed)
      } else {
        // Current line erased, move to previous line
        if (currentLineIndex > 0) {
          setCurrentLineIndex(prev => prev - 1)
          setCurrentCharIndex(lines[currentLineIndex - 1].length)
        } else {
          // All lines erased, restart cycle
          setTimeout(() => {
            setIsTyping(true)
            setCurrentLineIndex(0)
            setCurrentCharIndex(0)
            setCycleComplete(false)
            setDisplayedLines(lines.map(() => ""))
          }, 500)
        }
      }
    }

    return () => clearTimeout(timeout)
  }, [currentLineIndex, currentCharIndex, isTyping, lines, delay, speed, lineDelay, pauseDuration, eraseSpeed, cycleComplete])

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <motion.div 
          key={index} 
          className={`block ${lineColors[index] || ''}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: displayedLines[index] ? 1 : 0.3
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="inline-block min-h-[1.2em]">
            {displayedLines[index]}
            {/* Show cursor on currently active line */}
            {((isTyping && index === currentLineIndex) || 
              (!isTyping && index === currentLineIndex && currentCharIndex > 0)) && (
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
          </span>
        </motion.div>
      ))}
    </div>
  )
}