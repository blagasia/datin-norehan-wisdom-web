
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { virtualEvents } from '@/data/virtualEvents';
import { Calendar, Users, Video } from 'lucide-react';

const EventsPreview = () => {
  // Display only the first 3 upcoming events
  const upcomingEvents = virtualEvents
    .filter(event => event.status === 'upcoming')
    .slice(0, 3);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="bg-brand-orchid-pink text-black mb-3">DNA Wisdom</Badge>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-6 w-6 text-brand-deep-teal" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold">Live Learning Experiences</h2>
          </div>
          <div className="w-16 h-1 bg-brand-deep-teal mx-auto mb-6"></div>
          <p className="text-natural-gray">
            Join Datin Norehan for live virtual events, workshops, and courses to deepen your 
            knowledge of natural wellness and traditional remedies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {upcomingEvents.map((event, index) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border border-natural-green/10 overflow-hidden hover:shadow-md transition-all">
              <Link to={`/events/${event.id}`}>
                <div className="h-40 overflow-hidden relative">
                  {/* Updated images from the uploaded library */}
                  {index === 0 && (
                    <img 
                      src="/lovable-uploads/17b2f70d-878c-47a4-b942-4f69f9dc2c5b.png"
                      alt={event.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {index === 1 && (
                    <img 
                      src="/lovable-uploads/0eac78ee-8a47-4f36-82e6-165e32f3d2d0.png"
                      alt={event.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {index === 2 && (
                    <img 
                      src="/lovable-uploads/5a036f15-ad25-4f98-b74e-196eb003b9c9.png"
                      alt={event.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex justify-between items-center text-white">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-xs">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-xs">{event.currentParticipants}/{event.maxParticipants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              <div className="p-4">
                <div className="text-xs font-medium mb-2">
                  <span className={`
                    px-2 py-1 rounded-full
                    ${event.type === 'workshop' ? 'bg-brand-blush-rose/20 text-brand-blush-rose' : ''}
                    ${event.type === 'course' ? 'bg-brand-orchid-pink/20 text-purple-700' : ''}
                    ${event.type === 'webinar' ? 'bg-brand-sage-mist text-green-800' : ''}
                    ${event.type === 'live' ? 'bg-brand-deep-teal/10 text-brand-deep-teal' : ''}
                  `}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                
                <Link to={`/events/${event.id}`}>
                  <h3 className="font-playfair text-lg font-medium hover:text-brand-deep-teal transition-colors mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                </Link>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm font-semibold">
                    {event.price === 'Free' ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>RM {event.price}</span>
                    )}
                  </div>
                  
                  <Link to={`/events/${event.id}`}>
                    <Button size="sm" variant="outline" className="border-brand-deep-teal hover:bg-brand-deep-teal/10">Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/events">
            <Button className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
