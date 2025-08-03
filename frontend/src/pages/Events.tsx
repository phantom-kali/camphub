import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Clock, Plus, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import CreateEventModal from "@/components/CreateEventModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { getEvents } from "@/services/apiClient";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events_d, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Error loading Articles:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const events = [
    {
      id: 1,
      title: "Spring Career Fair 2024",
      category: "Career",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Student Union Building",
      attendees: 234,
      maxAttendees: 500,
      description:
        "Connect with top employers from various industries. Bring your resume!",
      organizer: "Career Services",
      isRSVPed: true,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Computer Science Research Symposium",
      category: "Academic",
      date: "March 18, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Engineering Building, Room 201",
      attendees: 89,
      maxAttendees: 120,
      description:
        "Undergraduate and graduate students present their research projects.",
      organizer: "CS Department",
      isRSVPed: false,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Mental Health Awareness Week",
      category: "Social",
      date: "March 20-24, 2024",
      time: "Various Times",
      location: "Multiple Locations",
      attendees: 456,
      maxAttendees: 1000,
      description:
        "Week-long series of workshops, activities, and support sessions.",
      organizer: "Student Wellness Center",
      isRSVPed: true,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Basketball vs. State University",
      category: "Sports",
      date: "March 22, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Campus Arena",
      attendees: 1200,
      maxAttendees: 2500,
      description:
        "Home game against our biggest rivals! Student section tickets available.",
      organizer: "Athletics Department",
      isRSVPed: false,
      image: "/placeholder.svg",
    },
  ];

  const categories = [
    { value: "all", label: "All Events", count: events.length },
    {
      value: "academic",
      label: "Academic",
      count: events.filter((e) => e.category === "Academic").length,
    },
    {
      value: "social",
      label: "Social",
      count: events.filter((e) => e.category === "Social").length,
    },
    {
      value: "sports",
      label: "Sports",
      count: events.filter((e) => e.category === "Sports").length,
    },
    {
      value: "career",
      label: "Career",
      count: events.filter((e) => e.category === "Career").length,
    },
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

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter(
          (event) => event.category.toLowerCase() === selectedCategory,
        );

  return (
    <div className="sided min-h-screen ">
      <Navigation />

      <div className="shape bg-gray-50 mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className=" flex justify-between items-start mb-8 ">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Campus Events
            </h1>
            <p className="text-gray-600">
              Discover and join events happening on campus
            </p>
          </div>

          <Button
            className="bg-blue-50  hover:bg-blue-600 hover:text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={
                      selectedCategory === category.value ? "default" : "ghost"
                    }
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <span>{category.label}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold">12 Events</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">My RSVPs</span>
                  <span className="font-semibold">3 Events</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Popular</span>
                  <span className="font-semibold">Career Fair</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Events */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="my-events">My Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                        <div className="absolute inset-0 bg-black bg-opacity-20" />
                        <div className="absolute top-4 left-4">
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm opacity-90">
                            by {event.organizer}
                          </p>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <p className="text-gray-600 text-sm">
                          {event.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>
                              {event.attendees} / {event.maxAttendees} attending
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link to={`/events/${event.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            className={`flex-1 ${
                              event.isRSVPed
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {event.isRSVPed ? "RSVP'd ✓" : "RSVP"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my-events" className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your Events
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Events you've RSVP'd to will appear here
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse Events
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Past Events
                  </h3>
                  <p className="text-gray-600">
                    Events you've attended will be shown here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Events;
