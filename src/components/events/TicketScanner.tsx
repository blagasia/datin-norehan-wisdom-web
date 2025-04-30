
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { QrCode, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ScannerProps {
  onScanSuccess: (ticketData: any) => void;
}

const TicketScanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    success: boolean;
    message: string;
    data?: any;
  }>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startScanner = async () => {
    setScanning(true);
    setScanResult(null);
    
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // In a real implementation, you would use a QR code scanning library
        // like jsQR or zxing to process video frames and detect QR codes
        
        // For demo purposes, we'll simulate a scan after 3 seconds
        setTimeout(() => {
          // Stop the camera
          stream.getTracks().forEach(track => track.stop());
          
          // Simulate a successful scan
          const ticketData = {
            id: `ticket-${Date.now()}`,
            eventId: 8,
            name: "John Doe",
            type: "standard"
          };
          
          handleScanSuccess(ticketData);
        }, 3000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Access Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      // Stop all video tracks
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };
  
  const handleScanSuccess = (data: any) => {
    // In a real app, you would validate this against your database
    stopScanner();
    setScanResult({
      success: true,
      message: "Ticket validated successfully!",
      data
    });
    
    // Call the parent component's handler
    onScanSuccess(data);
    
    toast({
      title: "Ticket Validated",
      description: `${data.name}'s ticket has been successfully scanned.`,
    });
  };

  const handleScanError = (message: string) => {
    stopScanner();
    setScanResult({
      success: false,
      message
    });
    
    toast({
      title: "Invalid Ticket",
      description: message,
      variant: "destructive"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <QrCode className="mr-2" />
          Ticket Scanner
        </CardTitle>
        <CardDescription>
          Scan attendee QR codes to validate tickets
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden mb-4">
            {scanning ? (
              <>
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover" 
                  playsInline 
                />
                <div className="absolute inset-0 border-2 border-natural-green/50 rounded-lg"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Loader2 className="animate-spin w-8 h-8 text-white" />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                {scanResult ? (
                  <div className="text-center p-4">
                    {scanResult.success ? (
                      <>
                        <CheckCircle className="w-12 h-12 text-natural-green mx-auto mb-2" />
                        <p className="text-white font-medium">{scanResult.message}</p>
                        {scanResult.data && (
                          <div className="mt-2 p-3 bg-white/10 rounded text-white text-sm">
                            <p>Name: {scanResult.data.name}</p>
                            <p>Ticket: {scanResult.data.type}</p>
                            <p>ID: {scanResult.data.id}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                        <p className="text-white">{scanResult.message}</p>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <QrCode className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-center">Camera preview will appear here</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        {scanning ? (
          <Button variant="destructive" onClick={stopScanner} className="w-full">
            Cancel Scan
          </Button>
        ) : (
          <Button onClick={startScanner} className="w-full" disabled={scanning}>
            {scanResult ? 'Scan Another Ticket' : 'Start Scanning'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TicketScanner;
