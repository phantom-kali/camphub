import React from "react";
import { ArrowLeft, Filter, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  Search,
  User,
  Calendar,
  MapPin,
  Users,
  Book,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { getCourses } from "@/services/apiClient";

const Course = () => {
  /* const [open, setOpen] = useState(false); */
  const [searchTerm, setSearchTerm] = useState("");

  /*  const location = useLocation(); */
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);

  const isActive = (path) => location.pathname === path;

  const [courses_d, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error("Error loading Courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const mainNavItems = [
    { path: "/dashboard", label: "Feed", icon: Users },
    { path: "/messages", label: "Messages", icon: MessageCircle },
    { path: "/study-groups", label: "Study Groups", icon: Users },
    { path: "/notifications", label: "Notifications", icon: Bell },
  ];

  const secondaryNavItems = [
    { path: "/courses", label: "Courses", icon: Book },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/marketplace", label: "Marketplace", icon: MapPin },
    { path: "/institutions", label: "Institutions", icon: Book },
  ];

  const enrolledCourses = [
    {
      id: "cs330",
      code: "CS 330",
      name: "Data Structures & Algorithms",
      instructor: "Dr. Sarah Wilson",
      students: 127,
      discussions: 23,
      studyGroups: 8,
      nextClass: "Mon 10:00 AM",
      progress: 78,
    },
    {
      id: "psy201",
      code: "PSY 201",
      name: "Research Methods in Psychology",
      instructor: "Dr. Michael Chen",
      students: 89,
      discussions: 15,
      studyGroups: 5,
      nextClass: "Wed 2:00 PM",
      progress: 65,
    },
    {
      id: "eng101",
      code: "ENG 101",
      name: "Composition & Literature",
      instructor: "Prof. Emily Johnson",
      students: 45,
      discussions: 31,
      studyGroups: 12,
      nextClass: "Tue 9:00 AM",
      progress: 82,
    },
  ];

  const availableCourses = [
    {
      id: "math301",
      code: "MATH 301",
      name: "Linear Algebra",
      instructor: "Dr. Robert Kim",
      students: 67,
      rating: 4.8,
      schedule: "MWF 11:00 AM - 12:00 PM",
    },
    {
      id: "bio150",
      code: "BIO 150",
      name: "Introduction to Biology",
      instructor: "Dr. Lisa Parker",
      students: 156,
      rating: 4.6,
      schedule: "TTh 1:00 PM - 2:30 PM",
    },
  ];

  const discussions = [
    {
      id: 1,
      course: "CS 330",
      title: "Binary Search Tree Implementation Help",
      author: "Alex Chen",
      replies: 12,
      lastActivity: "2 hours ago",
      isAnswered: false,
    },
    {
      id: 2,
      course: "PSY 201",
      title: "Research Paper Topic Suggestions?",
      author: "Maria Rodriguez",
      replies: 8,
      lastActivity: "4 hours ago",
      isAnswered: true,
    },
    {
      id: 3,
      course: "ENG 101",
      title: "Essay Peer Review - Due Tomorrow",
      author: "David Kim",
      replies: 15,
      lastActivity: "1 hour ago",
      isAnswered: false,
    },
  ];

  return (
    <div className="sided">
      <Navigation />

      <div className="shape bg-gray-50 mt-5 shadow-sm w-full-screen flex flex-col px-4 sm:px-6 lg:px-8 lg:w-full py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Course</h1>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search courses, discussions, or study groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-none hover:shadow-sm"
              />
            </div>
            <Button className="bg-white text-black hover:bg-white hover:shadow-sm">
              <Filter className=" w-4 h-4 mr-2 hover:shadow-sm" />
              Filter
            </Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="enrolled" className="space-y-6">
            <TabsList>
              <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
              <TabsTrigger value="available">Available Courses</TabsTrigger>
              <TabsTrigger value="discussions">Recent Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-lg transition-shadow border-none bg-white"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {course.code}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {course.name}
                          </p>
                        </div>
                        <Badge variant="secondary">{course.progress}%</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {course.instructor}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold">
                              {course.students}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">Students</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <MessageCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold">
                              {course.discussions}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">Discussions</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Book className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-semibold">
                              {course.studyGroups}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">Study Groups</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium">Next Class:</p>
                        <p className="text-sm text-gray-600">
                          {course.nextClass}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Enter Course
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="available" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="border-none hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {course.code}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {course.name}
                          </p>
                        </div>
                        <Badge variant="outline">★ {course.rating}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {course.instructor}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">
                            {course.students} enrolled
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm font-medium ">Schedule:</p>
                        <p className="text-sm ">{course.schedule}</p>
                      </div>

                      <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                        Enroll Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-4">
              {discussions.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="hover:shadow-md transition-shadow border-none"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{discussion.course}</Badge>
                          {discussion.isAnswered && (
                            <Badge className="bg-green-100 text-green-800">
                              Answered
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {discussion.title}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.replies} replies</span>
                          <span>•</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>

                      <Button
                        className="text-white bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        Join Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Course;
