
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface Activity {
  id: string;
  lead_id: string;
  activity_type: string;
  description: string;
  created_at: string;
  created_by: string | null;
}

interface LeadActivitiesProps {
  leadId: string;
}

const activityTypeOptions = [
  { value: 'note', label: 'Note' },
  { value: 'email', label: 'Email' },
  { value: 'call', label: 'Call' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'task', label: 'Task' },
  { value: 'status_change', label: 'Status Change' },
];

const LeadActivities: React.FC<LeadActivitiesProps> = ({ leadId }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [newActivity, setNewActivity] = useState({
    activity_type: 'note',
    description: ''
  });
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchActivities();
  }, [leadId]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lead_activities')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setActivities(data as Activity[]);
    } catch (error: any) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: `Failed to fetch activities: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async () => {
    try {
      if (!newActivity.description.trim()) {
        toast({
          title: "Validation Error",
          description: "Activity description is required",
          variant: "destructive"
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('lead_activities')
        .insert([{
          lead_id: leadId,
          activity_type: newActivity.activity_type,
          description: newActivity.description
        }])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Activity added successfully"
      });
      
      // Reset form and refresh activities
      setNewActivity({
        activity_type: 'note',
        description: ''
      });
      setIsAddingActivity(false);
      fetchActivities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to add activity: ${error.message}`,
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
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'note':
        return '📝';
      case 'email':
        return '📧';
      case 'call':
        return '📞';
      case 'meeting':
        return '👥';
      case 'task':
        return '✅';
      case 'status_change':
        return '🔄';
      default:
        return '📌';
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Activity History</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAddingActivity(!isAddingActivity)}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Activity
        </Button>
      </div>
      
      {isAddingActivity && (
        <div className="bg-muted p-3 rounded-md mb-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="activity_type">Activity Type</Label>
              <Select 
                value={newActivity.activity_type} 
                onValueChange={(value) => setNewActivity({...newActivity, activity_type: value})}
              >
                <SelectTrigger id="activity_type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newActivity.description}
                onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                placeholder="Describe the activity..."
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAddingActivity(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleAddActivity}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No activities recorded yet
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex gap-3">
              <div className="mt-1">
                <span className="text-lg" role="img" aria-label={activity.activity_type}>
                  {getActivityIcon(activity.activity_type)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-medium capitalize">
                    {activity.activity_type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(activity.created_at)}
                  </span>
                </div>
                <p className="text-sm mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadActivities;
