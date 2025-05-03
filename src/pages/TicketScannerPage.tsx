
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TicketScanner from '@/components/events/TicketScanner';
import { virtualEvents } from '@/data/virtualEvents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import NotFound from './NotFound';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Check } from 'lucide-react';

const TicketScannerPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { toast } = useToast();
  const [scannedTickets, setScannedTickets] = useState<any[]>([]);
  
  const event = virtualEvents.find(e => e.id === Number(eventId));
  
  if (!event || !event.isInPerson) {
    return <NotFound />;
  }
  
  const handleScanSuccess = (ticketData: any) => {
    // Check if ticket has already been scanned
    const isAlreadyScanned = scannedTickets.some(
      ticket => ticket.id === ticketData.id
    );
    
    if (isAlreadyScanned) {
      toast({
        variant: "destructive",
        title: "Ticket already scanned",
        description: `This ticket for ${ticketData.name} has already been checked in.`
      });
      return;
    }
    
    // Add to scanned tickets
    setScannedTickets([ticketData, ...scannedTickets]);
    
    toast({
      title: "Check-in successful",
      description: `${ticketData.name} has been successfully checked in.`,
    });
  };
  
  const checkInPercentage = Math.round((scannedTickets.length / (event.currentParticipants || 1)) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair text-3xl font-bold mb-6">Ticket Scanner</h1>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date} • {event.time}</CardDescription>
                <div className="flex items-center mt-2">
                  <MapPin className="w-4 h-4 mr-1 text-natural-gray" />
                  <span className="text-sm text-natural-gray">{event.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-natural-gray" />
                    <span className="text-sm">
                      {event.currentParticipants} registered • {scannedTickets.length} checked in
                    </span>
                  </div>
                  <Badge className="bg-natural-green">{checkInPercentage}% Checked In</Badge>
                </div>
              </CardContent>
            </Card>
            
            <TicketScanner onScanSuccess={handleScanSuccess} />
            
            {scannedTickets.length > 0 && (
              <div className="mt-8">
                <h2 className="font-medium text-xl mb-4">Recent Check-ins ({scannedTickets.length})</h2>
                <div className="space-y-2">
                  {scannedTickets.map((ticket, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border flex justify-between items-center">
                      <div>
                        <div className="font-medium">{ticket.name}</div>
                        <div className="text-sm text-natural-gray">
                          {ticket.type} • {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                      <Badge className="bg-natural-green flex items-center gap-1">
                        <Check className="h-3 w-3" /> Checked In
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketScannerPage;
