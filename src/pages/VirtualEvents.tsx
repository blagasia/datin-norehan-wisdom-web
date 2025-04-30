
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsGrid from '@/components/events/EventsGrid';
import FeaturedEvent from '@/components/events/FeaturedEvent';
import { virtualEvents } from '@/data/virtualEvents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { QrCode, Calendar, MapPin } from 'lucide-react';

const VirtualEvents = () => {
  // Filter in-person events
  const inPersonEvents = virtualEvents.filter(event => event.isInPerson);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-natural-green/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Events & Courses</h1>
              <p className="text-natural-gray text-lg">
                Join Datin Norehan for interactive live sessions, workshops, and courses
                on natural wellness, herbal remedies, and holistic living - both online and in-person.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/zoom-2752078-2284891.png" alt="Zoom" className="h-5 w-5 mr-2" />
                  <span className="text-sm text-natural-gray">Zoom Integration</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon.svg" alt="Google Meet" className="h-5 w-5 mr-2" />
                  <span className="text-sm text-natural-gray">Google Meet Integration</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" alt="Microsoft Teams" className="h-5 w-5 mr-2" />
                  <span className="text-sm text-natural-gray">Microsoft Teams Integration</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <QrCode className="h-5 w-5 mr-2 text-natural-gray" />
                  <span className="text-sm text-natural-gray">QR Code Tickets</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedEvent />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center">Virtual Events</h2>
            <EventsGrid />
          </div>
        </section>
        
        {inPersonEvents.length > 0 && (
          <section className="py-16 bg-natural-green/5">
            <div className="container mx-auto px-4">
              <h2 className="font-playfair text-3xl font-bold mb-8 text-center">In-Person Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inPersonEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div className="h-48 overflow-hidden relative">
                      {event.image ? (
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-natural-green/10 w-full h-full flex items-center justify-center">
                          <MapPin size={32} className="text-natural-gray opacity-30" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="font-playfair">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-natural-gray mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-natural-gray mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-4 line-clamp-2 text-sm text-natural-gray">
                        {event.description}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold">
                          {typeof event.price === 'number' ? `From RM ${event.price}` : event.price}
                        </div>
                        <Link to={`/events/${event.id}`}>
                          <Button>View Event</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VirtualEvents;
