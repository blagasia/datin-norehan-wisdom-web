
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Video } from 'lucide-react';
import { virtualEvents } from '@/data/virtualEvents';

const FeaturedEvent = () => {
  // Find a featured event, or use the first one if none are marked featured
  const featuredEvent = virtualEvents.find(event => event.featured) || virtualEvents[0];
  
  if (!featuredEvent) return null;
  
  const isFull = featuredEvent.currentParticipants >= featuredEvent.maxParticipants;
  const spotsLeft = featuredEvent.maxParticipants - featuredEvent.currentParticipants;
  
  // Function to render the platform badge
  const renderPlatformBadge = () => {
    switch (featuredEvent.platform) {
      case 'zoom':
        return (
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <img src="https://cdn.iconscout.com/icon/free/png-256/zoom-2752078-2284891.png" 
                 alt="Zoom" className="h-4 w-4 mr-2" />
            <span>Zoom Meeting</span>
          </div>
        );
      case 'teams':
        return (
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" 
                 alt="Microsoft Teams" className="h-4 w-4 mr-2" />
            <span>Teams Meeting</span>
          </div>
        );
      case 'meet':
        return (
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon.svg" 
                 alt="Google Meet" className="h-4 w-4 mr-2" />
            <span>Google Meet</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            <Video className="w-4 h-4 mr-2" />
            <span>Datin's Studio</span>
          </div>
        );
    }
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden shadow-lg border border-natural-green/20">
            <div className="lg:w-1/2 relative">
              {featuredEvent.image ? (
                <img 
                  src={featuredEvent.image} 
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover object-center min-h-[300px]"
                />
              ) : (
                <div className="bg-natural-green/10 w-full h-full min-h-[300px] flex items-center justify-center">
                  <Video size={64} className="text-natural-gray opacity-30" />
                </div>
              )}
              
              <div className="absolute top-4 left-4">
                <Badge className="bg-purple-500 text-white px-3 py-1">Featured Event</Badge>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  {renderPlatformBadge()}
                  <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{featuredEvent.currentParticipants}/{featuredEvent.maxParticipants} Registered</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <Badge className={`
                    ${featuredEvent.type === 'workshop' ? 'bg-natural-peach/20 text-natural-peach' : ''}
                    ${featuredEvent.type === 'course' ? 'bg-natural-purple/20 text-purple-700' : ''}
                    ${featuredEvent.type === 'webinar' ? 'bg-natural-green/20 text-natural-green' : ''}
                    ${featuredEvent.type === 'live' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {featuredEvent.type.charAt(0).toUpperCase() + featuredEvent.type.slice(1)}
                    {featuredEvent.type === 'course' && featuredEvent.modules && ` • ${featuredEvent.modules} Modules`}
                  </Badge>
                  
                  <div className="text-lg font-bold">
                    {featuredEvent.price === 'Free' ? (
                      <span className="text-natural-green">Free</span>
                    ) : (
                      <span>RM {featuredEvent.price}</span>
                    )}
                  </div>
                </div>
                
                <h2 className="font-playfair text-2xl lg:text-3xl font-bold mb-4">{featuredEvent.title}</h2>
                <p className="text-natural-gray mb-6">{featuredEvent.description}</p>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-5">
                  {featuredEvent.tags?.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-natural-gray text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Link to={`/events/${featuredEvent.id}`} className="w-full sm:w-auto">
                    <Button className="w-full bg-natural-green hover:bg-natural-green/90 text-white">
                      View Event Details
                    </Button>
                  </Link>
                  
                  <Link to={`/events/${featuredEvent.id}`} className="w-full sm:w-auto">
                    <Button variant="outline" disabled={isFull} className="w-full">
                      {isFull ? 'Sold Out' : 'Register Now'}
                      {!isFull && spotsLeft <= 5 && ` (${spotsLeft} spots left)`}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
