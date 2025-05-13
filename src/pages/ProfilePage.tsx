// import './ProfilePage.css';
import { FaSave } from 'react-icons/fa';

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="header">
        <h1>Settings</h1>
        <small>View all settings</small>
      </div>

      <div className="tabs">
        <div className="tab">User</div>
        <div className="tab">Branch</div>
        <div className="tab active">Profile</div>
        <div className="tab">Status</div>
        <div className="tab">Properties</div>
        <div className="tab">Activity Log</div>
      </div>

      <div className="section">
        <h2>Profile</h2>
        <small>Manage Profile</small>

        <div className="upload-photo">
          <span>📷</span>
          <button>Upload Photo</button>
        </div>

        <div className="form-grid">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Passport No" />
          <select>
            <option>Select Group</option>
          </select>
          <select>
            <option>Select Country</option>
          </select>
          <input type="text" placeholder="Phone Number" />
          <input type="email" placeholder="Email Address" />
        </div>

        <div className="form-grid">
          <input type="text" placeholder="Click to add more field" />
        </div>
      </div>

      <div className="section">
        <h2>Password</h2>
        <div className="form-grid">
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm Password" />
        </div>
      </div>

      <button className="save-btn"><FaSave /> Save Changes</button>
    </div>
  );
};

export default ProfilePage;
