
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { MoreHorizontal, Plus, Search, Tag, Trash2, UserPlus, X } from 'lucide-react';
import LeadActivities from './crm/LeadActivities';
import LeadDetail from './crm/LeadDetail';

interface Lead {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
  tags: string[] | null;
}

const leadStatusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const leadSourceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'event', label: 'Event' },
  { value: 'referral', label: 'Referral' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'other', label: 'Other' },
];

const AdminCRM = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    full_name: '',
    email: '',
    phone: '',
    source: 'website',
    status: 'new',
    tags: [] as string[],
    notes: ''
  });
  const [currentTag, setCurrentTag] = useState('');
  
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  // Fetch leads from Supabase
  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter leads when search term or status filter changes
  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let query = (supabase.from('leads' as any) as any).select('*');
      
      // Apply filters if needed
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setLeads(data as Lead[]);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: `Failed to fetch leads: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        (lead.full_name && lead.full_name.toLowerCase().includes(searchLower)) ||
        lead.email.toLowerCase().includes(searchLower) ||
        (lead.phone && lead.phone.includes(searchTerm))
      );
    }
    
    setFilteredLeads(filtered);
  };

  const handleAddLead = async () => {
    try {
      if (!newLead.email) {
        toast({
          title: "Validation Error",
          description: "Email is required",
          variant: "destructive"
        });
        return;
      }
      
      const { data, error } = await (supabase
        .from('leads' as any)
        .insert([{
          full_name: newLead.full_name || null,
          email: newLead.email,
          phone: newLead.phone || null,
          source: newLead.source,
          status: newLead.status,
          tags: newLead.tags.length > 0 ? newLead.tags : null,
          notes: newLead.notes || null
        }])
        .select() as any);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Lead added successfully"
      });
      
      // Reset form and close dialog
      setNewLead({
        full_name: '',
        email: '',
        phone: '',
        source: 'website',
        status: 'new',
        tags: [],
        notes: ''
      });
      setIsAddLeadOpen(false);
      
      // Refresh leads
      fetchLeads();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to add lead: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!isAdmin()) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can delete leads",
        variant: "destructive"
      });
      return;
    }
    
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await (supabase
        .from('leads' as any)
        .delete()
        .eq('id', id) as any);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Lead deleted successfully"
      });
      
      // Refresh leads
      fetchLeads();
      
      // Clear selected lead if it was deleted
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to delete lead: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-purple-100 text-purple-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'proposal':
        return 'bg-yellow-100 text-yellow-800';
      case 'negotiation':
        return 'bg-orange-100 text-orange-800';
      case 'won':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const addTag = () => {
    if (!currentTag.trim()) return;
    
    if (!newLead.tags.includes(currentTag.trim())) {
      setNewLead({
        ...newLead,
        tags: [...newLead.tags, currentTag.trim()]
      });
    }
    
    setCurrentTag('');
  };

  const removeTag = (tag: string) => {
    setNewLead({
      ...newLead,
      tags: newLead.tags.filter(t => t !== tag)
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Lead Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          
          <Select 
            value={statusFilter || ''} 
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {leadStatusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" /> Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input 
                      id="full_name" 
                      value={newLead.full_name}
                      onChange={(e) => setNewLead({...newLead, full_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <Select 
                      value={newLead.source} 
                      onValueChange={(value) => setNewLead({...newLead, source: value})}
                    >
                      <SelectTrigger id="source">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadSourceOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newLead.status} 
                    onValueChange={(value) => setNewLead({...newLead, status: value})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {leadStatusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="tags"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Add tags..."
                        className="pl-9"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addTag}
                      className="ml-2"
                    >
                      Add
                    </Button>
                  </div>
                  {newLead.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newLead.tags.map(tag => (
                        <div 
                          key={tag} 
                          className="flex items-center bg-muted px-2 py-1 rounded-md text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    value={newLead.notes}
                    onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Add notes about this lead..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddLeadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLead}>
                  Save Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <div className={`${selectedLead ? 'col-span-8' : 'col-span-12'}`}>
          <div className="bg-white rounded-md border shadow-sm">
            <Tabs defaultValue="all" className="w-full">
              <div className="p-4 border-b">
                <TabsList className="grid grid-cols-7 w-full">
                  <TabsTrigger value="all">All Leads</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="contacted">Contacted</TabsTrigger>
                  <TabsTrigger value="qualified">Qualified</TabsTrigger>
                  <TabsTrigger value="proposal">Proposal</TabsTrigger>
                  <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
                  <TabsTrigger value="won">Won/Lost</TabsTrigger>
                </TabsList>
              </div>
              
              {/* All leads tab */}
              <TabsContent value="all" className="p-0">
                <LeadsTable 
                  leads={filteredLeads} 
                  loading={loading} 
                  onSelectLead={setSelectedLead}
                  onDeleteLead={handleDeleteLead}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                  isAdmin={isAdmin()}
                />
              </TabsContent>
              
              {/* Status-specific tabs */}
              {['new', 'contacted', 'qualified', 'proposal', 'negotiation'].map(status => (
                <TabsContent key={status} value={status} className="p-0">
                  <LeadsTable 
                    leads={leads.filter(lead => lead.status === status)} 
                    loading={loading} 
                    onSelectLead={setSelectedLead}
                    onDeleteLead={handleDeleteLead}
                    formatDate={formatDate}
                    getStatusColor={getStatusColor}
                    isAdmin={isAdmin()}
                  />
                </TabsContent>
              ))}
              
              {/* Won/Lost tab */}
              <TabsContent value="won" className="p-0">
                <LeadsTable 
                  leads={leads.filter(lead => lead.status === 'won' || lead.status === 'lost')} 
                  loading={loading} 
                  onSelectLead={setSelectedLead}
                  onDeleteLead={handleDeleteLead}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                  isAdmin={isAdmin()}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {selectedLead && (
          <div className="col-span-4">
            <div className="bg-white rounded-md border h-full shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold">Lead Details</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedLead(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <LeadDetail 
                  lead={selectedLead} 
                  onLeadUpdated={fetchLeads}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                <LeadActivities leadId={selectedLead.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onSelectLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string | null) => string;
  isAdmin: boolean;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ 
  leads, 
  loading, 
  onSelectLead,
  onDeleteLead,
  formatDate,
  getStatusColor,
  isAdmin
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground mb-4">No leads found</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map(lead => (
            <TableRow 
              key={lead.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onSelectLead(lead)}
            >
              <TableCell className="font-medium">
                {lead.full_name || <span className="text-muted-foreground">[No Name]</span>}
              </TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>
                {lead.status && (
                  <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(lead.status)}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                )}
              </TableCell>
              <TableCell>{lead.source || <span className="text-muted-foreground">-</span>}</TableCell>
              <TableCell>{formatDate(lead.created_at)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onSelectLead(lead);
                    }}>
                      View Details
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteLead(lead.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCRM;
