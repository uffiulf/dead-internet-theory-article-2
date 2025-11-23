import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import TypingIndicator from './ui/TypingIndicator';
import GlitchEffect from './GlitchEffect';
import Typewriter from './Typewriter';

export default function EliasChat({ messages = [] }) {
  const containerRef = useRef(null);
  const chatRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showScreenOff, setShowScreenOff] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const screenOffTriggered = useRef(false);

  // Track scroll progress within the locked section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to opacity (0 = normal, 1 = dark)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.8, 0.95, 1]);

  // Calculate which messages should be visible based on scroll progress
  // Reserve more space after last message for user to process
  const messageProgress = useTransform(scrollYProgress, [0, 0.75], [0, messages.length + 2]); // Reserve 25% for processing time

  // Avslutningstekst
  const conclusionText = `9. Avslutning: Feeden fortsetter

Jeg lukker laptopen.

Skjermen blir svart. Men jeg vet at feeden fortsetter. At bildene ruller. At kommentarene fylles inn. At noen – noe – fortsetter å poste, like, dele.

Kanskje er det et menneske. Kanskje er det ikke.

Kanskje spiller det ingen rolle lenger.

Eller kanskje er det det eneste som betyr noe.

Internett er ikke dødt. Men det er heller ikke levende på den måten det en gang var. Det er noe annet nå. Noe hybride. Noe vi fortsatt prøver å forstå.

Og kanskje – bare kanskje – er det opp til oss å bestemme hva det skal bli.

Så lenge vi fortsatt er her.

Så lenge vi fortsatt bryr oss.

Så lenge vi fortsatt vet forskjellen.`;

  // Set container height for scroll progression
  useEffect(() => {
    if (!containerRef.current || messages.length === 0) return;

    // Extra space for conclusion section - more space after last message
    const scrollHeight = window.innerHeight * (messages.length * 2 + 8); // Much more space after last message
    containerRef.current.style.height = `${scrollHeight}px`;
  }, [messages]);

  // Update visible messages based on scroll progress
  useEffect(() => {
    if (!isInView || messages.length === 0) return;

    const unsubscribe = messageProgress.on('change', (progress) => {
      // Progress goes from 0 to messages.length
      // Each message gets a "slot" in the progress
      const totalSlots = messages.length;
      const currentSlot = Math.floor(progress);
      const slotProgress = progress - currentSlot; // 0 to 1 within current slot

      const newVisibleMessages = [];
      let currentShowTyping = false;

      // Show all messages up to current slot
      for (let i = 0; i < currentSlot && i < messages.length; i++) {
        const msg = messages[i];
        if (!msg.typingOnly) {
          newVisibleMessages.push(msg);
        }
      }

      // Handle current slot
      if (currentSlot < messages.length) {
        const currentMessage = messages[currentSlot];

        if (currentMessage.typingOnly) {
          // Only typing indicator - show it during first 70% of slot
          if (slotProgress < 0.7) {
            currentShowTyping = true;
          }
        } else if (currentMessage.sender === 'elias' && currentMessage.showTyping) {
          // Elias message with typing - typing first 50%, then message
          if (slotProgress < 0.5) {
            currentShowTyping = true;
          } else if (slotProgress > 0.3) {
            newVisibleMessages.push(currentMessage);
          }
        } else {
          // Regular message - show after 20% of slot
          if (slotProgress > 0.2) {
            newVisibleMessages.push(currentMessage);
          }
        }
      }

      // Check if all messages are shown (last message is fully visible)
      const lastMessage = messages[messages.length - 1];
      // Wait until user has scrolled well past the last message (at least 2 more scroll slots)
      const allMessagesShown = currentSlot >= messages.length + 1 && slotProgress > 0.5;
      const isLastEliasGlitch = lastMessage?.hasGlitch && lastMessage?.sender === 'elias';

      // Trigger screen off after glitch message is fully shown AND user has scrolled further
      if (allMessagesShown && isLastEliasGlitch && !screenOffTriggered.current) {
        screenOffTriggered.current = true;
        setTimeout(() => {
          setShowScreenOff(true);
        }, 6000); // Wait 6 seconds after glitch to let it sink in and allow more scrolling
      }

      setVisibleMessages(newVisibleMessages);
      setShowTyping(currentShowTyping);
    });

    return () => unsubscribe();
  }, [messages, isInView, messageProgress]);

  // Reset when scrolling back up
  useEffect(() => {
    if (!isInView) {
      setVisibleMessages([]);
      setShowTyping(false);
      setShowScreenOff(false);
      setShowTypewriter(false);
      setTypewriterComplete(false);
      screenOffTriggered.current = false;
    }
  }, [isInView]);

  // Handle screen off animation completion
  useEffect(() => {
    if (showScreenOff) {
      // After screen closes, show typewriter
      const timer = setTimeout(() => {
        setShowTypewriter(true);
      }, 1500); // After screen closes
      return () => clearTimeout(timer);
    }
  }, [showScreenOff]);

  if (messages.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ position: 'relative' }} // Explicit position for Framer Motion
    >
      {/* Dark overlay that fades in as you scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: '#000000',
          opacity: overlayOpacity,
          zIndex: 40
        }}
      />

      {/* Screen off animation - laptop closing effect */}
      {showScreenOff && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          initial={{
            opacity: 0,
            transform: 'perspective(2000px) rotateX(0deg)',
            transformOrigin: 'bottom center'
          }}
          animate={{
            opacity: 1,
            transform: 'perspective(2000px) rotateX(90deg)'
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut"
          }}
          style={{
            zIndex: 45,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,1) 100%)',
          }}
        />
      )}

      {/* Fixed chat container - locked on screen like a movie */}
      <div
        ref={chatRef}
        className="fixed inset-0 flex items-center justify-center"
        style={{
          pointerEvents: isInView && !showScreenOff ? 'auto' : 'none',
          opacity: showScreenOff ? 0 : 1,
          transition: 'opacity 1.5s ease-out',
          zIndex: 50
        }}
      >
        <div className="container-custom max-w-2xl w-full">
          <div className="space-y-4">
            {visibleMessages.map((message, index) => {
              const isElias = message.sender === 'elias';

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${isElias ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${isElias
                      ? 'border'
                      : 'bg-blue-600'
                      }`}
                    style={isElias ? {
                      backgroundColor: '#1F2937',
                      borderColor: '#4B5563'
                    } : {
                      backgroundColor: '#374151'
                    }}
                  >
                    {message.hasGlitch ? (
                      <GlitchEffect>
                        <p style={{ color: '#E5E7EB' }}>{message.message}</p>
                      </GlitchEffect>
                    ) : (
                      <p style={{ color: '#E5E7EB' }}>{message.message}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {showTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="border rounded-2xl px-4 py-3" style={{ backgroundColor: 'var(--color-dark-surface)', borderColor: 'var(--color-dark-border)' }}>
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Typewriter conclusion - centered on screen */}
      {showTypewriter && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: '#000000',
            zIndex: 60
          }}
        >
          <div className="container-custom max-w-3xl px-6 md:px-8">
            <div className="text-left">
              <Typewriter
                text={conclusionText}
                speed={40}
                onComplete={() => {
                  setTimeout(() => {
                    setTypewriterComplete(true);
                  }, 3000); // Hold for 3 seconds after typewriter completes
                }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Final fade to complete black */}
      {typewriterComplete && (
        <motion.div
          className="fixed inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            backgroundColor: '#000000',
            zIndex: 70
          }}
        />
      )}
    </section>
  );
}
