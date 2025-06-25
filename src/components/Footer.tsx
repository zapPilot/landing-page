'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, MessageCircle, Mail } from 'lucide-react';
import { LINKS, NAVIGATION } from '@/config/links';

export function Footer() {
  const productLinks = NAVIGATION.footer.product;
  const resourceLinks = NAVIGATION.footer.resources;
  const communityLinks = [
    { label: 'Discord', href: LINKS.social.discord, icon: MessageCircle },
    { label: 'X', href: LINKS.social.twitter, icon: Twitter },
    { label: 'GitHub', href: LINKS.social.github, icon: Github },
    { label: 'Email', href: LINKS.support.contactUs, icon: Mail },
  ];
  const legalLinks = NAVIGATION.footer.legal;

  return (
    <footer className="bg-gray-950/80 backdrop-blur-lg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/zap-pilot-icon.svg" 
                  alt="Zap Pilot Logo" 
                  className="w-12 h-12"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Zap Pilot
                </span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                The future of DeFi execution is here. Simple, secure, and always in your control.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {communityLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Product</h3>
              <ul className="space-y-4">
                {productLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                {resourceLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-6">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Get the latest updates on new features and DeFi insights.
              </p>
              
              <div className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <motion.button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
                <p className="text-gray-500 text-sm">
                  No spam, unsubscribe at any time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="py-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 Zap Pilot. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Built with love */}
            <motion.div
              className="text-gray-400 text-sm flex items-center space-x-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span>Built with</span>
              <motion.span
                className="text-red-500"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ❤️
              </motion.span>
              <span>for DeFi</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
    </footer>
  );
}