import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="flex flex-col items-center mb-8">
          {/* Profile Image Container */}
          <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
            <img
              src="/profile.jpg"
              alt="Sam Rossill"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white text-center">Hey, I'm Sam 👋</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl text-center">
            I'm a Fullstack engineer currently at Amazon. I find the most rewarding part of my job is making 300,000 delivery drivers' days
            just a little bit better.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Read More About My Work <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Rest of the content remains the same */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-white">Tools I Love Working With</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-white">Cloud & Backend</h3>
            <p className="text-gray-400">
              AWS (Lambda, ECS, DynamoDB), building scalable systems that handle millions of requests
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-white">Web & Mobile</h3>
            <p className="text-gray-400">
              React, TypeScript, and mobile development - creating smooth user experiences
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-white">Data & Systems</h3>
            <p className="text-gray-400">
              Data pipelines, distributed systems, and making large-scale systems work efficiently
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-white">Some Things I've Built</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-white">Tello Map and Tag drone</h3>
            <p className="text-gray-400 mb-4">
              A fun senior project where I created a 3D mapping system using a cheap tello drone's camera.
              It can detect and tag objects in real-time.
            </p>
            <a href="https://drive.google.com/file/d/19W7M81cVJW0UDy-F6nkbNOwDc1NKwjS5/view" target="_blank"
              rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              Watch it in action →
            </a>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2 text-white">Musical Joycons</h3>
            <p className="text-gray-400 mb-4">
              Ever wondered what music feels like? I built an app that turns your
              controller into a musical instrument through vibrations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/sarossilli/Musical-Joycons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Code →
              </a>
              <a
                href="https://youtu.be/Xy1yrnwEdZw?si=XEKPGoSgG6e3RAWS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Watch Demo →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          See more of my work <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Home;