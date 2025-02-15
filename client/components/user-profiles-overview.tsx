
// "use client"
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { X, AlertCircle, Clock, FileText, Shield, UserCircle } from "lucide-react"; // Import icons

// export function UserProfilesOverview() {
//   const topRiskUsers = [
//     { id: "USR001", name: "Joel Mathew", riskScore: 85 },
//     { id: "USR002", name: "Basil Mathai", riskScore: 78 },
//     { id: "USR003", name: "Harsh Khairnar", riskScore: 89 },
//     { id: "USR004", name: "Bobby Fischer", riskScore: 72 },
//     { id: "USR005", name: "Anuj Kadu", riskScore: 72 },
//     { id: "USR006", name: "Sagar Kalamani", riskScore: 72 },
//     { id: "USR007", name: "Jeremy Jacob", riskScore: 72 },
//     { id: "USR008", name: "Sherwin Dcosta", riskScore: 72 },
//     // Add more users as needed
//   ];

//   const [visibleUsers, setVisibleUsers] = useState(4); // Initially show 4 users
//   const [expandedUserId, setExpandedUserId] = useState(null); // Track which user is expanded

//   const handleShowMore = () => {
//     setVisibleUsers((prev) => prev + 4); // Show 4 more users
//   };

//   const toggleUserProfile = (userId) => {
//     setExpandedUserId((prev) => (prev === userId ? null : userId)); // Toggle expanded user
//   };

//   const getRiskColor = (score) => {
//     if (score >= 80) return 'text-red-500';
//     if (score >= 60) return 'text-yellow-500';
//     return 'text-green-500';
//   };

