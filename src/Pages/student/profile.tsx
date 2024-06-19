import Navbar from "@/Components/common/user/navbar/Navbar";
import UserDetails from "@/Components/user/profile/UserDetails";
import UserProfile from "@/Components/user/profile/userProfile";
import { useState } from "react";

const Profile: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<any>('profile'); 
  
    const renderSection = () => {
        switch (selectedSection) {
          case 'profile':
            return <UserDetails />;
          // Add more cases if needed
          default:
            return null; // Return null or default component if no case matches
        }
      };

    return (
        <>
        <Navbar/>
      <div className="flex min-h-screen">
        <UserProfile onSelect={setSelectedSection} />
        <div className="flex-1 p-4 mt-[6rem]">
            
          {renderSection()}
        </div>
      </div>
      </>
    );
  };
  
  export default Profile;