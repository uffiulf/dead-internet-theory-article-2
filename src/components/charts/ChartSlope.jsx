import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import chatgptData from '../../data/charts/chatgptData.json';

export default function ChartSlope() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [animatedData, setAnimatedData] = useState(
    chatgptData.data.map(item => ({ ...item, beforeAnimated: 0, afterAnimated: 0 }))
  );

  useEffect(() => {
    if (isInView) {
      // Animate before bars first
      const beforeTimeout = setTimeout(() => {
        setAnimatedData(prev => 
          prev.map(item => ({ ...item, beforeAnimated: item.before }))
        );
      }, 300);

      // Animate after bars with dramatic growth
      const afterTimeout = setTimeout(() => {
        setAnimatedData(prev => 
          prev.map(item => ({ ...item, afterAnimated: item.after }))
        );
      }, 800);

      return () => {
        clearTimeout(beforeTimeout);
        clearTimeout(afterTimeout);
      };
    } else {
      // RESET when scrolling back up
      setAnimatedData(
        chatgptData.data.map(item => ({ ...item, beforeAnimated: 0, afterAnimated: 0 }))
      );
    }
  }, [isInView]);

  // Transform data for grouped bar chart
  const chartData = animatedData.map(item => ({
    platform: item.platform,
    before: item.beforeAnimated,
    after: item.afterAnimated,
    increase: item.increase
  }));

  const beforeColor = '#4B5563'; // Dark gray
  const afterColor = '#F97316'; // Bright orange
  const badgeColor = '#10B981'; // Neon green

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="w-full py-8 md:py-12"
    >
      <div className="container-custom">
        <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          {chatgptData.title}
        </h3>
        <p className="mb-2" style={{ color: 'var(--color-text-secondary)' }}>{chatgptData.subtitle}</p>
        <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>{chatgptData.description}</p>
        
        <div className="w-full" style={{ minHeight: '400px' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="horizontal"
              margin={{ top: 20, right: 80, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
              <XAxis 
                type="number"
                domain={[0, 45]}
                stroke="#888"
                tick={{ fill: '#ccc', fontSize: 12 }}
                label={{ value: 'AI-generert innhold (%)', position: 'insideBottom', offset: -10, fill: '#ccc' }}
              />
              <YAxis 
                type="category"
                dataKey="platform"
                stroke="#888"
                tick={{ fill: '#ccc', fontSize: 14, fontWeight: 'bold' }}
                width={90}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #444',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '12px 16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)'
                }}
                itemStyle={{ color: '#fff', padding: '4px 0' }}
                labelStyle={{ color: '#ccc', marginBottom: '8px', fontWeight: 'bold' }}
                formatter={(value, name) => {
                  const label = name === 'before' ? 'Før ChatGPT' : 'Etter ChatGPT';
                  return [`${value.toFixed(2)}%`, label];
                }}
                labelFormatter={(label) => `Plattform: ${label}`}
              />
              
              {/* Before bars - subtle gray */}
              <Bar 
                dataKey="before" 
                fill={beforeColor}
                radius={[0, 8, 8, 0]}
                animationDuration={800}
                animationBegin={300}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`before-${index}`} fill={beforeColor} />
                ))}
              </Bar>
              
              {/* After bars - dramatic orange with glow effect */}
              <Bar 
                dataKey="after" 
                fill={afterColor}
                radius={[0, 8, 8, 0]}
                animationDuration={1200}
                animationBegin={800}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`after-${index}`} 
                    fill={afterColor}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Platform details with increase badges */}
        <div className="mt-12 space-y-6">
          {chartData.map((item, index) => {
            const increasePercent = item.increase;
            const isHighIncrease = increasePercent > 500;
            
            return (
              <motion.div
                key={item.platform}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                className="relative"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  {/* Platform name */}
                  <div className="w-24 md:w-32 flex-shrink-0">
                    <h4 className="font-bold text-lg md:text-xl" style={{ color: 'var(--color-text-primary)' }}>
                      {item.platform}
                    </h4>
                  </div>
                  
                  {/* Before bar */}
                  <div className="flex-1 flex items-center gap-2">
                    <div className="relative flex-1 max-w-xs">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isInView ? `${(item.before / 45) * 100}%` : 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                        className="h-8 md:h-10 rounded-r-lg"
                        style={{ 
                          backgroundColor: beforeColor,
                          minWidth: '20px'
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs md:text-sm font-semibold">
                          {item.before.toFixed(2)}%
                        </span>
                      </motion.div>
                    </div>
                    
                    <span className="text-gray-500 text-xl">→</span>
                    
                    {/* After bar - MASSIVE */}
                    <div className="flex-1 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isInView ? `${(item.after / 45) * 100}%` : 0 }}
                        transition={{ duration: 1.2, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                        className="h-8 md:h-10 rounded-r-lg relative overflow-hidden"
                        style={{ 
                          backgroundColor: afterColor,
                          boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
                          minWidth: '40px'
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs md:text-sm font-bold">
                          {item.after.toFixed(2)}%
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Increase badge - POPS IN */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isInView ? 1 : 0, 
                        opacity: isInView ? 1 : 0 
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 1.5 + index * 0.1 
                      }}
                      className="px-3 py-1 rounded-full font-bold text-sm md:text-base"
                      style={{
                        backgroundColor: badgeColor,
                        color: 'white',
                        boxShadow: `0 0 15px ${badgeColor}80`,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      +{increasePercent}%
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
