
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { virtualEvents } from '@/data/virtualEvents';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Use the existing virtual events as the initial data
const defaultEvents = [...virtualEvents];

const EventsManager = () => {
  const [events, setEvents] = useState(defaultEvents);
  const [filteredEvents, setFilteredEvents] = useState(defaultEvents);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('cmsEvents');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (e) {
        console.error('Error parsing saved events:', e);
      }
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cmsEvents', JSON.stringify(events));
    filterEvents(currentFilter);
  }, [events, currentFilter]);

  // Filter events based on selected type
  const filterEvents = (filterType: string) => {
    if (filterType === 'all') {
      setFilteredEvents(events);
    } else if (filterType === 'in-person') {
      setFilteredEvents(events.filter(event => event.isInPerson));
    } else if (filterType === 'virtual') {
      setFilteredEvents(events.filter(event => !event.isInPerson));
    } else {
      setFilteredEvents(events.filter(event => event.type === filterType));
    }
  };

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setCurrentFilter(value);
    filterEvents(value);
  };

  // Reset form for creating a new event
  const handleCreateNew = () => {
    setEditingEvent({
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'workshop',
      price: '',
      isInPerson: false,
      location: '',
      image: '',
      hostName: 'Datin Norehan',
      hostImage: 'https://randomuser.me/api/portraits/women/17.jpg',
      ticketsAvailable: 30,
      ticketsSold: 0,
    });
    setIsCreating(true);
  };

  // Handle edit event
  const handleEditEvent = (event: any) => {
    setEditingEvent({...event});
    setIsCreating(false);
  };

  // Handle save event
  const handleSaveEvent = () => {
    if (!editingEvent.title || !editingEvent.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isCreating) {
      setEvents([...events, editingEvent]);
      toast({
        title: "Event created",
        description: "The event has been created successfully",
      });
    } else {
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
      toast({
        title: "Event updated",
        description: "The event has been updated successfully",
      });
    }

    setEditingEvent(null);
  };

  // Handle delete event
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast({
      title: "Event deleted",
      description: "The event has been deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Events Manager</h2>
        <Button onClick={handleCreateNew}>Add New Event</Button>
      </div>

      <Tabs defaultValue="all" onValueChange={handleFilterChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="in-person">In Person</TabsTrigger>
          <TabsTrigger value="virtual">Virtual</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="course">Courses</TabsTrigger>
          <TabsTrigger value="webinar">Webinars</TabsTrigger>
          <TabsTrigger value="live">Live Q&A</TabsTrigger>
        </TabsList>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {event.isInPerson ? 'In Person' : 'Virtual'} - {event.type}
                  </TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.price}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                      Edit
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "{event.title}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive" onClick={() => handleDeleteEvent(event.id)}>
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No events found in this category
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Tabs>

      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={(open) => !open && setEditingEvent(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? 'Create New Event' : 'Edit Event'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={editingEvent.title} 
                  onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  placeholder="Event title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select 
                  value={editingEvent.type} 
                  onValueChange={(val) => setEditingEvent({...editingEvent, type: val})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="live">Live Q&A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-format">Event Format</Label>
                <Select 
                  value={editingEvent.isInPerson ? 'inperson' : 'virtual'} 
                  onValueChange={(val) => setEditingEvent({...editingEvent, isInPerson: val === 'inperson'})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virtual">Virtual (Online)</SelectItem>
                    <SelectItem value="inperson">In Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  value={editingEvent.date} 
                  onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  placeholder="May 15, 2025"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  value={editingEvent.time} 
                  onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                  placeholder="7:00 PM - 9:00 PM"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input 
                  id="price" 
                  value={editingEvent.price} 
                  onChange={(e) => setEditingEvent({...editingEvent, price: e.target.value})}
                  placeholder="RM 150"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={editingEvent.location} 
                  onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                  placeholder={editingEvent.isInPerson ? "Physical address" : "Zoom/Google Meet"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={editingEvent.image} 
                  onChange={(e) => setEditingEvent({...editingEvent, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={editingEvent.description} 
                  onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                  placeholder="Event description"
                  rows={5}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditingEvent(null)}>Cancel</Button>
              <Button onClick={handleSaveEvent}>
                {isCreating ? 'Create Event' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EventsManager;
