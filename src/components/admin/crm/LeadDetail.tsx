import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tag, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Lead {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  source: string | null;
  status: string | null;
  tags: string[] | null;
  notes?: string | null;
  created_at: string;
  updated_at?: string;
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

const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onLeadUpdated, formatDate, getStatusColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Lead>({ ...lead });
  const [currentTag, setCurrentTag] = useState('');
  const { toast } = useToast();

  const handleSaveChanges = async () => {
    try {
      const { error } = await (supabase
        .from('leads' as any)
        .update({
          full_name: editedLead.full_name,
          email: editedLead.email,
          phone: editedLead.phone,
          source: editedLead.source,
          status: editedLead.status,
          tags: editedLead.tags,
          notes: editedLead.notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', lead.id) as any);

      if (error) throw error;

      // Log activity
      await (supabase
        .from('lead_activities' as any)
        .insert({
          lead_id: lead.id,
          activity_type: 'update',
          description: 'Lead details updated',
        }) as any);

      toast({
        title: "Success",
        description: "Lead updated successfully",
      });

      setIsEditing(false);
      onLeadUpdated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update lead: ${error.message}`,
        variant: "destructive",
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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Lead Info</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 pt-4">
          {isEditing ? (
            // Edit mode
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
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
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            </>
          ) : (
            // View mode
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-base">{lead.full_name || <span className="text-muted-foreground italic">Not provided</span>}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base">{lead.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-base">{lead.phone || <span className="text-muted-foreground italic">Not provided</span>}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Source</p>
                  <p className="text-base capitalize">{lead.source || <span className="text-muted-foreground italic">Unknown</span>}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                {lead.status && (
                  <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(lead.status)}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tags</p>
                {lead.tags && lead.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
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
                  <p className="text-muted-foreground italic">No tags</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p className="text-base">{formatDate(lead.created_at)}</p>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={() => setIsEditing(true)}>
                  Edit Lead
                </Button>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="notes" className="space-y-4 pt-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <textarea
                  id="edit-notes"
                  value={editedLead.notes || ''}
                  onChange={(e) => setEditedLead({...editedLead, notes: e.target.value})}
                  className="w-full min-h-[200px] p-2 border rounded-md"
                  placeholder="Add notes about this lead..."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  Save Notes
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {lead.notes ? (
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {lead.notes}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No notes available for this lead</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Add Notes
                  </Button>
                </div>
              )}
              
              {lead.notes && (
                <div className="flex justify-end mt-4">
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Notes
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadDetail;
