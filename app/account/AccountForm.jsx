"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { updateProfile } from "@/lib/dal/user";
import { toast } from "sonner";

const AccountForm = ({ profile, session }) => {
  const [full_name, setFull_name] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar_url, setAvatar_Url] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFull_name(profile.full_name);
      setUsername(profile.username);
      setWebsite(profile.website);
      setAvatar_Url(profile.avatar_url);
    }

    return () => {
      setFull_name("");
      setUsername("");
      setWebsite("");
      setAvatar_Url("");
    };
  }, [profile]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    const response = await updateProfile(profile.id, {
      full_name,
      username,
      website,
    });
    if (response.error) {
      toast.error("Error updating profile:", response.error);
    }

    if (response.ok) {
      toast.success("Profile updated");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="mt-20 w-96 p-4 mx-auto grid gap-4 border border-border shadow-lg rounded">
        <Avatar user_id={profile.id} url={avatar_url} size={150} />

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={session.user.email || ""}
            disabled
            // onChange={(e) => setFull_name(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={full_name || ""}
            onChange={(e) => setFull_name(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* <Button onClick={() => setUsername(generateName())}>
          Generate Name
        </Button>
        <Button onClick={() => setUserColour(getUserColor(username))}>
          Colour
          {userColour && (
            <span
              className="w-4 h-4 rounded-full inline-block ml-2"
              style={{ backgroundColor: `rgb(${userColour.rgb})` }}></span>
          )}
        </Button> */}
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            className="button"
            onClick={() => handleUpdateProfile()}
            disabled={isLoading}>
            {/* {isLoading ? "Loading ..." : "Update"} */}
            Update
          </Button>
        </div>
      </div>
    </>
  );
};
// };

export default AccountForm;
