import { useState } from "react";
import { FiUser, FiEdit2, FiLock, FiX, FiCheck } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  updateUserProfile,
  changePassword,
  fetchUserProfile,
} from "../../store/features/user";
import InputField from "../ui/InputFiled";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";

export default function ProfileTab() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.user);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      setIsEditingProfile(false);
      await dispatch(fetchUserProfile());
    } catch (error: any) {
      showToast({
        type: "error",
        message: error.message || "Failed to update profile",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(changePassword(passwordData)).unwrap();
      showToast({ type: "success", message: " Password chaged successfully" });
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error: any) {
      showToast({
        type: "error",
        message: error || " Failed to change password",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiUser className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          {!isEditingProfile && (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <FiEdit2 size={16} />{" "}
              <span className="text-sm font-medium">Edit</span>
            </button>
          )}
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <InputField
              label="Username"
              value={profileData.userName}
              onChange={(e) =>
                setProfileData({ ...profileData, userName: e.target.value })
              }
              variant="light"
              disabled={loading}
            />
            <InputField
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              variant="light"
              disabled={loading}
            />
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                text="Cancel"
                variant="secondary"
                onClick={() => setIsEditingProfile(false)}
                headIcon={<FiX size={16} />}
                className="flex-1"
              />
              <Button
                type="submit"
                text={loading ? "Saving..." : "Save Changes"}
                headIcon={<FiCheck size={16} />}
                className="flex-1"
              />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="text-sm text-gray-600">Username</label>
              <p className="font-medium">{user?.userName}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiLock className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold">Change Password</h2>
        </div>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <InputField
            label="Current Password"
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, oldPassword: e.target.value })
            }
            variant="light"
          />
          <InputField
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            variant="light"
          />
          <Button
            type="submit"
            text="Change Password"
            disabled={loading || !passwordData.newPassword}
          />
        </form>
      </div>
    </div>
  );
}
