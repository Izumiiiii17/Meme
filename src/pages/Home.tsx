import React from 'react';
import { ArrowRight, Code, Zap, Shield } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';

export function Home() {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />
        <div className="relative container mx-auto px-4">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build the future<br />
              <span className="bg-gradient-to-r from-[#00FF94] to-[#FF00F5] text-transparent bg-clip-text">
                with confidence
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Create stunning digital experiences with our modern development solutions.
              Fast, secure, and scalable for the next generation.
            </p>
            <button className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <FadeIn delay={0.2}>
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Why Choose Us
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-[#00FF94]" />,
              title: 'Lightning Fast',
              description: 'Optimized performance that keeps your applications running at peak efficiency.'
            },
            {
              icon: <Shield className="w-6 h-6 text-[#00FF94]" />,
              title: 'Secure by Default',
              description: 'Built-in security features to protect your data and users.'
            },
            {
              icon: <Code className="w-6 h-6 text-[#00FF94]" />,
              title: 'Modern Stack',
              description: 'Using the latest technologies to build future-proof solutions.'
            }
          ].map((feature, index) => (
            <FadeIn key={index} delay={0.2 * (index + 1)} direction="up">
              <div className="bg-[#141414] p-6 rounded-xl border border-white/10 hover:border-[#00FF94]/50 transition-colors">
                <div className="bg-black/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}