
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-natural-gray">
            Join Datin Norehan for live virtual events, workshops, and courses to deepen your 
            knowledge of natural wellness and traditional remedies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {upcomingEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border border-natural-green/10 overflow-hidden hover:shadow-md transition-all">
              <Link to={`/events/${event.id}`}>
                <div className="h-40 overflow-hidden relative">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="bg-natural-green/10 w-full h-full flex items-center justify-center">
                      <Video size={32} className="text-natural-gray opacity-30" />
                    </div>
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
                    ${event.type === 'workshop' ? 'bg-natural-peach/20 text-natural-peach' : ''}
                    ${event.type === 'course' ? 'bg-natural-purple/20 text-purple-700' : ''}
                    ${event.type === 'webinar' ? 'bg-natural-green/20 text-natural-green' : ''}
                    ${event.type === 'live' ? 'bg-blue-100 text-blue-700' : ''}
                  `}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                
                <Link to={`/events/${event.id}`}>
                  <h3 className="font-playfair text-lg font-medium hover:text-natural-peach transition-colors mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                </Link>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm font-semibold">
                    {event.price === 'Free' ? (
                      <span className="text-natural-green">Free</span>
                    ) : (
                      <span>RM {event.price}</span>
                    )}
                  </div>
                  
                  <Link to={`/events/${event.id}`}>
                    <Button size="sm" variant="outline">Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/events">
            <Button variant="outline" className="hover:bg-natural-green/30 hover:text-natural-dark">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
