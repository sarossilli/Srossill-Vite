import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const About: React.FC = () => {
 return (
   <div className="max-w-4xl mx-auto px-4 py-16">
     {/* Profile Section */}
     <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
       <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
         <img
           src="profile.jpg"
           alt="Sam Rossill"
           className="w-full h-full object-cover"
         />
       </div>
       <div>
         <h1 className="text-4xl font-bold text-white mb-6">About Me</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Hey! I'm Sam, a software engineer deeply immersed in the art of building distributed systems 
          that scale. Whether I'm building healthcare technology at Stellar Health to help reduce 
          cost of care, or tinkering with my personal drone projects, I'm constantly exploring 
          the delicate balance between system resilience and operational complexity.
        </p>
         <div className="flex gap-4">
           <a
             href="https://linkedin.com/in/sarossilli"
             target="_blank"
             rel="noopener noreferrer"
             className="text-gray-300 hover:text-white transition-colors"
           >
             <Linkedin size={24} />
           </a>
           <a
             href="https://github.com/sarossilli"
             target="_blank"
             rel="noopener noreferrer"
             className="text-gray-300 hover:text-white transition-colors"
           >
             <Github size={24} />
           </a>
         </div>
       </div>
     </div>

     {/* Content Box */}
     <div className="bg-gray-800 rounded-lg p-8">
      {/* Professional Work */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">What I Do</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          At Stellar Health, I'm part of the Total Cost of Care team, where we're working to reduce 
          healthcare costs through micro incentives for providers. Our platform helps align provider 
          incentives with better patient outcomes, making healthcare more efficient and effective.
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg leading-relaxed space-y-2 ml-4 mb-4">
          <li>Building systems that create targeted incentives for providers</li>
          <li>Developing tools that track and optimize total cost of care</li>
          <li>Creating data-driven solutions to improve healthcare efficiency</li>
        </ul>
        <p className="text-gray-300 text-lg leading-relaxed">
          I work across the full stack - from designing intuitive user interfaces with React and TypeScript 
          to building scalable backend services using Java and AWS technologies like Lambda, ECS, and DynamoDB.
        </p>
      </section>

       {/* Personal Projects */}
       <section>
         <h2 className="text-2xl font-bold text-white mb-4">Personal Projects & Interests</h2>
         <p className="text-gray-300 text-lg leading-relaxed mb-4">
           Outside of work, I'm diving deep into the world of autonomous drone systems. I'm currently 
           building my own drone swarm fleet - a project that combines my love for robotics with 
           the challenges of distributed systems and autonomous control.
         </p>
         <p className="text-gray-300 text-lg leading-relaxed">
           This project involves working with various technologies including computer vision, 
           real-time communication protocols, and autonomous navigation systems. It's a perfect 
           blend of my professional software engineering experience and my passion for autonomous systems.
         </p>
       </section>
     </div>
   </div>
 );
};

export default About;