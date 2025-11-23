import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import botData from '../../data/charts/botData.json';

export default function ChartLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="w-full py-8 md:py-12"
    >
      <div className="container-custom">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{botData.title}</h3>
        <p className="text-gray-400 mb-8">{botData.description}</p>
        
        <div className="w-full h-64 md:h-96 lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={botData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="year" 
                stroke="#888"
                tick={{ fill: '#ccc' }}
              />
              <YAxis 
                stroke="#888"
                tick={{ fill: '#ccc' }}
                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#ccc' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <ReferenceLine 
                x={botData.crossoverYear} 
                stroke="#fbbf24" 
                strokeWidth={2}
                strokeDasharray="5 5"
                label={{ 
                  value: "TIPPING POINT", 
                  position: "top",
                  fill: "#fbbf24",
                  fontSize: 14,
                  fontWeight: "bold"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="human" 
                stroke="#22c55e" 
                strokeWidth={4}
                name="Mennesker"
                dot={{ fill: '#22c55e', r: 6, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="bot" 
                stroke="#ef4444" 
                strokeWidth={4}
                name="Botter"
                dot={{ fill: '#ef4444', r: 6, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {botData.crossoverYear && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-lg border-2" style={{ 
              borderColor: '#fbbf24',
              backgroundColor: 'rgba(251, 191, 36, 0.1)'
            }}>
              <p className="text-base md:text-lg font-bold" style={{ color: '#fbbf24' }}>
                ⚠️ TIPPING POINT {botData.crossoverYear}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                Botter utgjorde flertallet for første gang i historien
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
