
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Video, Share2, Download, MapPin, User } from 'lucide-react';
import { virtualEvents } from '@/data/virtualEvents';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import EventRegistrationForm from '@/components/events/EventRegistrationForm';
import NotFound from './NotFound';
import EventModules from '@/components/events/EventModules';

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  const event = virtualEvents.find(e => e.id === Number(eventId));
  
  if (!event) {
    return <NotFound />;
  }
  
  const isFull = event.currentParticipants >= event.maxParticipants;
  const isLowAttendance = event.currentParticipants < event.minParticipants;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-natural-green/10 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={`
                      ${event.type === 'workshop' ? 'bg-natural-peach/20 text-natural-peach' : ''}
                      ${event.type === 'course' ? 'bg-natural-purple/20 text-purple-700' : ''}
                      ${event.type === 'webinar' ? 'bg-natural-green/20 text-natural-green' : ''}
                      ${event.type === 'live' ? 'bg-blue-100 text-blue-700' : ''}
                    `}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    
                    <Badge variant={event.status === 'upcoming' ? 'secondary' : 'outline'} className="text-xs">
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center text-natural-gray">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-natural-gray">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{event.time} • {event.duration}</span>
                    </div>
                    
                    <div className="flex items-center text-natural-gray">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {event.platform === 'zoom' && 'Zoom'}
                        {event.platform === 'teams' && 'Microsoft Teams'}
                        {event.platform === 'meet' && 'Google Meet'}
                        {event.platform === 'native' && 'Datin\'s Studio'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags?.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-natural-gray text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center mb-8">
                    <User className="w-5 h-5 mr-2 text-natural-gray" />
                    <span className="text-natural-gray">Hosted by <span className="font-medium text-natural-dark">{event.instructor}</span></span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button disabled={isFull} className="bg-natural-green hover:bg-natural-green/90 text-white">
                          {isFull ? 'Sold Out' : 'Register Now'}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>Register for Event</SheetTitle>
                          <SheetDescription>
                            Complete the form to secure your spot for "{event.title}"
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <EventRegistrationForm event={event} />
                        </div>
                      </SheetContent>
                    </Sheet>
                    
                    <Button variant="outline" disabled={!isLowAttendance}>
                      {isLowAttendance ? 'Notify Me If Rescheduled' : 'Share Event'}
                      {isLowAttendance ? <Bell className="ml-2 h-4 w-4" /> : <Share2 className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {/* Price Card */}
                <div className="md:w-1/3">
                  <div className="bg-white rounded-xl border border-natural-green/20 p-6 shadow-md">
                    <div className="mb-4">
                      <div className="text-2xl font-bold mb-2">
                        {event.price === 'Free' ? (
                          <span className="text-natural-green">Free</span>
                        ) : (
                          <span>RM {event.price}</span>
                        )}
                      </div>
                      
                      {event.type === 'course' && event.modules && (
                        <div className="text-natural-gray text-sm mb-2">
                          {event.modules} modules • {event.duration}
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-natural-gray/10 py-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-natural-gray text-sm">Registration</div>
                        <div className="font-medium">
                          {event.currentParticipants}/{event.maxParticipants}
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-natural-green h-2 rounded-full" 
                          style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                      
                      {isFull ? (
                        <div className="text-center text-natural-gray text-sm mb-4">
                          This event is sold out
                        </div>
                      ) : (
                        <div className="text-center text-natural-gray text-sm mb-4">
                          {event.maxParticipants - event.currentParticipants} spots remaining
                        </div>
                      )}
                    </div>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button disabled={isFull} className="w-full">
                          {isFull ? 'Sold Out' : 'Register Now'}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>Register for Event</SheetTitle>
                          <SheetDescription>
                            Complete the form to secure your spot for "{event.title}"
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <EventRegistrationForm event={event} />
                        </div>
                      </SheetContent>
                    </Sheet>
                    
                    {isLowAttendance && (
                      <div className="mt-4 p-3 bg-amber-50 text-amber-700 rounded text-sm">
                        <p>This event needs {event.minParticipants - event.currentParticipants} more registrations to proceed as scheduled.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Event Image Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-xl overflow-hidden h-72 md:h-96">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="bg-natural-green/10 w-full h-full flex items-center justify-center">
                    <Video size={64} className="text-natural-gray opacity-30" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Event Details Tabs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="overview" className="mb-10" onValueChange={setActiveTab}>
                <TabsList className="mb-8 bg-soft-purple/20 mx-auto flex justify-center">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  {event.type === 'course' && <TabsTrigger value="modules">Modules</TabsTrigger>}
                  <TabsTrigger value="instructor">Host</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-4">About This {event.type.charAt(0).toUpperCase() + event.type.slice(1)}</h2>
                    <p className="text-natural-gray mb-4">{event.description}</p>
                    <p className="text-natural-gray">
                      Join Datin Norehan for this immersive virtual experience where you'll learn practical skills 
                      and deepen your understanding of natural wellness approaches. This {event.type} is designed 
                      for both beginners and those with some experience who want to expand their knowledge.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-3">What You'll Learn</h3>
                    <ul className="list-disc pl-5 space-y-2 text-natural-gray">
                      <li>Understand the principles of natural wellness and holistic living</li>
                      <li>Learn practical techniques that you can apply immediately</li>
                      <li>Discover traditional Malaysian wisdom combined with modern approaches</li>
                      <li>Connect with like-minded individuals in our community</li>
                      {event.type === 'workshop' && <li>Create your own natural products during the hands-on workshop</li>}
                      {event.type === 'course' && <li>Receive a certificate of completion after finishing all modules</li>}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-xl font-bold mb-3">What's Included</h3>
                    <ul className="list-disc pl-5 space-y-2 text-natural-gray">
                      <li>Live instruction from Datin Norehan</li>
                      <li>Downloadable resources and guides</li>
                      <li>Access to recording for 30 days after the event</li>
                      {event.type === 'course' && <li>Certificate upon successful completion</li>}
                      {event.type === 'workshop' && <li>Digital recipe book with additional formulas</li>}
                      {event.type === 'webinar' && <li>Q&A session after the presentation</li>}
                      {event.type === 'live' && <li>Opportunity to ask questions directly</li>}
                    </ul>
                  </div>
                </TabsContent>
                
                {event.type === 'course' && (
                  <TabsContent value="modules">
                    <EventModules />
                  </TabsContent>
                )}
                
                <TabsContent value="instructor">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-32 h-32 rounded-full overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" 
                        alt="Datin Norehan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-playfair text-xl font-bold mb-2">{event.instructor}</h3>
                      <p className="text-natural-gray/80 text-sm mb-4">Wellness Expert & Entrepreneur</p>
                      <p className="text-natural-gray mb-4">
                        Datin Norehan is a renowned expert in natural wellness with over 15 years of experience 
                        creating herbal remedies and natural skincare products. Her passion for traditional Malaysian 
                        herbs combined with modern scientific knowledge has made her a trusted voice in the wellness community.
                      </p>
                      <p className="text-natural-gray">
                        Having conducted over 200 workshops and courses, Datin Norehan brings her wealth of knowledge 
                        and engaging teaching style to every session, making complex concepts accessible and practical 
                        for everyday use.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-playfair text-xl font-bold mb-3">Recommended Materials</h3>
                      <p className="text-natural-gray mb-4">
                        For the best experience during this {event.type}, we recommend having the following materials ready:
                      </p>
                      
                      <ul className="list-disc pl-5 space-y-2 text-natural-gray">
                        <li>Notebook and pen for taking notes</li>
                        <li>A stable internet connection</li>
                        <li>A quiet, comfortable space to participate from</li>
                        {event.type === 'workshop' && (
                          <>
                            <li>Basic ingredients (a detailed list will be sent after registration)</li>
                            <li>Small containers for your creations</li>
                            <li>Measuring spoons and cups</li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-playfair text-xl font-bold mb-3">Downloadable Resources</h3>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start text-left">
                          <Download className="mr-2 h-4 w-4" />
                          Event Preparation Guide (PDF)
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start text-left">
                          <Download className="mr-2 h-4 w-4" />
                          Participant Workbook (PDF)
                        </Button>
                        
                        {event.type === 'workshop' && (
                          <Button variant="outline" className="w-full justify-start text-left">
                            <Download className="mr-2 h-4 w-4" />
                            Materials & Ingredients List (PDF)
                          </Button>
                        )}
                        
                        {event.type === 'course' && (
                          <Button variant="outline" className="w-full justify-start text-left">
                            <Download className="mr-2 h-4 w-4" />
                            Course Syllabus (PDF)
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Related Events */}
        <section className="py-12 bg-natural-green/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-playfair text-2xl font-bold mb-6 text-center">You May Also Be Interested In</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {virtualEvents
                  .filter(e => e.id !== event.id)
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 3)
                  .map(relatedEvent => (
                    <div key={relatedEvent.id} className="bg-white rounded-lg shadow-sm border border-natural-green/10 overflow-hidden">
                      <Link to={`/events/${relatedEvent.id}`}>
                        <div className="h-40 overflow-hidden">
                          {relatedEvent.image ? (
                            <img 
                              src={relatedEvent.image} 
                              alt={relatedEvent.title}
                              className="w-full h-full object-cover object-center"
                            />
                          ) : (
                            <div className="bg-natural-green/10 w-full h-full flex items-center justify-center">
                              <Video size={32} className="text-natural-gray opacity-30" />
                            </div>
                          )}
                        </div>
                      </Link>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={`
                            ${relatedEvent.type === 'workshop' ? 'bg-natural-peach/20 text-natural-peach' : ''}
                            ${relatedEvent.type === 'course' ? 'bg-natural-purple/20 text-purple-700' : ''}
                            ${relatedEvent.type === 'webinar' ? 'bg-natural-green/20 text-natural-green' : ''}
                            ${relatedEvent.type === 'live' ? 'bg-blue-100 text-blue-700' : ''}
                          `}>
                            {relatedEvent.type.charAt(0).toUpperCase() + relatedEvent.type.slice(1)}
                          </Badge>
                          
                          <div className="text-sm font-semibold">
                            {relatedEvent.price === 'Free' ? (
                              <span className="text-natural-green">Free</span>
                            ) : (
                              <span>RM {relatedEvent.price}</span>
                            )}
                          </div>
                        </div>
                        
                        <Link to={`/events/${relatedEvent.id}`}>
                          <h3 className="font-playfair text-lg font-medium hover:text-natural-peach transition-colors mb-2">
                            {relatedEvent.title}
                          </h3>
                        </Link>
                        
                        <div className="flex justify-between text-xs text-natural-gray mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{relatedEvent.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{relatedEvent.currentParticipants}/{relatedEvent.maxParticipants}</span>
                          </div>
                        </div>
                        
                        <Link to={`/events/${relatedEvent.id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/events">
                  <Button variant="outline">
                    View All Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Import missing icon
import { Bell } from 'lucide-react';

export default EventDetail;
