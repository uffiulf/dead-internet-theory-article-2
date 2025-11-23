import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Section from './components/Section';
import ScrollySection from './components/ScrollySection';
import ImageFull from './components/ImageFull';
import QuoteCard from './components/QuoteCard';
import EliasChat from './components/EliasChat';
import ChartLine from './components/charts/ChartLine';
import ChartSlope from './components/charts/ChartSlope';
import ChartBigNumber from './components/charts/ChartBigNumber';
import ChartContainer from './components/charts/ChartContainer';
import Sources from './components/Sources';
import contentData from './data/content.json';

function App() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(contentData);
  }, []);

  if (!content) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <p>Laster innhold...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero
        title="Er internett dødt – eller bare overtatt av kunstige livsformer?"
        subtitle="Spørsmålet er ikke lenger om de finnes. Spørsmålet er om vi fortsatt gjør det."
      />

      {content.sections.map((section, index) => {
        // Check if section is a scrolly section (with timeline)
        if (section.type === 'scrolly') {
          return (
            <React.Fragment key={section.id}>
              <ScrollySection
                id={section.id}
                title={section.title}
                content={section.content}
                timeline={section.timeline || []}
              />
              {section.hasImage && section.image && (
                <ImageFull
                  src={section.image}
                  alt={section.imageAlt || section.title}
                  delay={0.2}
                />
              )}
            </React.Fragment>
          );
        }

        // Check if section is a chat section (Elias)
        if (section.type === 'chat') {
          return (
            <React.Fragment key={section.id}>
              <Section
                id={section.id}
                title={section.title}
                content={section.content}
                delay={index * 0.1}
              />
              {content.eliasChat && content.eliasChat.length > 0 && (
                <EliasChat messages={content.eliasChat} />
              )}
              {section.outro && (
                <Section
                  id={`${section.id}-outro`}
                  title=""
                  content={section.outro}
                  delay={index * 0.1 + 0.5}
                />
              )}
            </React.Fragment>
          );
        }

        // Check if section has a chart
        if (section.type === 'chart') {
          let chartComponent = null;

          if (section.chartType === 'line') {
            chartComponent = <ChartLine />;
          } else if (section.chartType === 'slope') {
            chartComponent = <ChartSlope />;
          } else if (section.chartType === 'number') {
            chartComponent = <ChartBigNumber />;
          }

          return (
            <React.Fragment key={section.id}>
              <Section
                id={section.id}
                title={section.title}
                content={section.content}
                delay={index * 0.1}
              />
              {chartComponent && (
                <ChartContainer>
                  {chartComponent}
                </ChartContainer>
              )}
              {section.hasImage && (section.image || section.images) && (
                <ImageFull
                  src={section.image}
                  images={section.images}
                  alt={section.imageAlt || section.title}
                  delay={0.2}
                />
              )}
            </React.Fragment>
          );
        }

        // Regular text section
        return (
          <React.Fragment key={section.id}>
            <Section
              id={section.id}
              title={section.title}
              content={section.content}
              delay={index * 0.1}
            />
            {section.hasImage && section.image && (
              <ImageFull
                src={section.image}
                alt={section.imageAlt || section.title}
                delay={index * 0.1 + 0.2}
              />
            )}
          </React.Fragment>
        );
      })}

      {/* Quote Cards Section */}
      {content.quotes && content.quotes.length > 0 && (
        <section className="py-20 md:py-32 lg:py-40">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 text-center"
              style={{
                color: 'var(--color-text-primary)',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(199, 210, 254, 0.1)',
                filter: 'drop-shadow(0 0 10px rgba(199, 210, 254, 0.2))'
              }}
            >
              Ekspertstemmer
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {content.quotes.map((quote, index) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote.text}
                  author={quote.author}
                  role={quote.role}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sources Section */}
      {content.sources && (
        <Sources sources={content.sources} />
      )}

    </Layout>
  );
}

export default App;

