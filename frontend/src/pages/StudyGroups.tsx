import React, { useState, useEffect } from "react";
import { Users, Calendar, MapPin, Search, Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getAllStudyGroups } from "@/services/apiClient";

const StudyGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [groups, setGroups] = useState([]);
  const fetchGroups = async () => {
    try {
      const data = await getAllStudyGroups();
      setGroups(data);
    } catch (err) {
      console.error("Error loading Groups:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const studyGroups = [
    {
      id: 1,
      name: "Advanced Mathematics Study Group",
      subject: "Mathematics",
      description:
        "Weekly study sessions for Calculus III and Linear Algebra students.",
      members: 12,
      maxMembers: 15,
      meetingTime: "Tuesdays 6:00 PM",
      location: "Library Room 204",
      isJoined: true,
      difficulty: "Advanced",
    },
    {
      id: 2,
      name: "Web Development Bootcamp",
      subject: "Computer Science",
      description:
        "Learning React, Node.js, and full-stack development together.",
      members: 8,
      maxMembers: 12,
      meetingTime: "Saturdays 2:00 PM",
      location: "CS Lab 301",
      isJoined: false,
      difficulty: "Intermediate",
    },
    {
      id: 3,
      name: "Biology Pre-Med Study Circle",
      subject: "Biology",
      description:
        "Focused study group for pre-med students tackling organic chemistry.",
      members: 6,
      maxMembers: 10,
      meetingTime: "Thursdays 5:30 PM",
      location: "Science Building 102",
      isJoined: true,
      difficulty: "Advanced",
    },
  ];

  const subjects = [
    "all",
    "Mathematics",
    "Computer Science",
    "Biology",
    "Physics",
    "Chemistry",
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredGroups = studyGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || group.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen sided">
      <Navigation />

      <div className="shape bg-gray-50 max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Study Groups
            </h1>
            <p className="text-gray-600">
              Join or create study groups with your peers
            </p>
          </div>

          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search groups..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <div className="space-y-2">
                    {subjects.map((subject) => (
                      <Button
                        key={subject}
                        variant={
                          selectedSubject === subject ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setSelectedSubject(subject)}
                      >
                        {subject === "all" ? "All Subjects" : subject}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Study Groups */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <Card
                  key={group.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge className={getDifficultyColor(group.difficulty)}>
                        {group.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="outline">{group.subject}</Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{group.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>
                          {group.members} / {group.maxMembers} members
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{group.meetingTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{group.location}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link to={`/study-groups/${group.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        className={`flex-1 ${
                          group.isJoined
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {group.isJoined ? "Joined ✓" : "Join Group"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;
