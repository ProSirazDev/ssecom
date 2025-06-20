const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by your browser."));
    }
  });
};


const reverseGeocode = async (latitude, longitude) => {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // replace with real key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      throw new Error("No address found.");
    }
  } catch (error) {
    throw new Error("Failed to reverse geocode.");
  }
};
export const handleDetectAddress = async () => {
  try {
    const { latitude, longitude } = await getUserCoordinates();
    const detectedAddress = await reverseGeocode(latitude, longitude);

    toast.success("Address detected!");

    // Optionally, push it to state or backend:
    setAddresses(prev => [
      {
        id: "auto-detected", // Temporary ID
        full_name: user?.name || "You",
        address_line1: detectedAddress,
        address_line2: "",
        landmark: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        mobile_optional: user?.phone || "",
        is_default: false,
      },
      ...prev,
    ]);

    setSelectedAddressId("auto-detected");
  } catch (err) {
    console.error(err);
    toast.error("Failed to detect address. Please allow location access.");
  }
};
