
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AdminGuide = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Guide</h1>
      
      <Tabs defaultValue="cms">
        <TabsList className="mb-4">
          <TabsTrigger value="cms">CMS Guide</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty System</TabsTrigger>
          <TabsTrigger value="crm">CRM System</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started with the CMS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to the Datin Norehan CMS! This guide will help you understand how to manage your website content effectively.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="page-management">
                  <AccordionTrigger>Page Management</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Creating and Editing Pages</h3>
                      <p>To create a new page:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Navigate to "Content" → "Pages" in the sidebar</li>
                        <li>Click the "New Page" button</li>
                        <li>Enter the page title and slug (URL path)</li>
                        <li>Build your page using the content blocks</li>
                        <li>Click "Save" to store your changes</li>
                      </ol>
                      
                      <h3 className="font-semibold mt-3">Page Settings</h3>
                      <p>Each page has several important settings:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Title:</strong> The page title that appears in search results and browser tabs</li>
                        <li><strong>Slug:</strong> The URL path (e.g., "about-us" creates example.com/about-us)</li>
                        <li><strong>Meta Description:</strong> A brief summary shown in search results</li>
                        <li><strong>Published:</strong> Toggle to make the page publicly visible</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="content-blocks">
                  <AccordionTrigger>Using Content Blocks</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>The content builder uses a block-based system that allows you to build pages without coding:</p>
                      
                      <h3 className="font-semibold">Available Block Types</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Text Block:</strong> For paragraphs, headings, and formatted text</li>
                        <li><strong>Image Block:</strong> For photos and graphics with captions</li>
                        <li><strong>Hero Block:</strong> For large banner sections with call-to-action buttons</li>
                        <li><strong>Features Block:</strong> For showcasing features in a grid layout</li>
                        <li><strong>Products Block:</strong> For displaying featured products</li>
                        <li><strong>Articles Block:</strong> For showcasing blog posts</li>
                        <li><strong>Loyalty Block:</strong> For managing loyalty program features</li>
                      </ul>
                      
                      <h3 className="font-semibold mt-3">Working with Blocks</h3>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Add blocks by clicking the block type in the sidebar</li>
                        <li>Rearrange blocks by dragging them up or down</li>
                        <li>Duplicate useful blocks with the Copy button</li>
                        <li>Remove unwanted blocks with the Delete button</li>
                        <li>Preview your changes with the Preview button</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="publishing">
                  <AccordionTrigger>Publishing Content</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Follow these best practices when publishing content:</p>
                      
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Always preview content before publishing</li>
                        <li>Check how pages look on mobile devices</li>
                        <li>Ensure all images have proper alt text for accessibility</li>
                        <li>Use the "Save" button frequently to prevent losing work</li>
                        <li>Only toggle "Published" when the page is ready to go live</li>
                      </ol>
                      
                      <div className="bg-amber-50 p-3 rounded-md mt-3">
                        <p className="text-amber-800 text-sm">
                          <strong>Tip:</strong> You can save unpublished drafts and come back to them later. Only pages 
                          marked as "Published" will be visible to the public.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loyalty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty System Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The loyalty system helps you engage customers and encourage repeat business through points, 
                rewards, challenges, and tiers.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="loyalty-overview">
                  <AccordionTrigger>System Overview</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>The loyalty system has four main components:</p>
                      
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Points:</strong> Earned by customers for purchases and activities</li>
                        <li><strong>Tiers:</strong> Status levels (Bronze, Silver, Gold, Platinum) with increasing benefits</li>
                        <li><strong>Rewards:</strong> Incentives that members can redeem with points</li>
                        <li><strong>Challenges:</strong> Activities that earn bonus points or special rewards</li>
                      </ul>
                      
                      <div className="bg-blue-50 p-3 rounded-md mt-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Note:</strong> The loyalty program is deeply integrated with your CRM, 
                          allowing you to track member engagement and personalize offers.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="managing-rewards">
                  <AccordionTrigger>Managing Rewards</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>To create effective rewards:</p>
                      
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Navigate to "Loyalty" → "Rewards" in the sidebar</li>
                        <li>Click "Add Reward" to create a new reward</li>
                        <li>Set a compelling title and clear description</li>
                        <li>Choose the reward type (discount, product, experience, etc.)</li>
                        <li>Set an appropriate point cost based on value</li>
                        <li>Configure any validity periods or usage conditions</li>
                      </ol>
                      
                      <h3 className="font-semibold mt-3">Reward Types</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Discount:</strong> Percentage or fixed amount off purchases</li>
                        <li><strong>Cashback:</strong> Money returned to customer account</li>
                        <li><strong>Product:</strong> Free or discounted products</li>
                        <li><strong>Experience:</strong> Special events or services</li>
                        <li><strong>Status:</strong> Temporary tier upgrades or special recognition</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="challenges-gamification">
                  <AccordionTrigger>Challenges & Gamification</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Challenges add a gamification element to your loyalty program:</p>
                      
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Navigate to "Loyalty" → "Challenges" in the sidebar</li>
                        <li>Click "Add Challenge" to create a new activity</li>
                        <li>Set an engaging title and clear instructions</li>
                        <li>Choose the challenge type (purchase, social, engagement, etc.)</li>
                        <li>Define the completion criteria</li>
                        <li>Set point rewards and any time limitations</li>
                      </ol>
                      
                      <h3 className="font-semibold mt-3">Effective Challenge Types</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Purchase:</strong> Buy specific products or reach spending thresholds</li>
                        <li><strong>Social:</strong> Share content on social media platforms</li>
                        <li><strong>Engagement:</strong> Create reviews, complete profiles, read articles</li>
                        <li><strong>Referral:</strong> Invite friends to join the program</li>
                      </ul>
                      
                      <div className="bg-amber-50 p-3 rounded-md mt-3">
                        <p className="text-amber-800 text-sm">
                          <strong>Tip:</strong> Limited-time challenges create urgency and boost engagement. 
                          Consider creating seasonal or event-based challenges.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CRM System Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Customer Relationship Management (CRM) system helps you track and manage customer interactions, 
                leads, and relationships.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="lead-management">
                  <AccordionTrigger>Lead Management</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>To manage customer leads effectively:</p>
                      
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Navigate to "CRM" → "Leads" in the sidebar</li>
                        <li>View all leads in the main table</li>
                        <li>Filter leads by status, source, or assigned team member</li>
                        <li>Click on a lead to view detailed information</li>
                        <li>Track activities and communication history</li>
                        <li>Update lead status as they progress through your sales funnel</li>
                      </ol>
                      
                      <h3 className="font-semibold mt-3">Lead Statuses</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>New:</strong> Recently added to the system, not yet contacted</li>
                        <li><strong>Contacted:</strong> Initial outreach has been made</li>
                        <li><strong>Qualified:</strong> Determined to be a good fit for your offerings</li>
                        <li><strong>Proposal:</strong> Received a formal offer or proposal</li>
                        <li><strong>Converted:</strong> Became a customer</li>
                        <li><strong>Closed:</strong> No longer an active prospect</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="customer-tracking">
                  <AccordionTrigger>Customer Tracking</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Track important customer information and activities:</p>
                      
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Purchase history and average order value</li>
                        <li>Loyalty program participation and points balance</li>
                        <li>Communication preferences and history</li>
                        <li>Special dates (birthdays, anniversaries)</li>
                        <li>Product preferences and interests</li>
                        <li>Support interactions and feedback</li>
                      </ul>
                      
                      <div className="bg-blue-50 p-3 rounded-md mt-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Integration note:</strong> The CRM automatically receives data from website forms,
                          the loyalty system, and online purchases to maintain up-to-date customer profiles.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="crm-actions">
                  <AccordionTrigger>Customer Actions & Communication</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Available Actions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Add Note:</strong> Record important information about interactions</li>
                        <li><strong>Send Email:</strong> Contact the customer directly from the CRM</li>
                        <li><strong>Schedule Task:</strong> Create follow-up reminders</li>
                        <li><strong>Add Tags:</strong> Categorize customers for targeted marketing</li>
                        <li><strong>Update Status:</strong> Change the customer's status in your pipeline</li>
                      </ul>
                      
                      <h3 className="font-semibold mt-3">Best Practices for Communication</h3>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Always log all customer communications in the CRM</li>
                        <li>Use email templates for consistent messaging</li>
                        <li>Set follow-up tasks with clear deadlines</li>
                        <li>Use tags to segment customers for targeted campaigns</li>
                        <li>Check customer history before making contact</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Library Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Media Library helps you manage all images and media files used throughout your website.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="uploading-media">
                  <AccordionTrigger>Uploading Media Files</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>To add new media to the library:</p>
                      
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Navigate to "Media Library" in the sidebar</li>
                        <li>Click the "Upload" button in the top right</li>
                        <li>Select files from your computer or drag and drop them</li>
                        <li>Wait for the upload to complete</li>
                        <li>Your files are now available to use across the site</li>
                      </ol>
                      
                      <div className="bg-blue-50 p-3 rounded-md mt-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Supported formats:</strong> JPG, PNG, GIF, WEBP, and SVG images up to 10MB in size.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="managing-media">
                  <AccordionTrigger>Managing Media Files</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Effective media management tips:</p>
                      
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use the search function to find specific images</li>
                        <li>Click on any image to see its details and usage</li>
                        <li>Add descriptive alt text for accessibility</li>
                        <li>Delete unused images to keep your library organized</li>
                        <li>Remember that deleting an image will remove it from all pages using it</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="best-practices">
                  <AccordionTrigger>Image Best Practices</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Follow these guidelines for optimal website performance:</p>
                      
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Optimize images before uploading (compress and resize)</li>
                        <li>Use descriptive filenames (e.g., "datin-norehan-product-serum.jpg")</li>
                        <li>Add detailed alt text for accessibility and SEO</li>
                        <li>Keep hero images under 500KB for faster loading</li>
                        <li>Use WEBP format when possible for better compression</li>
                        <li>Maintain consistent image dimensions for each usage type</li>
                      </ol>
                      
                      <h3 className="font-semibold mt-3">Recommended Image Dimensions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Hero images:</strong> 1920px × 1080px</li>
                        <li><strong>Product images:</strong> 800px × 800px (square)</li>
                        <li><strong>Thumbnails:</strong> 400px × 400px</li>
                        <li><strong>Team/profile photos:</strong> 400px × 500px</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminGuide;
