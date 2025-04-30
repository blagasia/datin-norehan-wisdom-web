
export interface Ticket {
  id: string;
  eventId: number;
  name: string;
  email: string;
  ticketType: 'standard' | 'vip' | 'early-bird';
  price: number;
  purchaseDate: string;
  redeemed: boolean;
  redemptionDate?: string;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  sold: number;
}
