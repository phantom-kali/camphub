import React, { useState } from "react";
import { Mail, Lock, User, GraduationCap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login } from "@/services/apiClient";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    major: "",
    graduation_year: "",
    department: "",
    student_id: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: formData.email,
      password: formData.password,
    };
    const response = await login(data);

    console.log("Auth form submitted:", response);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(formData);

    console.log("Auth form submitted:", response);
  };

  const majors = [
    "Computer Science",
    "Engineering",
    "Business",
    "Psychology",
    "Biology",
    "Mathematics",
    "English",
    "History",
    "Art",
    "Music",
    "Other",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">CampusConnect</h1>
          <p className="text-gray-600 mt-2">
            Connect with your campus community
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold">
              {isLogin ? "Welcome Back" : "Join Your Campus"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs value={isLogin ? "login" : "signup"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="login"
                  onClick={() => setIsLogin(true)}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  onClick={() => setIsLogin(false)}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Institutional Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 " />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-10 bg-blue-50 border-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className=" bg-blue-50 pl-10 border-none"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        type="text"
                        placeholder="John"
                        value={formData.first_name}
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                        className=" bg-blue-50 border-none"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="first_name">Last Name</Label>
                      <Input
                        id="first_name"
                        type="text"
                        placeholder="Doe"
                        value={formData.first_name}
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                        className=" bg-blue-50 border-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signupEmail">Institutional Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your.email@university.edu"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-10  bg-blue-50 border-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="major">Major</Label>
                    <Select
                      value={formData.major}
                      onValueChange={(value) =>
                        handleInputChange("major", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select your major"
                          className=" bg-blue-50 border-none"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {majors.map((major) => (
                          <SelectItem
                            className=" bg-blue-50 border-none"
                            key={major}
                            value={major}
                          >
                            {major}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="graduation_year">Graduation Year</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="graduation_year"
                        type="text"
                        placeholder="Enter Your Graduation Year"
                        value={formData.graduation_year}
                        onChange={(e) =>
                          handleInputChange("graduation_year", e.target.value)
                        }
                        className="pl-10  bg-blue-50 border-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="student_id">Student ID</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="student_id"
                        type="text"
                        placeholder="Enter Your Student ID"
                        value={formData.student_id}
                        onChange={(e) =>
                          handleInputChange("student_id", e.target.value)
                        }
                        className="pl-10  bg-blue-50 border-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pl-10 bg-blue-50 border-none"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                By continuing, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
