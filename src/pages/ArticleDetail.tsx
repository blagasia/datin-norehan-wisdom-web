
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar, User, Heart, MessageCircle, BookOpen } from 'lucide-react';
import TikTokVideo from '@/components/TikTokVideo';
import { toast } from 'sonner';
import { blogArticles } from '@/data/blogArticles';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const article = blogArticles.find(article => article.id === Number(articleId));

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6">The article you are looking for doesn't exist or has been removed.</p>
            <Link to="/articles">
              <Button>Return to Articles</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownloadPDF = () => {
    toast.success("Redirecting to payment page for PDF download", {
      description: "You will be redirected to complete your RM10 payment"
    });
  };

  // Find the next article for reading suggestions
  const nextArticleIndex = blogArticles.findIndex(a => a.id === article.id) + 1;
  const nextArticle = blogArticles[nextArticleIndex >= blogArticles.length ? 0 : nextArticleIndex];

  const renderArticleContent = () => {
    switch (article.type) {
      case 'video':
        return (
          <div className="space-y-12">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              {article.videoId ? (
                <TikTokVideo videoId={article.videoId} />
              ) : (
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <p>Video unavailable</p>
                </div>
              )}
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{article.content}</p>
              
              <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800" 
                    alt="Beauty ingredients" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800" 
                    alt="Herbal preparation" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              
              <h3 className="text-2xl font-playfair font-semibold mt-8 mb-4">The Science Behind Traditional Beauty</h3>
              <p className="text-lg leading-relaxed">
                While these recipes have been passed down through generations, modern science now confirms 
                what our ancestors intuitively knew. The rice flour in this scrub contains compounds that inhibit 
                melanin production, helping to naturally lighten dark spots. Turmeric contains curcumin, a powerful 
                anti-inflammatory agent that calms irritated skin and reduces redness. The healthy fats in coconut 
                milk replenish the skin's moisture barrier, preventing dehydration and supporting overall skin health.
              </p>
              
              <div className="my-8 p-8 bg-natural-purple/10 rounded-lg border border-natural-purple/20 text-center">
                <p className="italic text-xl font-playfair">"Beauty rituals are not just about appearance—they're sacred 
                moments of self-care that nourish both skin and soul."</p>
                <p className="mt-2 text-natural-gray">— Datin Norehan</p>
              </div>
              
              <h3 className="text-2xl font-playfair font-semibold mt-8 mb-4">Modern Adaptations</h3>
              <p className="text-lg leading-relaxed">
                While I always encourage using traditional methods whenever possible, I understand that modern lifestyles 
                sometimes require adaptations. If you don't have time for the full fermentation process, you can still benefit 
                from a simplified version using the same ingredients in their fresh form. The efficacy won't be exactly the same, 
                but you'll still experience significant improvements in skin texture and tone.
              </p>
              
              {article.hasPDF && (
                <div className="mt-12 p-8 bg-natural-peach/20 rounded-lg border border-natural-peach/30">
                  <h3 className="text-2xl font-playfair font-semibold mb-4">Download the Complete Beauty Ritual E-Book</h3>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3">
                      <img 
                        src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=400" 
                        alt="Recipe E-Book" 
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <p className="mb-4 text-lg">
                        Get a beautifully designed 25-page PDF with this complete beauty ritual and 5 more exclusive 
                        traditional Malaysian beauty secrets from Datin Norehan. Each recipe includes detailed instructions, 
                        scientific explanations, and modern adaptations.
                      </p>
                      <ul className="list-disc list-inside mb-6 space-y-2">
                        <li>Traditional Malaysian Facial Scrub</li>
                        <li>Herbal Hair Growth Oil</li>
                        <li>Anti-Aging Face Mask</li>
                        <li>Natural Body Brightening Treatment</li>
                        <li>Overnight Healing Balm</li>
                      </ul>
                      <Button onClick={handleDownloadPDF} className="bg-natural-peach hover:bg-natural-peach/90 text-natural-dark">
                        Download PDF (RM10)
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="space-y-12">
            <div className="bg-natural-purple/20 p-8 rounded-lg border border-natural-purple/30">
              <h3 className="text-2xl font-playfair font-semibold mb-6">Listen to Live "Ask Datin" Session</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/4">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400" 
                    alt="Ask Datin Session"
                    className="rounded-full aspect-square object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <p className="mb-4 text-lg">
                    Join Datin Norehan as she answers questions from our community about Malaysian herbal practices.
                    This recording is from our exclusive monthly live session with subscribers.
                  </p>
                  <audio controls className="w-full mb-4">
                    <source src={article.audioUrl || "#"} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-sm text-natural-gray">Recorded April 2, 2025 • 22 minutes</p>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h3 className="text-2xl font-playfair font-semibold mt-8 mb-4">Session Highlights</h3>
              
              <div className="my-6 p-6 bg-natural-green/10 rounded-lg border-l-4 border-natural-peach">
                <h4 className="text-xl font-semibold mb-2">Question from Nurul, Penang</h4>
                <p className="italic mb-4">
                  "My daughter has eczema that flares up seasonally. What traditional Malaysian remedies might help manage her symptoms?"
                </p>
                <p>
                  Datin Norehan discusses how virgin coconut oil infused with soursop leaves can create a soothing topical application, 
                  and how internally, a special tea blend of pegaga and misai kucing can help address the inflammatory response.
                </p>
              </div>
              
              <div className="my-6 p-6 bg-natural-green/10 rounded-lg border-l-4 border-natural-peach">
                <h4 className="text-xl font-semibold mb-2">Question from Ahmad, Kuala Lumpur</h4>
                <p className="italic mb-4">
                  "I notice many commercial products now claim to use traditional Malaysian herbs. How can consumers identify authentic, quality herbal products?"
                </p>
                <p>
                  Datin shares her expert tips on reading labels, understanding extraction methods, and identifying reliable sources for authentic Malaysian herbal products.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600" 
                    alt="Natural herbs" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold">Sourcing Native Plants</h4>
                    <p className="text-sm text-natural-gray">Topics covered in minutes 2-8</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600" 
                    alt="Oil preparation" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold">Herbal Oil Infusions</h4>
                    <p className="text-sm text-natural-gray">Topics covered in minutes 9-15</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600" 
                    alt="Seasonal botanicals" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h4 className="font-semibold">Seasonal Adaptations</h4>
                    <p className="text-sm text-natural-gray">Topics covered in minutes 16-22</p>
                  </div>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed">{article.content}</p>
              
              <div className="mt-12 bg-natural-green/20 p-6 rounded-lg text-center">
                <h4 className="text-xl font-semibold mb-4">Join Our Next Live Session</h4>
                <p className="mb-6">
                  Exclusive to our community members, these monthly sessions give you direct access to Datin Norehan's expertise.
                </p>
                <Button className="bg-natural-dark">Register Now</Button>
              </div>
            </div>
          </div>
        );
      case 'event':
        return (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="rounded-lg w-full h-auto shadow-lg mb-6"
                  />
                )}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600" 
                    alt="Workshop Session"
                    className="rounded-lg w-full h-40 object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600" 
                    alt="Herbal Display"
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-playfair font-semibold mb-4">Event Details</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className="bg-natural-green/20 px-4 py-1 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.eventDate}
                    </Badge>
                    <Badge variant="outline" className="bg-natural-peach/20 px-4 py-1 text-sm">
                      <User className="w-4 h-4 mr-1" />
                      3,000+ Attendees
                    </Badge>
                    <Badge variant="outline" className="bg-natural-purple/20 px-4 py-1 text-sm">
                      {article.eventLocation}
                    </Badge>
                  </div>
                  <p className="text-lg leading-relaxed mb-6">{article.content?.split('\n\n')[0]}</p>
                  
                  {article.upcoming && (
                    <div className="mt-6">
                      <Button className="bg-natural-peach hover:bg-natural-peach/90 text-natural-dark">Register for Next Event</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <Separator className="my-10 bg-natural-green/30" />
            
            <div className="prose max-w-none">
              <h3 className="text-2xl font-playfair font-semibold mb-6">Event Highlights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-green/20">
                  <h4 className="text-xl font-semibold mb-3">Traditional Blessing Ceremony</h4>
                  <p className="mb-4">
                    Indigenous healers from Sabah performed an opening ritual, acknowledging ancestral knowledge 
                    and setting an authentic tone for the weekend.
                  </p>
                  <img 
                    src="https://images.unsplash.com/photo-1551696785-927d4ac2d35b?w=600" 
                    alt="Opening Ceremony"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-green/20">
                  <h4 className="text-xl font-semibold mb-3">Healing Kitchen Demonstrations</h4>
                  <p className="mb-4">
                    Interactive workshops where participants learned to prepare therapeutic foods and fermented 
                    wellness tonics using traditional methods.
                  </p>
                  <img 
                    src="https://images.unsplash.com/photo-1556910633-5099dc3971e6?w=600" 
                    alt="Healing Kitchen"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-green/20">
                  <h4 className="text-xl font-semibold mb-3">Herbalists' Marketplace</h4>
                  <p className="mb-4">
                    Over 50 small-batch producers from rural communities showcased their artisanal products 
                    and shared their family traditions.
                  </p>
                  <img 
                    src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600" 
                    alt="Marketplace"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
              </div>
              
              <div className="my-12 p-8 bg-natural-purple/10 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Knowledge Exchange Panel</h4>
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" 
                    alt="Panel Discussion"
                    className="rounded-lg w-full md:w-1/3 h-64 object-cover"
                  />
                  <div className="w-full md:w-2/3">
                    <p className="text-lg mb-4">
                      One of the festival highlights was our panel bringing together traditional healers, 
                      modern physicians, and scientific researchers to discuss integrating traditional wisdom 
                      into contemporary healthcare.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200" />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Dr. Sarah Lim</p>
                          <p className="text-sm text-natural-gray">Integrative Medicine</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200" />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Pak Rahmat</p>
                          <p className="text-sm text-natural-gray">Traditional Healer</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200" />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Prof. Ahmad Razak</p>
                          <p className="text-sm text-natural-gray">Pharmacognosy Researcher</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" />
                          <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Datin Norehan</p>
                          <p className="text-sm text-natural-gray">Moderator</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed">{article.content?.split('\n\n').slice(1).join('\n\n')}</p>
              
              <div className="mt-12 bg-natural-peach/20 p-8 rounded-lg text-center">
                <h4 className="text-2xl font-playfair font-semibold mb-4">Save the Date: DNA Wellness Festival 2026</h4>
                <p className="mb-6 text-lg">
                  Join us next year for an even bigger celebration of Malaysian herbal traditions and modern wellness practices.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="outline" className="bg-white px-4 py-2">March 12-14, 2026</Badge>
                  <Badge variant="outline" className="bg-white px-4 py-2">Kuala Lumpur Convention Center</Badge>
                  <Badge variant="outline" className="bg-white px-4 py-2">Early Bird Registration Opens October 2025</Badge>
                </div>
              </div>
            </div>
          </div>
        );
      case 'reflection':
        return (
          <div className="prose max-w-none">
            <div className="mb-12 italic text-2xl font-playfair leading-relaxed border-l-4 pl-6 border-natural-peach">
              "{article.quote}"
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800" 
                  alt="Writing journal" 
                  className="rounded-lg shadow-lg mb-6"
                />
                <p className="text-lg leading-relaxed">
                  My journey with natural healing began long before DNA became a company. As a child, I watched my grandmother 
                  transform plants from our garden into remedies that helped our neighbors with everything from fever to heartbreak. 
                  These weren't separate acts—the physical healing and emotional comfort were always intertwined.
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-lg leading-relaxed mb-6">
                    At university, I studied biochemistry, driven by a desire to understand scientifically what my grandmother 
                    understood intuitively. Those years in the laboratory gave me a different perspective on the plants I'd grown 
                    up with. I could now name the compounds that made tumeric reduce inflammation or explain why certain herbal 
                    combinations worked synergistically.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Yet something was missing in this analytical approach. I found myself drawn back to the holistic wisdom 
                    of my grandmother, where healing wasn't just about addressing symptoms but nurturing the whole person.
                  </p>
                </div>
                <div className="mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1592930954854-7d00c87d0cf4?w=800" 
                    alt="Lab research" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="my-12 p-8 bg-natural-green/10 rounded-lg">
              <h3 className="text-2xl font-playfair font-semibold mb-4">Bridging Two Worlds</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1555050551-82f8d8c83b9d?w=600" 
                  alt="Traditional herbs"
                  className="rounded-lg w-full h-64 object-cover col-span-1"
                />
                <div className="col-span-2">
                  <p className="text-lg leading-relaxed mb-4">
                    When I began formulating the first DNA products in my kitchen, I was consciously bridging these worlds. 
                    Each formulation became a dialogue between traditional knowledge and scientific understanding. I would start 
                    with my grandmother's recipes, then refine them with my biochemical knowledge, always testing them on myself 
                    before sharing them with others.
                  </p>
                  <p className="text-lg leading-relaxed">
                    What began as personal healing journey has evolved into a mission to preserve and evolve Malaysian herbal traditions. 
                    Through DNA, we're not just selling products, but protecting a cultural heritage that might otherwise be lost to modernization.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed">
              The most fulfilling aspect of this work is witnessing the revival of interest in traditional wisdom among younger Malaysians. 
              When a young mother tells me she's growing ulam in her apartment to make remedies for her children, just as her great-grandmother 
              might have done in a kampung decades ago, I see the unbroken thread of our healing traditions continuing.
            </p>
            
            <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1617102738820-182070f0805e?w=600" 
                  alt="Product creation" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white">
                  <h4 className="font-semibold text-lg mb-2">Creating with Intention</h4>
                  <p>
                    Every formula we develop begins with a clear healing intention, honoring the traditional understanding 
                    that energy and purpose are as important as ingredients.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1600880291319-1a7499c191e8?w=600" 
                  alt="Ingredient selection" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white">
                  <h4 className="font-semibold text-lg mb-2">Sourcing with Integrity</h4>
                  <p>
                    We work directly with small-scale farmers who grow medicinal herbs using traditional methods, 
                    supporting sustainable agriculture and rural communities.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=600" 
                  alt="Knowledge sharing" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white">
                  <h4 className="font-semibold text-lg mb-2">Preserving Knowledge</h4>
                  <p>
                    Beyond products, we document traditional practices, creating a living archive of Malaysian 
                    healing wisdom for future generations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="my-12 italic text-xl font-playfair leading-relaxed text-center bg-natural-purple/20 p-8 rounded-lg">
              "Every product we create carries not just ingredients, but stories, wisdom, and the healing intentions of generations before us."
              <p className="mt-2 text-natural-gray font-sans text-base">— Datin Norehan</p>
            </div>
            
            <p className="text-lg leading-relaxed">
              Every product we create carries not just ingredients, but stories, wisdom, and the healing intentions of generations 
              before us. This is what makes our work at DNA more than a business—it's a living heritage, evolving with each person who participates in it.
            </p>
          </div>
        );
      default:
        return (
          <div className="prose max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
              <div className="lg:col-span-2">
                <p className="text-lg leading-relaxed mb-6">{article.content?.split('\n\n')[0]}</p>
                <p className="text-lg leading-relaxed">{article.content?.split('\n\n')[1]}</p>
                
                <div className="my-8 p-8 bg-natural-green/10 rounded-lg border border-natural-green/20">
                  <h3 className="text-2xl font-playfair font-semibold mb-4">Key Herbs and Their Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-natural-peach/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <BookOpen className="w-6 h-6 text-natural-peach" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Ulam Raja (King's Salad)</h4>
                        <p>Regulates blood sugar and reduces inflammation through its bitter compounds. Consumed regularly to prevent diabetes and hypertension.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-natural-peach/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <BookOpen className="w-6 h-6 text-natural-peach" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Pegaga (Centella asiatica)</h4>
                        <p>Improves blood circulation and promotes healing. Both a topical treatment for skin conditions and an internal support for brain function.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-natural-peach/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <BookOpen className="w-6 h-6 text-natural-peach" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Kunyit (Turmeric)</h4>
                        <p>A golden remedy for digestive issues and infections. Mixed with honey and warm water to create a soothing drink that calms upset stomachs.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-natural-peach/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <BookOpen className="w-6 h-6 text-natural-peach" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Misai Kucing (Cat's Whiskers)</h4>
                        <p>Exceptional for kidney and urinary tract health. A natural diuretic that helps flush toxins from the body and reduces water retention.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <img 
                  src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600" 
                  alt="Traditional herb garden" 
                  className="rounded-lg shadow-lg mb-6"
                />
                <div className="bg-natural-purple/10 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Did You Know?</h4>
                  <p className="text-sm">
                    Malaysia is home to over 2,000 plant species with documented medicinal properties, 
                    making it one of the world's richest sources of herbal medicine knowledge.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <img 
                src="https://images.unsplash.com/photo-1579684285427-1c29d7312178?w=800" 
                alt="Traditional preparation methods" 
                className="rounded-lg shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-playfair font-semibold mb-4">The Cultural Context</h3>
                <p className="text-lg leading-relaxed">
                  These herbs aren't just medicinal—they form an integral part of our culinary tradition too. 
                  By incorporating them into our daily meals, we practice preventative healthcare in the most delicious way possible.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Traditional Malaysian healing doesn't separate food from medicine—they are seen as parts of the same continuum. 
                  This holistic approach recognizes that what we consume daily has profound effects on our long-term health.
                </p>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed">{article.content?.split('\n\n').slice(2).join('\n\n')}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 md:py-24 bg-natural-purple/5">
        <div className="container mx-auto px-4">
          <Link to="/articles" className="inline-flex items-center text-natural-gray hover:text-natural-dark mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Articles
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
            {article.type !== 'article' && (
              <Badge className="text-xs">
                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
              </Badge>
            )}
            {article.featured && (
              <Badge className="text-xs bg-natural-peach/90 text-white">
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-natural-gray mb-10">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" alt={article.author} />
                <AvatarFallback>DN</AvatarFallback>
              </Avatar>
              <span>By {article.author}</span>
            </div>
            <div>•</div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{article.date}</span>
            </div>
            {article.readTime && (
              <>
                <div>•</div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{article.readTime} read</span>
                </div>
              </>
            )}
            {article.likes !== undefined && (
              <>
                <div>•</div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{article.likes}</span>
                </div>
              </>
            )}
            {article.comments !== undefined && (
              <>
                <div>•</div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span>{article.comments}</span>
                </div>
              </>
            )}
          </div>
          
          {article.image && article.type !== 'event' && (
            <div className="mb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm">
            {renderArticleContent()}
          </div>
          
          <div className="mt-16 border-t border-natural-peach/30 pt-12">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-playfair text-2xl font-bold">More Like This</h2>
              <Link to="/articles" className="text-natural-peach hover:text-natural-peach/80">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles
                .filter(a => a.id !== article.id && a.category === article.category)
                .slice(0, 3)
                .map(relatedArticle => (
                  <Link key={relatedArticle.id} to={`/articles/${relatedArticle.id}`} className="group">
                    <div className="overflow-hidden rounded-lg mb-4 shadow-sm">
                      {relatedArticle.image ? (
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-natural-green/30" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-natural-peach transition-colors">{relatedArticle.title}</h3>
                    <p className="text-sm text-natural-gray">{relatedArticle.date} • {relatedArticle.readTime || "5 min"} read</p>
                  </Link>
                ))}
            </div>
            
            <div className="mt-16 flex justify-between items-center">
              <div>
                <p className="text-sm text-natural-gray mb-1">Next Article</p>
                <Link to={`/articles/${nextArticle.id}`} className="text-lg font-semibold hover:text-natural-peach transition-colors">
                  {nextArticle.title}
                </Link>
              </div>
              <Link to={`/articles/${nextArticle.id}`}>
                <Button variant="outline" className="hover:bg-natural-peach/20">
                  Continue Reading
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
