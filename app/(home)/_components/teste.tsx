import { useEffect, useState } from "react";
import { createClient } from "@/supabase/server";

const supabase = createClient<Database>();

const UserProfile = () => {
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserMetadata = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          throw new Error(error.message);
        }

        if (user) {
          setUserMetadata(user.user_metadata);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserMetadata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {userMetadata ? (
        <div>
          <p>Username: {userMetadata.username}</p>
          <p>Avatar URL: {userMetadata.avatar}</p>
          {/* Exiba outros metadados conforme necessário */}
        </div>
      ) : (
        <p>No user metadata found.</p>
      )}
    </div>
  );
};

export default UserProfile;
