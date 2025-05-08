
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tag, Plus, X } from 'lucide-react';
import { Tables } from '@/types/supabase';

interface Lead extends Tables<'leads'> {}

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

const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onLeadUpdated, formatDate, getStatusColor }) => {
  const [editedLead, setEditedLead] = useState<Lead>(lead);
  const [currentTag, setCurrentTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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
      
      onLeadUpdated();
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update lead: ${error.message}`,
        variant: "destructive"
      });
    }
  };
  
  const handleAddNote = async () => {
    try {
      const { error } = await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          activity_type: 'note',
          description: 'Lead details updated'
        });
        
      if (error) throw error;
    } catch (error: any) {
      console.error('Error adding note activity:', error);
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

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-medium">
              {lead.full_name || 'Unnamed Lead'}
            </h3>
            <p className="text-muted-foreground">{lead.email}</p>
          </div>
          <div>
            {isEditing ? (
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editedLead.full_name || ''}
                  onChange={(e) => setEditedLead({...editedLead, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={editedLead.email}
                  onChange={(e) => setEditedLead({...editedLead, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editedLead.phone || ''}
                  onChange={(e) => setEditedLead({...editedLead, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-source">Source</Label>
                <Select 
                  value={editedLead.source || ''} 
                  onValueChange={(value) => setEditedLead({...editedLead, source: value})}
                >
                  <SelectTrigger id="edit-source">
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
              <Label htmlFor="edit-status">Status</Label>
              <Select 
                value={editedLead.status || ''} 
                onValueChange={(value) => setEditedLead({...editedLead, status: value})}
              >
                <SelectTrigger id="edit-status">
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
              <Label htmlFor="edit-tags">Tags</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="edit-tags"
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
              <Label htmlFor="edit-notes">Notes</Label>
              <textarea
                id="edit-notes"
                value={editedLead.notes || ''}
                onChange={(e) => setEditedLead({...editedLead, notes: e.target.value})}
                className="w-full min-h-[100px] p-2 border rounded-md resize-y"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                {lead.status && (
                  <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(lead.status)}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Source</h4>
                <p>{lead.source || 'Not specified'}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
              <p>{lead.phone || 'Not provided'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Tags</h4>
              {lead.tags && lead.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map(tag => (
                    <div 
                      key={tag} 
                      className="bg-muted px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No tags</p>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
              <div className="bg-muted/50 p-3 rounded-md">
                {lead.notes ? (
                  <p className="whitespace-pre-wrap">{lead.notes}</p>
                ) : (
                  <p className="text-muted-foreground text-sm">No notes</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Created</h4>
                <p>{formatDate(lead.created_at)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h4>
                <p>{formatDate(lead.updated_at)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDetail;
