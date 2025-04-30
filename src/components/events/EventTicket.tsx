
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Ticket } from '@/types/ticket';
import { VirtualEventProps } from './EventCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, QrCode, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventTicketProps {
  ticket: Ticket;
  event: VirtualEventProps;
}

const EventTicket = ({ ticket, event }: EventTicketProps) => {
  // Create ticket data to encode in QR code (would be validated on redemption)
  const ticketData = JSON.stringify({
    id: ticket.id,
    eventId: event.id,
    name: ticket.name,
    type: ticket.ticketType
  });

  // Format ticket type for display
  const formatTicketType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Card className="overflow-hidden border-2 border-natural-green/30">
      {/* Ticket Header */}
      <div className="bg-natural-green/20 p-4 border-b border-natural-green/30">
        <div className="flex justify-between items-center">
          <h3 className="font-playfair text-lg font-bold">Event Ticket</h3>
          <Badge className="bg-natural-green">{formatTicketType(ticket.ticketType)}</Badge>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-5">
        <h4 className="font-playfair text-xl font-bold mb-2">{event.title}</h4>
        
        <div className="flex flex-col space-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-natural-gray" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-natural-gray" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-300 my-4"></div>
        
        <div className="flex items-center mb-2">
          <span className="font-medium">Attendee:</span>
          <span className="ml-2">{ticket.name}</span>
        </div>
        
        <div className="flex items-center mb-2">
          <span className="font-medium">Ticket ID:</span>
          <span className="ml-2 text-sm text-natural-gray">{ticket.id}</span>
        </div>
        
        <div className="flex items-center mb-4">
          <span className="font-medium">Price:</span>
          <span className="ml-2">RM {ticket.price.toFixed(2)}</span>
        </div>

        {ticket.redeemed ? (
          <div className="flex items-center justify-center p-3 bg-gray-100 rounded-md text-natural-gray mb-4">
            <CircleCheck className="w-5 h-5 mr-2 text-natural-green" />
            <span>Ticket Redeemed on {new Date(ticket.redemptionDate!).toLocaleDateString()}</span>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-lg shadow-sm border">
              <QRCodeSVG value={ticketData} size={180} level="H" />
            </div>
          </div>
        )}
        
        <div className="text-center text-sm text-natural-gray mb-2">
          <QrCode className="w-4 h-4 inline mr-1" />
          <span>Present this QR code at the event entrance</span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="w-full" onClick={() => window.print()}>
            Print Ticket
          </Button>
          <Button className="w-full">
            Download PDF
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventTicket;
