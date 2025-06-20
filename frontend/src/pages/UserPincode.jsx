import React, { useEffect, useState } from "react";

const UserPincode = () => {
  const [pincode, setPincode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const code =
            data?.address?.postcode ||
            data?.address?.["ISO3166-2-lvl4"] ||
            "Not Found";

          setPincode(code);
        } catch (err) {
          console.error("Error fetching location details:", err);
          setError("Failed to fetch pincode");
        }
      },
      geoError => {
        console.error("Geolocation error:", geoError);
        setError("Permission denied or error getting location");
      }
    );
  }, []);

  return (
    <div className="p-4 border rounded bg-white max-w-sm mx-auto mt-10 shadow">
      <h2 className="text-lg font-semibold mb-2">Your Pincode</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!error && !pincode && <p>Detecting...</p>}
      {pincode && <p className="text-green-700 text-xl">{pincode}</p>}
    </div>
  );
};

export default UserPincode;
