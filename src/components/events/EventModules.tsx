
import React from 'react';

const EventModules = () => {
  const modules = [
    {
      number: 1,
      title: 'Introduction to Natural Wellness',
      description: 'Overview of the key principles and concepts that form the foundation of our approach to natural wellness.',
      duration: '90 minutes',
      topics: [
        'Understanding holistic approaches to health',
        'The mind-body connection',
        'Introduction to traditional Malaysian healing practices',
        'Setting your wellness goals'
      ]
    },
    {
      number: 2,
      title: 'Herbal Remedies & Their Applications',
      description: 'Deep dive into various herbs and plants, their properties, and how to use them effectively.',
      duration: '120 minutes',
      topics: [
        'Common medicinal herbs and their properties',
        'Safe harvesting and preparation techniques',
        'Creating effective herbal formulations',
        'Hands-on: Making your first herbal remedy'
      ]
    },
    {
      number: 3,
      title: 'Natural Skincare & Beauty',
      description: 'Learn how to create effective, clean skincare products using natural ingredients.',
      duration: '120 minutes',
      topics: [
        'Understanding skin types and common concerns',
        'Natural ingredients for different skin needs',
        'Formulating cleansers, toners, and moisturizers',
        'Hands-on: Creating a personalized skincare routine'
      ]
    },
    {
      number: 4,
      title: 'Business of Natural Wellness',
      description: 'Guidance on turning your knowledge into a sustainable business or practice.',
      duration: '90 minutes',
      topics: [
        'Finding your niche in the wellness market',
        'Ethical considerations and regulations',
        'Building a client base and community',
        'Creating your business action plan'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-playfair text-2xl font-bold mb-4">Course Modules</h2>
        <p className="text-natural-gray mb-6">
          This course consists of 4 comprehensive modules that will guide you through all aspects
          of natural wellness, from theory to practical applications and even business concepts.
        </p>
      </div>
      
      <div className="space-y-6">
        {modules.map((module) => (
          <div 
            key={module.number} 
            className="border border-natural-gray/10 rounded-lg overflow-hidden shadow-sm"
          >
            <div className="bg-natural-purple/10 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-natural-purple text-white flex items-center justify-center font-bold mr-3">
                  {module.number}
                </div>
                <h3 className="font-playfair font-bold text-lg">{module.title}</h3>
              </div>
              <div className="text-sm font-medium">{module.duration}</div>
            </div>
            
            <div className="p-4">
              <p className="text-natural-gray mb-4">{module.description}</p>
              
              <div className="mt-3">
                <h4 className="font-medium mb-2">Key Topics:</h4>
                <ul className="list-disc pl-5 space-y-1 text-natural-gray text-sm">
                  {module.topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-natural-green/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Certification</h3>
        <p className="text-natural-gray text-sm">
          Upon completion of all modules and passing the final assessment, participants will receive
          a Certificate of Completion from Datin Norehan's Natural Wellness Academy.
        </p>
      </div>
    </div>
  );
};

export default EventModules;
