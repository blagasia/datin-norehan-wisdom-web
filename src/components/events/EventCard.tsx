
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Video, Clock, MapPin, CircleCheck, CircleX, MapPinIcon } from 'lucide-react';
import { TicketType } from '@/types/ticket';

export interface VirtualEventProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  type: 'workshop' | 'course' | 'webinar' | 'live';
  image?: string;
  instructor: string;
  price: number | 'Free';
  maxParticipants: number;
  currentParticipants: number;
  minParticipants: number;
  platform: 'zoom' | 'teams' | 'meet' | 'native';
  featured?: boolean;
  tags?: string[];
  modules?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isInPerson?: boolean;
  location?: string;
  ticketTypes?: TicketType[];
}

const EventCard = ({ event }: { event: VirtualEventProps }) => {
  const isFull = event.currentParticipants >= event.maxParticipants;
  const isLowAttendance = event.currentParticipants < event.minParticipants;
  const isPaid = event.price !== 'Free';
  
  // Function to get appropriate styling based on event type
  const getCardStyle = () => {
    switch (event.type) {
      case 'workshop':
        return 'border-natural-peach/50 hover:border-natural-peach';
      case 'course':
        return 'border-natural-purple/50 hover:border-natural-purple';
      case 'webinar':
        return 'border-natural-green/50 hover:border-natural-green';
      case 'live':
        return 'border-blue-200 hover:border-blue-300';
      default:
        return event.featured ? 'border-natural-peach hover:border-natural-peach/80' : '';
    }
  };
  
  // Function to get badge styling based on status
  const getStatusBadge = () => {
    switch (event.status) {
      case 'upcoming':
        return <Badge variant="secondary" className="bg-natural-green/20 text-natural-dark">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-natural-peach text-white">Ongoing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-natural-gray">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getAvailabilityStatus = () => {
    if (isFull) {
      return <Badge variant="outline" className="bg-natural-gray/10 text-natural-gray">Sold Out</Badge>;
    }
    if (isLowAttendance) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-500">Low Registration</Badge>;
    }
    
    const spotsLeft = event.maxParticipants - event.currentParticipants;
    if (spotsLeft <= 5) {
      return <Badge variant="outline" className="bg-natural-peach/10 text-natural-peach">Only {spotsLeft} spots left</Badge>;
    }
    
    return <Badge variant="outline" className="bg-natural-green/10 text-natural-green">
      {event.currentParticipants} / {event.maxParticipants} Registered
    </Badge>;
  };

  // Function to get platform icon
  const getPlatformIcon = () => {
    switch (event.platform) {
      case 'zoom':
        return (
          <div className="flex items-center">
            <img src="https://cdn.iconscout.com/icon/free/png-256/zoom-2752078-2284891.png" 
                 alt="Zoom" className="h-3 w-3 mr-1" />
            <span>Zoom</span>
          </div>
        );
      case 'teams':
        return (
          <div className="flex items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" 
                 alt="Microsoft Teams" className="h-3 w-3 mr-1" />
            <span>Teams</span>
          </div>
        );
      case 'meet':
        return (
          <div className="flex items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon.svg" 
                 alt="Google Meet" className="h-3 w-3 mr-1" />
            <span>Meet</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>Datin's Studio</span>
          </div>
        );
    }
  };

  return (
    <Card className={`overflow-hidden h-full flex flex-col hover:shadow-md transition-all duration-300 ${getCardStyle()}`}>
      <Link to={`/events/${event.id}`} className="relative">
        <div className="h-48 overflow-hidden relative">
          {event.image ? (
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-48 bg-natural-green/20 flex items-center justify-center">
              <Video size={32} className="text-natural-gray opacity-50" />
            </div>
          )}
          
          <div className="absolute top-2 right-2 flex gap-2">
            {getStatusBadge()}
            {event.featured && (
              <Badge className="bg-purple-500 text-white">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex justify-between items-center">
              <div className="text-white flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{event.date}</span>
              </div>
              <div className="text-white flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{event.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <CardHeader>
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs font-medium flex items-center">
            <span className={`
              px-2 py-1 rounded-full
              ${event.type === 'workshop' ? 'bg-natural-peach/20 text-natural-peach' : ''}
              ${event.type === 'course' ? 'bg-natural-purple/20 text-purple-700' : ''}
              ${event.type === 'webinar' ? 'bg-natural-green/20 text-natural-green' : ''}
              ${event.type === 'live' ? 'bg-blue-100 text-blue-700' : ''}
            `}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              {event.type === 'course' && event.modules && ` • ${event.modules} Modules`}
            </span>
          </div>
          <div className="text-sm font-semibold">
            {event.price === 'Free' ? (
              <span className="text-natural-green">Free</span>
            ) : (
              <span>RM {event.price}</span>
            )}
          </div>
        </div>
        
        <Link to={`/events/${event.id}`}>
          <CardTitle className="font-playfair hover:text-natural-peach transition-colors text-xl leading-tight">
            {event.title}
          </CardTitle>
        </Link>
        
        <div className="flex items-center justify-between mt-2 text-xs text-natural-gray">
          <div className="flex items-center">
            {getPlatformIcon()}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{event.time}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3 mb-3">
          {event.description}
        </CardDescription>
        <div className="mt-2">
          {getAvailabilityStatus()}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <Link to={`/events/${event.id}`}>
          <Button 
            variant="outline" 
            className={`
              ${event.type === 'workshop' ? 'hover:bg-natural-peach/20' : ''}
              ${event.type === 'course' ? 'hover:bg-natural-purple/20' : ''}
              ${event.type === 'webinar' ? 'hover:bg-natural-green/20' : ''}
              ${event.type === 'live' ? 'hover:bg-blue-100' : ''}
            `}
          >
            View Details
          </Button>
        </Link>
        
        <div className="flex items-center text-natural-gray text-xs">
          <Users className="w-3 h-3 mr-1" />
          {event.currentParticipants} registered
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
