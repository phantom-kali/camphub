import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Share, Bell } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getEventById } from "@/services/apiClient";

const EventDetail = () => {
  const { id } = useParams();
  const [isRSVPed, setIsRSVPed] = useState(false);

  const [event_d, setEvent] = useState([]);

  const fetchEvent = async () => {
    try {
      if (!id) return;
      const data = await getEventById(String(id));
      setEvent(Array.isArray(data) ? data[0] : data);
      console.log(data);
    } catch (err) {
      console.error("Error loading Event:", err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const event = {
    id: 1,
    title: "Spring Career Fair 2024",
    category: "Career",
    date: "March 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Student Union Building",
    attendees: 234,
    maxAttendees: 500,
    description:
      "Connect with top employers from various industries. The Spring Career Fair brings together students and leading companies for networking, interviews, and career opportunities. This is your chance to make lasting connections and discover exciting career paths.",
    organizer: "Career Services",
    organizerAvatar: "/placeholder.svg",
    detailedDescription: `Join us for the biggest career event of the semester! This career fair will feature over 50 companies from various industries including technology, finance, healthcare, and more.

What to expect:
• Meet recruiters from top companies
• On-site interviews and networking opportunities
• Resume review sessions
• Career workshops and presentations
• Free professional headshots

What to bring:
• Multiple copies of your resume
• Professional attire
• Portfolio or work samples (if applicable)
• Business cards (if you have them)

Companies attending include: Google, Microsoft, JPMorgan Chase, Johnson & Johnson, Deloitte, and many more!`,
    image: "/placeholder.svg",
  };

  const attendees = [
    { name: "John Doe", avatar: "/placeholder.svg", year: "Senior" },
    { name: "Jane Smith", avatar: "/placeholder.svg", year: "Junior" },
    { name: "Mike Johnson", avatar: "/placeholder.svg", year: "Graduate" },
    { name: "Sarah Williams", avatar: "/placeholder.svg", year: "Senior" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "social":
        return "bg-green-100 text-green-800";
      case "sports":
        return "bg-orange-100 text-orange-800";
      case "career":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen sided">
      <Navigation />

      <div className="shape bg-gray-50  mt-4 px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-purple-500 to-blue-600 relative">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute bottom-6 left-6 text-white">
              <Badge
                className={getCategoryColor(event.category)}
                style={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              >
                {event.category}
              </Badge>
              <h1 className="text-4xl font-bold mt-2 mb-2">{event.title}</h1>
              <p className="text-lg opacity-90">by {event.organizer}</p>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>
                  {event.attendees} / {event.maxAttendees} attending
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={() => setIsRSVPed(!isRSVPed)}
                className={`flex-1 ${
                  isRSVPed
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isRSVPed ? "RSVP'd ✓" : "RSVP to Event"}
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Remind Me
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {event.detailedDescription
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{event.organizer}</h4>
                    <p className="text-gray-600 text-sm">Event Organizer</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendees ({event.attendees})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {attendee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {attendee.name}
                        </p>
                        <p className="text-xs text-gray-500">{attendee.year}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-sm">
                    View All Attendees
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Category
                  </span>
                  <p>{event.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Capacity
                  </span>
                  <p>{event.maxAttendees} people</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Status
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Open for Registration
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
