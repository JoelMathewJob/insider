
// "use client"
// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { X, AlertCircle, Clock, FileText, Shield, UserCircle, ChevronRight } from "lucide-react";
// import { LivePacketLogs } from '@/components/live-packet-logs'; // Adjust the import path as needed

// interface User {
//   id: string;
//   name: string;
//   riskScore: number;
//   email: string;
//   age: number;
//   location: string;
//   recentActivity: string[];
//   adminComments: string[];
// }

// export function UserProfilesOverview() {
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [alertMessage, setAlertMessage] = useState<string | null>(null);
//   const [users, setUsers] = useState<User[]>([]);


//   // Fetch data from users.json
//   useEffect(() => {
//     fetch("/data/users.json") // Fetch from public folder
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const getRiskColor = (score: number) => {
//     if (score >= 80) return 'text-red-500';
//     if (score >= 60) return 'text-yellow-500';
//     return 'text-green-500';
//   };

//   const handleFlag = () => {
//     if (selectedUser) {
//       setAlertMessage(`User ${selectedUser.name} has been flagged.`);
//     }
//   };

//   const handleBlock = () => {
//     if (selectedUser) {
//       setAlertMessage(`User ${selectedUser.name} has been blocked.`);
//     }
//   };

//   const renderBreadcrumbs = () => (
//     <div className="flex items-center gap-2 mb-4 text-sm">
//       <span className="text-gray-600">Users</span>
//       <ChevronRight className="h-4 w-4 text-gray-400" />
//       {selectedUser ? (
//         <>
//           <span className="text-gray-600">{selectedUser.name}</span>
//           <ChevronRight className="h-4 w-4 text-gray-400" />
//           <span className="font-medium text-gray-900">Details</span>
//         </>
//       ) : (
//         <span className="font-medium text-gray-900">All Users</span>
//       )}
//     </div>
//   );

//   return (
//     <div>
//       {renderBreadcrumbs()}
//       <div className="flex gap-4">
//         {/* Left Section: User List */}
//         <div className="w-1/4">
//           <Card>
//             <CardHeader>
//               <CardTitle>High Risk Users</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col">
//                 {users.map((user) => (
//                   <div key={user.id} className="cursor-pointer hover:bg-gray-100 p-2 transition" onClick={() => setSelectedUser(user)}>
//                     <div className="flex items-center">
//                       <Avatar className="h-10 w-10">
//                         <AvatarFallback>
//                           {user.name.split(" ").map((n) => n[0]).join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="ml-2 flex-1">
//                         <h3 className="font-medium">{user.name}</h3>
//                         <Badge variant="destructive">{user.riskScore}</Badge>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Section: Profile/Logs View */}
//         <div className="w-full">
//           {selectedUser ? (
//             <Card className="relative">
//               <button
//                 onClick={() => setSelectedUser(null)}
//                 className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
//                 aria-label="Close"
//               >
//                 <X className="h-5 w-5 text-gray-500" />
//               </button>

//               <Tabs defaultValue="profile" className="w-full">


//                 <div className="flex items-start space-x-4 p-4">
//                   <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center m-4">
//                     <UserCircle className="h-10 w-10 text-gray-400" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
//                     <p className="text-sm text-gray-500">Email: {selectedUser.email}</p>
//                     <p className="text-sm text-gray-500">Age: {selectedUser.age}</p>
//                     <p className="text-sm text-gray-500">Location: {selectedUser.location}</p>
//                     <p className={`text-sm ${getRiskColor(selectedUser.riskScore)}`}>
//                       Risk Score: {selectedUser.riskScore}
//                     </p>
//                   </div>


//                   {/* Action Buttons */}
//                   <div className="flex space-x-4 p-4 m-5">
//                     <button
//                       onClick={handleFlag}
//                       className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//                     >
//                       Flag
//                     </button>
//                     <button
//                       onClick={handleBlock}
//                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                     >
//                       Block
//                     </button>
//                   </div>

//                 </div>
//                 <div className='m-2'>
//                   {/* Alert Message */}
//                   {alertMessage && (
//                     <div className="m-4 p-2 bg-green-100 text-green-800 rounded text-center">
//                       {alertMessage}
//                     </div>
//                   )}

//                 </div>

//                 <div className='flex justify-center items-center mt-8'>
//                   <TabsList className="flex justify-center pb-12 max-md:hidden md:pb-16 dark:bg-transparent w-1/3 ">
//                     <TabsTrigger value="profile" className={`flex h-10 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full text-sm font-medium transition-colors text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 
//                   data-[state=active]:relative
//                   data-[state=active]:bg-gradient-to-b 
//                   data-[state=active]:from-gray-900 
//                   data-[state=active]:via-gray-800/60 
//                   data-[state=active]:to-gray-900 
//                   data-[state=active]:before:pointer-events-none 
//                   data-[state=active]:before:absolute 
//                   data-[state=active]:before:inset-0
//                   // Increased height of the gradient
//                   data-[state=active]:before:rounded-[inherit] 
//                   data-[state=active]:before:border 
//                   data-[state=active]:before:border-transparent 
//                   data-[state=active]:before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/10))_border-box]
//                   data-[state=active]:before:[mask-composite:exclude_!important] 
//                   data-[state=active]:before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]
//                   opacity-65 
//                   transition-opacity hover:opacity-90`}>Profile</TabsTrigger>
//                     <TabsTrigger value="logs" className={`flex h-10 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full text-sm font-medium transition-colors text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 
//                   data-[state=active]:relative
//                   data-[state=active]:bg-gradient-to-b 
//                   data-[state=active]:from-gray-900 
//                   data-[state=active]:via-gray-800/60 
//                   data-[state=active]:to-gray-900 
//                   data-[state=active]:before:pointer-events-none 
//                   data-[state=active]:before:absolute 
//                   data-[state=active]:before:inset-0
//                   // Increased height of the gradient
//                   data-[state=active]:before:rounded-[inherit] 
//                   data-[state=active]:before:border 
//                   data-[state=active]:before:border-transparent 
//                   data-[state=active]:before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/10))_border-box]
//                   data-[state=active]:before:[mask-composite:exclude_!important] 
//                   data-[state=active]:before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]
//                   opacity-65 
//                   transition-opacity hover:opacity-90`}>Logs</TabsTrigger>
//                   </TabsList>

//                 </div>

//                 <TabsContent value="profile">
//                   <CardContent>
//                     <div className="space-y-5">



//                       {/* Recent Activity Section */}
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-500">
//                           <Clock className="h-5 w-5 text-gray-500" />
//                           Recent Activity
//                         </h3>
//                         <div className="space-y-2 text-gray-600">
//                           {selectedUser.recentActivity.map((activity, index) => (
//                             <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
//                               <span>{activity}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Admin Comments Section */}
//                       <div className="bg-white p-4 rounded-lg">
//                         <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-600">
//                           <Shield className="h-5 w-5 text-gray-500" />
//                           Admin Comments
//                         </h3>
//                         <div className="space-y-3">
//                           {selectedUser.adminComments.map((comment, index) => (
//                             <div key={index} className="bg-white p-3 rounded-md shadow-sm">
//                               <div className="flex items-start gap-3">
//                                 <FileText className="h-5 w-5 text-gray-400 mt-1" />
//                                 <div>
//                                   <p className="text-gray-700">{comment}</p>
//                                   <p className="text-sm text-gray-500 mt-1">Added by Admin on 2024-02-13</p>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </TabsContent>

//                 <TabsContent value="logs">
//                   <CardContent>
//                     <LivePacketLogs />
//                   </CardContent>
//                 </TabsContent>
//               </Tabs>
//             </Card>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">Select a user to view their profile</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfilesOverview;


"use client"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Clock, FileText, Shield, ChevronRight } from "lucide-react"
import { LivePacketLogs } from "@/components/live-packet-logs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id: string
  name: string
  riskScore: number
  email: string
  age: number
  location: string
  recentActivity: string[]
  adminComments: string[]
}

