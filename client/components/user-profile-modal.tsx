"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UserProfileModal from '@/components/user-profile-modal'; // Import your modal component

export function UserProfilesOverview() {
  const topRiskUsers = [
    { id: "USR001", name: "Joel Mathew", riskScore: 85 },
    { id: "USR002", name: "Basil Mathai", riskScore: 78 },
    { id: "USR003", name: "Harsh Khairnar", riskScore: 89 },
    { id: "USR004", name: "Bobby Fischer", riskScore: 72 },
    { id: "USR005", name: "Anuj Kadu", riskScore: 72 },
    { id: "USR006", name: "Sagar Kalamani", riskScore: 72 },
    { id: "USR007", name: "Jeremy Jacob", riskScore: 72 },
    { id: "USR008", name: "Sherwin Dcosta", riskScore: 72 },
    // Add more users as needed
  ];

  const [visibleUsers, setVisibleUsers] = useState(4); // Initially show 4 users
  const [expandedUserId, setExpandedUserId] = useState(null); // Track which user is expanded
  const [modalUser , setModalUser ] = useState(null); // Track which user is in the modal

  const handleShowMore = () => {
    setVisibleUsers((prev) => prev + 4); // Show 4 more users
  };

  const toggleUserProfile = (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null); // Collapse if already expanded
    } else {
      setExpandedUserId(userId); // Expand the selected user
      setModalUser(topRiskUsers.find(user => user.id === userId)); // Set the user for the modal
    }
  };

  return (
    <div className='w-full'>
      {/* High Risk Users Section */}
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>High Risk Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {topRiskUsers.slice(0, visibleUsers).map((user) => (
              <div key={user.id}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-gray-400"
                  onClick={() => toggleUserProfile(user.id)}>
                  <CardContent className="flex items-center p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{user.name}</h3>
                      <div className="items-center mt-1">
                        <Badge variant="destructive">
                          {user.riskScore}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {expandedUserId === user.id && (
                  <div className="p-4 bg-gray-100">
                    {/* Instead of showing details here, we will show the modal */}
                    <User ProfileModal user={modalUser } onClose={() => setExpandedUser Id(null)} />
                  </div>
                )}
              </div>
            ))}
            {visibleUsers < topRiskUsers.length && (
              <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}