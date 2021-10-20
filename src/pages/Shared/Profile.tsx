import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RootStore } from "../../store";
// COMPONENTS
import TeacherProfileComponent from "../../components/Teacher/TeacherProfileComopnent";
import StudentProfileComponent from "../../components/Student/StudentProfileComponent";
// import { errorMsg } from "../../Services/MessageDisplayHandler";
// import { notificationMsg } from "../../Services/BaseService";
// END :: COMPONENTS

const Profile: FC = observer(() => {
  const { personStore } = RootStore();
  const history = useHistory();

  useEffect(() => {
    let lastPart = history.location.pathname.split("/");
    let id = lastPart[lastPart.length - 1];
    personStore.fetchProfile(id);
  }, [personStore, history.location.pathname]);

  return (
    <div className="profile flex flex-col w-full h-full">
      <div className="flex flex-col items-start p-6 text-xl border-b">
        <span>Name: {personStore.getProfileData?.name}</span>
        <span>Surname: {personStore.getProfileData?.surname}</span>
        <span>Email: {personStore.getProfileData?.email}</span>
        <span>Role: {personStore.getProfileData?.role}</span>
      </div>
      <div className="flex flex-col h-full">
        {personStore.profileData &&
        personStore.profileData.role === "teacher" ? (
          <TeacherProfileComponent />
        ) : personStore.profileData &&
          personStore.profileData.role === "student" ? (
          <StudentProfileComponent />
        ) : (
          <div>wrong role</div>
        )}
      </div>
    </div>
  );
});

export default Profile;