export function UserProfilesOverview() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error))
  }, [])

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-500"
    if (score >= 60) return "text-yellow-500"
    return "text-green-500"
  }

  const handleFlag = () => {
    if (selectedUser) {
      setAlertMessage(`User ${selectedUser.name} has been flagged.`)
    }
  }

  const handleBlock = () => {
    if (selectedUser) {
      setAlertMessage(`User ${selectedUser.name} has been blocked.`)
    }
  }

  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-2 mb-4 text-sm">
      <span className="text-gray-600">Users</span>
      <ChevronRight className="h-4 w-4 text-gray-400" />
      {selectedUser ? (
        <>
          <span className="text-gray-600">{selectedUser.name}</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-900">Details</span>
        </>
      ) : (
        <span className="font-medium text-gray-900">All Users</span>
      )}
    </div>
  )

  return (
    <div className="container mx-auto pt-4">
      {renderBreadcrumbs()}
      <div className="flex gap-6">
        {/* Left Section: User List */}
        <Card className="w-1/4 h-[calc(100vh-60px)] ">
          <CardHeader>
            <CardTitle>High Risk Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-150px)] ">
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`cursor-pointer hover:bg-gray-600 p-3 rounded-lg transition ${
                      selectedUser?.id === user.id ? "bg-gray-700" : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge variant="destructive">{user.riskScore}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Section: Profile/Logs View */}
        <div className="flex-1">
          {selectedUser ? (
            <Card className="h-[calc(100vh-60px)]">
              {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">{selectedUser.name}</CardTitle>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </CardHeader> */}

              <Tabs defaultValue="profile" className="w-full">
                <div className="px-6">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="profile" className="mt-0">
                  <ScrollArea className="h-[calc(100vh-140px)]">
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-20 w-20">
                            <AvatarFallback className="text-2xl">
                              {selectedUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                            <p className="text-sm text-gray-500">Email: {selectedUser.email}</p>
                            <p className="text-sm text-gray-500">Age: {selectedUser.age}</p>
                            <p className="text-sm text-gray-500">Location: {selectedUser.location}</p>
                            <p className={`text-sm font-medium ${getRiskColor(selectedUser.riskScore)}`}>
                              Risk Score: {selectedUser.riskScore}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <button
                            onClick={handleFlag}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                          >
                            Flag
                          </button>
                          <button
                            onClick={handleBlock}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                          >
                            Block
                          </button>
                        </div>

                        {alertMessage && (
                          <div className="p-3 bg-green-100 text-green-800 rounded-lg">{alertMessage}</div>
                        )}

                        <div className="space-y-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-700">
                              <Clock className="h-5 w-5 text-gray-500" />
                              Recent Activity
                            </h3>
                            <div className="space-y-2 text-gray-600">
                              {selectedUser.recentActivity.map((activity, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between border-b border-gray-200 pb-2"
                                >
                                  <span>{activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="font-medium flex items-center gap-2 mb-3 text-gray-700">
                              <Shield className="h-5 w-5 text-gray-500" />
                              Admin Comments
                            </h3>
                            <div className="space-y-3">
                              {selectedUser.adminComments.map((comment, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-md">
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
                        </div>
                      </div>
                    </CardContent>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="logs" className="mt-0">
                  <CardContent className="p-0">
                    <LivePacketLogs />
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-120px)]">
              <p className="text-gray-500">Select a user to view their profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfilesOverview

