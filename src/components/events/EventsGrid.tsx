
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from './EventCard';
import { virtualEvents } from '@/data/virtualEvents';

const EventsGrid = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter events based on the selected type
  const filteredEvents = activeTab === "all" 
    ? virtualEvents 
    : virtualEvents.filter(event => event.type === activeTab);
  
  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="all" className="mb-10" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-soft-purple/20">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="workshop">Workshops</TabsTrigger>
            <TabsTrigger value="course">Courses</TabsTrigger>
            <TabsTrigger value="webinar">Webinars</TabsTrigger>
            <TabsTrigger value="live">Live Q&A</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-natural-gray">No events scheduled in this category yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsGrid;
