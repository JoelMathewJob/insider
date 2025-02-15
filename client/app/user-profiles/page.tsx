import { UserProfilesOverview } from "@/components/user-profiles-overview"
import { UserActivity } from "@/components/user-activity"
import { UserProfiles } from "@/components/user-profiles"
import { UserBehaviorAnalytics } from "@/components/user-behavior-analytics"


export default function UserProfilesPage() {
  return (

    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">User Profiles</h2>
      <UserProfilesOverview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr mt-5">



        {/* <div className="flex">
          <UserProfiles />


        </div> */}
        <div className="flex">
          <UserBehaviorAnalytics />
        </div>
        <div className="flex">
          <UserActivity />
        </div>
      </div>
    </div>

  )
}

//  <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-8">Settings</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
//         <div className="flex">
//           <UserManagement />

//         </div>
//         <div className="flex">
//           <SecurityIntegrations />

//         </div>
//         <div className="flex">
//           <DataVisualizationCustomization />
//         </div>
//         <div className="flex">
//           <CommunicationIntegration />
//         </div>
//       </div>
//     </div>