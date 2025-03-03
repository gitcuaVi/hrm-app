
import profileImg from "@/assets/profile.jpg";

const Profile = () => (
  <div className="profile">
    <img src={profileImg} alt="Profile" className="profile-img" />
    <div className="name">Đinh Hoàng Lượm</div>
    <div className="location">BL-HCM</div>
  </div>
);

export default Profile;