//   return (
//     <div className='w-full'>
//       {/* High Risk Users Section */}
//       <Card className="w-full h-full">
//         <CardHeader>
//           <CardTitle>High Risk Users</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col">
//             {topRiskUsers.slice(0, visibleUsers).map((user) => (
//               <div key={user.id}>
//                 <Card className="cursor-pointer hover:shadow-lg transition-shadow border-gray-400"
//                   onClick={() => toggleUserProfile(user.id)}>
//                   <CardContent className="flex items-center p-4">
//                     <Avatar className="h-12 w-12">
//                       <AvatarFallback>
//                         {user.name.split(" ").map((n) => n[0]).join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="ml-4 flex-1">
//                       <h3 className="font-medium">{user.name}</h3>
//                       <div className="items-center mt-1">
//                         <Badge variant="destructive">
//                           {user.riskScore}
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 {expandedUserId === user.id && (
//                   <Card className="w-full max-w-2xl relative p-4 mt-2">
//                     {/* Close Button */}
//                     <button 
//                       onClick={() => setExpandedUserId(null)}
//                       className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
//                       aria-label="Close modal"
//                     >
//                       <X className="h-5 w-5 text-gray-500" />
//                     </button>

//                     <CardHeader className="pb-0">
//                       <div className="flex items-start space-x-4">
//                         <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
//                           <UserCircle className="h-10 w-10 text-gray-400" />
//                         </div>
//                         <div className="flex-1">
//                           <CardTitle className="text-xl mb-2">{user.name}</CardTitle>
//                           <div className="flex items-center space-x-2">
//                             <AlertCircle className={`h-5 w-5 ${getRiskColor(user.riskScore)}`} />
//                             <span className={`font-semibold ${getRiskColor(user.riskScore)}`}>
//                               Risk Score: {user.riskScore}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardHeader>

//                     <CardContent>
//                       <div className="space-y-6 mt-6">
//                         {/* Recent Activity Section */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                           <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-500">
//                             <Clock className="h-5 w-5 text-gray-500" />
//                             Recent Activity
//                           </h3>
//                           <div className="space-y-2 text-gray-600">
//                             <div className="flex items-center justify-between border-b border-gray-200 pb-2">
//                               <span>Last Login</span>
//                               <span className="font-medium">2024-02-13 15:45</span>
//                             </div>
//                             <div className="flex items-center justify-between border-b border-gray-200 pb-2">
//                               <span>Files Accessed</span>
//                               <span className="font-medium">23 in last 24 hours</span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <span>Failed Login Attempts</span>
//                               <span className="font-medium text-red-500">2</span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Admin Comments Section */}
//                         <div className="bg-white p-4 rounded-lg">
//                           <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-600">
//                             <Shield className="h-5 w-5 text-gray-500" />
//                             Admin Comments
//                           </h3>
//                           <div className="space-y-3">
//                             <div className="bg-white p-3 rounded-md shadow-sm">
//                               <div className="flex items-start gap-3">
//                                 <FileText className="h-5 w-5 text-gray-400 mt-1" />
//                                 <div>
//                                   <p className="text-gray-700">Multiple unusual access patterns detected - Under investigation</p>
//                                   <p className="text-sm text-gray-500 mt-1">Added by Admin on 2024-02-13</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Summary Stats */}
//                         <div className="grid grid-cols-3 gap-4 mt-4">
//                           <div className="bg-blue-50 p-3 rounded-lg">
//                             <p className="text-sm text-blue-600">Total Logins</p>
//                             <p className="text-xl font-semibold text-blue-700">147</p>
//                           </div>
//                           <div className="bg-purple-50 p-3 rounded-lg">
//                             <p className="text-sm text-purple-600">Files Accessed</p>
//                             <p className="text-xl font-semibold text-purple-700">892</p>
//                           </div>
//                           <div className="bg-orange-50 p-3 rounded-lg">
//                             <p className="text-sm text-orange-600">Alerts</p>
//                             <p className="text-xl font-semibold text-orange-700">12</p>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
//             ))}
//             {visibleUsers < topRiskUsers.length && (
//               <button
//                 className="mt-4 p-2 text-white rounded"
//                 onClick={handleShowMore}
//               >
//                 Show More
//               </button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// "use client"
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { X, AlertCircle, Clock, FileText, Shield, UserCircle } from "lucide-react"; // Import icons

// // Define a type for the user
// interface User {
//   id: string;
//   name: string;
//   riskScore: number;
//   email: string;
//   age: number;
//   location: string;
// }

// export function UserProfilesOverview() {
//   const topRiskUsers: User[] = [
//     { id: "USR001", name: "Joel Mathew", riskScore: 85, email: "joel@example.com", age: 30, location: "Mumbai" },
//     { id: "USR002", name: "Basil Mathai", riskScore: 78, email: "basil@example.com", age: 28, location: "Mumbai" },
//     { id: "USR003", name: "Harsh Khairnar", riskScore: 89, email: "harsh@example.com", age: 35, location: "Mumbai" },
//     { id: "USR004", name: "Bobby Fischer", riskScore: 72, email: "bobby@example.com", age: 40, location: "Mumbai" },
//     { id: "USR005", name: "Anuj Kadu", riskScore: 72, email: "anuj@example.com", age: 25, location: "Mumbai" },
//     { id: "USR006", name: "Sagar Kalamani", riskScore: 72, email: "sagar@example.com", age: 32, location: "Mumbai" },
//     { id: "USR007", name: "Jeremy Jacob", riskScore: 72, email: "jeremy@example.com", age: 29, location: "Mumbai" },
//     { id: "USR008", name: "Sherwin Dcosta", riskScore: 72, email: "sherwin@example.com", age: 27, location: "Mumbai" },
//   ];

//   const [selectedUser , setSelectedUser ] = useState<User | null>(null); // Track the selected user

//   const getRiskColor = (score: number) => {
//     if (score >= 80) return 'text-red-500';
//     if (score >= 60) return 'text-yellow-500';
//     return 'text-green-500';
//   };

//   return (
//     <div className="flex">
//       {/* Left Section: User List */}
//       <div className="w-1/3 p-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>High Risk Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col">
//               {topRiskUsers.map((user) => (
//                 <div 
//                   key={user.id} 
//                   className="cursor-pointer hover:bg-gray-100 p-2 transition hover:text-black" 
//                   onClick={() => setSelectedUser (user)}
//                 >
//                   <div className="flex items-center">
//                     <Avatar className="h-10 w-10 hover:text-white">
//                       <AvatarFallback>
//                         {user.name.split(" ").map((n) => n[0]).join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="ml-2 flex-1 hover:text-black">
//                       <h3 className="font-medium ">{user.name}</h3>
//                       <Badge variant="destructive">{user.riskScore}</Badge>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Right Section: User Profile Modal */}
//       <div className="w-2/3 p-4">
//         {selectedUser  ? (
//           <Card className="relative">
//             <button 
//               onClick={() => setSelectedUser (null)}
//               className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
//               aria-label="Close"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//             <CardHeader>
//               <div className="flex items-start space-x-4">
//                 <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
//                   <UserCircle className="h-10 w-10 text-gray-400" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold">{selectedUser .name}</h3>
//                   <p className="text-sm text-gray-500">Email: {selectedUser .email}</p>
//                   <p className="text-sm text-gray-500">Age: {selectedUser .age}</p>
//                   <p className="text-sm text-gray-500">Location: {selectedUser .location}</p>
//                   <p className={`text-sm ${getRiskColor(selectedUser .riskScore)}`}>Risk Score: {selectedUser .riskScore}</p>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6 mt-6">
//                 {/* Recent Activity Section */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-500">
//                     <Clock className="h-5 w-5 text-gray-500" />
//                     Recent Activity
//                   </h3>
//                   <div className="space-y-2 text-gray-600">
//                     <div className="flex items-center justify-between border-b border-gray-200 pb-2">
//                       <span>Last Login</span>
//                       <span className="font-medium">2024-02-13 15:45</span>
//                     </div>
//                     <div className="flex items-center justify-between border-b border-gray-200 pb-2">
//                       <span>Files Accessed</span>
//                       <span className="font-medium">23 in last 24 hours</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span>Failed Login Attempts</span>
//                       <span className="font-medium text-red-500">2</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Admin Comments Section */}
//                 <div className="bg-white p-4 rounded-lg">
//                   <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-600">
//                     <Shield className="h-5 w-5 text-gray-500" />
//                     Admin Comments
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="bg-white p-3 rounded-md shadow-sm">
//                       <div className="flex items-start gap-3">
//                         <FileText className="h-5 w-5 text-gray-400 mt-1" />
//                         <div>
//                           <p className="text-gray-700">Multiple unusual access patterns detected - Under investigation</p>
//                           <p className="text-sm text-gray-500 mt-1">Added by Admin on 2024-02-13</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Summary Stats */}
//                 <div className="grid grid-cols-3 gap-4 mt-4">
//                   <div className="bg-blue-50 p-3 rounded-lg">
//                     <p className="text-sm text-blue-600">Total Logins</p>
//                     <p className="text-xl font-semibold text-blue-700">147</p>
//                   </div>
//                   <div className="bg-purple-50 p-3 rounded-lg">
//                     <p className="text-sm text-purple-600">Files Accessed</p>
//                     <p className="text-xl font-semibold text-purple-700">892</p>
//                   </div>
//                   <div className="bg-orange-50 p-3 rounded-lg">
//                     <p className="text-sm text-orange-600">Alerts</p>
//                     <p className="text-xl font-semibold text-orange-700">12</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-500">Select a user to view their profile</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, AlertCircle, Clock, FileText, Shield, UserCircle } from "lucide-react"; // Import icons

// Define a type for the user
interface User {
  id: string;
  name: string;
  riskScore: number;
  email: string;
  age: number;
  location: string;
  recentActivity: string[];
  adminComments: string[];
}

export function UserProfilesOverview() {
  const topRiskUsers: User[] = [
    { 
      id: "USR001", 
      name: "Joel Mathew", 
      riskScore: 85, 
      email: "joel@example.com", 
      age: 30, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Updated profile", "Changed password"],
      adminComments: ["High risk user", "Monitor activity closely"]
    },
    { 
      id: "USR002", 
      name: "Basil Mathai", 
      riskScore: 78, 
      email: "basil@example.com", 
      age: 28, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Accessed files"],
      adminComments: ["Needs monitoring", "Potentially suspicious activity"]
    },
    { 
      id: "USR003", 
      name: "Harsh Khairnar", 
      riskScore: 89, 
      email: "harsh@example.com", 
      age: 35, 
      location: "Mumbai",
      recentActivity: ["Changed password", "Logged in from new device"],
      adminComments: ["High risk user", "Investigate further"]
    },
    { 
      id: "USR004", 
      name: "Bobby Fischer", 
      riskScore: 72, 
      email: "bobby@example.com", 
      age: 40, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Updated settings"],
      adminComments: ["Monitor for unusual activity"]
    },
    { 
      id: "USR005", 
      name: "Anuj Kadu", 
      riskScore: 72, 
      email: "anuj@example.com", 
      age: 25, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Uploaded documents"],
      adminComments: ["Regular user, no issues"]
    },
    { 
      id: "USR006", 
      name: "Priya Sharma", 
      riskScore: 90, 
      email: "priya@example.com", 
      age: 32, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Attempted unauthorized access"],
      adminComments: ["Critical risk, immediate action required"]
    },
    { 
      id: "USR007", 
      name: "Ravi Desai", 
      riskScore: 65, 
      email: "ravi@example.com", 
      age: 29, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Changed email"],
      adminComments: ["Low risk, but keep an eye on changes"]
    },
    { 
      id: "USR008", 
      name: "Sneha Patil", 
      riskScore: 82, 
      email: "sneha@example.com", 
      age: 27, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Accessed sensitive files"],
      adminComments: ["Monitor closely for any further actions"]
    },
    { 
      id: "USR009", 
      name: "Karan Mehta", 
      riskScore: 88, 
      email: "karan@example.com", 
      age: 31, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Deleted account"],
      adminComments: ["High risk, investigate deletion"]
    },
    { 
      id: "USR010", 
      name: "Neha Bhatia", 
      riskScore: 75, 
      email: "neha@example.com", 
      age: 26, 
      location: "Mumbai",
      recentActivity: ["Logged in", "Updated profile picture"],
      adminComments: ["Regular user, no concerns"]
    }
  ];

  const [selectedUser , setSelectedUser ] = useState<User | null>(null); // Track the selected user
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Track alert messages

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const handleFlag = () => {
    setAlertMessage("User  has been flagged.");
  };

  const handleBlock = () => {
    setAlertMessage("User  has been blocked.");
  };

  return (
    <div className="flex">
      {/* Left Section: User List */}
      <div className="w-1/3 p-4">
        <Card>
          <CardHeader>
            <CardTitle>High Risk Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {topRiskUsers.map((user) => (
                <div key={user.id} className="cursor-pointer hover:bg-gray-100 p-2 transition" onClick={() => setSelectedUser (user)}>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2 flex-1">
                      <h3 className="font-medium hover:text-black">{user.name}</h3>
                      <Badge variant="destructive">{user.riskScore}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section: User Profile Modal */}
      <div className="w-2/3 p-4">
        {selectedUser  ? (
          <Card className="relative">
            <button 
              onClick={() => setSelectedUser (null)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserCircle className="h-10 w-10 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">Email: {selectedUser.email}</p>
                  <p className="text-sm text-gray-500">Age: {selectedUser.age}</p>
                  <p className="text-sm text-gray-500">Location: {selectedUser.location}</p>
                  <p className={`text-sm ${getRiskColor(selectedUser.riskScore)}`}>Risk Score: {selectedUser.riskScore}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mt-6">
                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button 
                    onClick={handleFlag} 
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Flag
                  </button>
                  <button 
                    onClick={handleBlock} 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Block
                  </button>
                </div>

                {/* Alert Message */}
                {alertMessage && (
                  <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
                    {alertMessage}
                  </div>
                )}

                {/* Recent Activity Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-500">
                    <Clock className="h-5 w-5 text-gray-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    {selectedUser .recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Comments Section */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-600">
                    <Shield className="h-5 w-5 text-gray-500" />
                    Admin Comments
                  </h3>
                  <div className="space-y-3">
                    {selectedUser .adminComments.map((comment, index) => (
                      <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <p className="text-gray-700">{comment}</p>
                            <p className="text-sm text-gray-500 mt-1">Added by Admin on 2024-02-13</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600">Total Logins</p>
                    <p className="text-xl font-semibold text-blue-700">147</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600">Files Accessed</p>
                    <p className="text-xl font-semibold text-purple-700">892</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-orange-600">Alerts</p>
                    <p className="text-xl font-semibold text-orange-700">12</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to view their profile</p>
          </div>
        )}
      </div>
    </div>
  );
}