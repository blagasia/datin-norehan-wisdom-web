
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Edit2, Mail, Phone, Save, Tag, X } from 'lucide-react';

interface Lead {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
  tags: string[] | null;
  notes?: string | null;
}

interface LeadDetailProps {
  lead: Lead;
  onLeadUpdated: () => void;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string | null) => string;
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

const LeadDetail: React.FC<LeadDetailProps> = ({ 
  lead, 
  onLeadUpdated,
  formatDate,
  getStatusColor 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Lead>({...lead});
  const [currentTag, setCurrentTag] = useState('');
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          full_name: editedLead.full_name,
          email: editedLead.email,
          phone: editedLead.phone,
          source: editedLead.source,
          status: editedLead.status,
          tags: editedLead.tags,
          notes: editedLead.notes
        })
        .eq('id', lead.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Lead updated successfully"
      });
      
      setIsEditing(false);
      onLeadUpdated();
      
      // Add activity for status change if it was changed
      if (lead.status !== editedLead.status) {
        await supabase
          .from('lead_activities')
          .insert({
            lead_id: lead.id,
            activity_type: 'status_change',
            description: `Status changed from ${lead.status || 'none'} to ${editedLead.status || 'none'}`
          });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update lead: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const addTag = () => {
    if (!currentTag.trim()) return;
    
    const tags = editedLead.tags || [];
    if (!tags.includes(currentTag.trim())) {
      setEditedLead({
        ...editedLead,
        tags: [...tags, currentTag.trim()]
      });
    }
    
    setCurrentTag('');
  };

  const removeTag = (tag: string) => {
    const tags = editedLead.tags || [];
    setEditedLead({
      ...editedLead,
      tags: tags.filter(t => t !== tag)
    });
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Edit Lead</span>
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2"
                onClick={() => {
                  setEditedLead({...lead});
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={editedLead.full_name || ''}
              onChange={(e) => setEditedLead({...editedLead, full_name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editedLead.email}
              onChange={(e) => setEditedLead({...editedLead, email: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={editedLead.phone || ''}
              onChange={(e) => setEditedLead({...editedLead, phone: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={editedLead.status || ''} 
                onValueChange={(value) => setEditedLead({...editedLead, status: value})}
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
              <Label htmlFor="source">Source</Label>
              <Select 
                value={editedLead.source || ''} 
                onValueChange={(value) => setEditedLead({...editedLead, source: value})}
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
            {editedLead.tags && editedLead.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {editedLead.tags.map(tag => (
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
              value={editedLead.notes || ''}
              onChange={(e) => setEditedLead({...editedLead, notes: e.target.value})}
              className="w-full min-h-[100px] p-2 border rounded-md"
              placeholder="Add notes about this lead..."
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{lead.full_name || 'Unnamed Lead'}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" /> Edit
          </Button>
        </CardTitle>
        <CardDescription>
          Added on {formatDate(lead.created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-medium mb-2">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                {lead.email}
              </a>
            </div>
            {lead.phone && (
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                  {lead.phone}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Status & Source */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Status</h4>
            {lead.status ? (
              <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(lead.status)}`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
            ) : (
              <span className="text-muted-foreground">Not set</span>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Source</h4>
            {lead.source ? (
              <span className="text-sm capitalize">
                {lead.source.replace('_', ' ')}
              </span>
            ) : (
              <span className="text-muted-foreground">Not specified</span>
            )}
          </div>
        </div>
        
        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          {lead.tags && lead.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {lead.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-muted px-2 py-1 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">No tags</span>
          )}
        </div>
        
        {/* Notes */}
        <div>
          <h4 className="text-sm font-medium mb-2">Notes</h4>
          {lead.notes ? (
            <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
          ) : (
            <p className="text-muted-foreground italic">No notes added</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadDetail;
