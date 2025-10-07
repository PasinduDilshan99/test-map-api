"use client";

import React, { useState, useEffect, useRef } from "react";

const TourMap = () => {
  // LOCATION DATA - All available locations
  const locations = [
    {
      id: 1,
      name: "Colombo",
      category: "beaches",
      lat: 6.9271,
      lng: 79.8612,
      description: "Capital city",
    },
    {
      id: 2,
      name: "Negombo Beach",
      category: "beaches",
      lat: 7.2088,
      lng: 79.8358,
      description: "Beach close to airport",
    },
    {
      id: 3,
      name: "Sigiriya",
      category: "history",
      lat: 7.957,
      lng: 80.7603,
      description: "Ancient rock fortress",
    },
    {
      id: 4,
      name: "Kandy",
      category: "history",
      lat: 7.2936,
      lng: 80.6411,
      description: "Cultural capital",
    },
    {
      id: 5,
      name: "Nuwara Eliya",
      category: "adventure",
      lat: 6.9497,
      lng: 80.7891,
      description: "Tea country",
    },
    {
      id: 6,
      name: "Ella",
      category: "adventure",
      lat: 6.8667,
      lng: 81.0467,
      description: "Mountain paradise",
    },
    {
      id: 7,
      name: "Yala",
      category: "wildlife",
      lat: 6.3725,
      lng: 81.5185,
      description: "National park",
    },
    {
      id: 8,
      name: "Mirissa",
      category: "beaches",
      lat: 5.9469,
      lng: 80.4563,
      description: "Whale watching beach",
    },
    {
      id: 9,
      name: "Galle",
      category: "history",
      lat: 6.0269,
      lng: 80.2168,
      description: "Colonial fort city",
    },
    {
      id: 10,
      name: "Anuradhapura",
      category: "history",
      lat: 8.3114,
      lng: 80.4037,
      description: "Ancient capital",
    },
  ];

  // ACTIVITIES DATA - Activities available at each location
  const activities = [
    // Colombo Activities
    {
      id: 101,
      locationId: 1,
      name: "Visit Galle Face Green",
      duration: "2 hours",
      price: "Free",
    },
    {
      id: 102,
      locationId: 1,
      name: "National Museum Tour",
      duration: "3 hours",
      price: "$10",
    },
    {
      id: 103,
      locationId: 1,
      name: "Shopping at Pettah Market",
      duration: "2 hours",
      price: "Free",
    },
    {
      id: 104,
      locationId: 1,
      name: "Colombo City Food Tour",
      duration: "4 hours",
      price: "$50",
    },

    // Negombo Activities
    {
      id: 201,
      locationId: 2,
      name: "Beach Relaxation",
      duration: "3 hours",
      price: "Free",
    },
    {
      id: 202,
      locationId: 2,
      name: "Fishing Boat Tour",
      duration: "2 hours",
      price: "$25",
    },
    {
      id: 203,
      locationId: 2,
      name: "Visit Dutch Fort",
      duration: "1 hour",
      price: "$5",
    },

    // Sigiriya Activities
    {
      id: 301,
      locationId: 3,
      name: "Climb Sigiriya Rock",
      duration: "4 hours",
      price: "$30",
    },
    {
      id: 302,
      locationId: 3,
      name: "Visit Pidurangala Rock",
      duration: "3 hours",
      price: "$5",
    },
    {
      id: 303,
      locationId: 3,
      name: "Village Safari",
      duration: "3 hours",
      price: "$40",
    },

    // Kandy Activities
    {
      id: 401,
      locationId: 4,
      name: "Temple of the Tooth",
      duration: "2 hours",
      price: "$10",
    },
    {
      id: 402,
      locationId: 4,
      name: "Kandy Lake Walk",
      duration: "1 hour",
      price: "Free",
    },
    {
      id: 403,
      locationId: 4,
      name: "Cultural Dance Show",
      duration: "1.5 hours",
      price: "$15",
    },
    {
      id: 404,
      locationId: 4,
      name: "Royal Botanical Gardens",
      duration: "2 hours",
      price: "$8",
    },

    // Nuwara Eliya Activities
    {
      id: 501,
      locationId: 5,
      name: "Tea Factory Tour",
      duration: "2 hours",
      price: "$20",
    },
    {
      id: 502,
      locationId: 5,
      name: "Gregory Lake Boating",
      duration: "1 hour",
      price: "$10",
    },
    {
      id: 503,
      locationId: 5,
      name: "Horton Plains Trek",
      duration: "5 hours",
      price: "$35",
    },

    // Ella Activities
    {
      id: 601,
      locationId: 6,
      name: "Nine Arch Bridge Visit",
      duration: "2 hours",
      price: "Free",
    },
    {
      id: 602,
      locationId: 6,
      name: "Little Adams Peak Hike",
      duration: "2 hours",
      price: "Free",
    },
    {
      id: 603,
      locationId: 6,
      name: "Ella Rock Trek",
      duration: "4 hours",
      price: "$5",
    },
    {
      id: 604,
      locationId: 6,
      name: "Flying Ravana Zipline",
      duration: "1 hour",
      price: "$30",
    },

    // Yala Activities
    {
      id: 701,
      locationId: 7,
      name: "Safari - Morning",
      duration: "4 hours",
      price: "$50",
    },
    {
      id: 702,
      locationId: 7,
      name: "Safari - Evening",
      duration: "4 hours",
      price: "$50",
    },
    {
      id: 703,
      locationId: 7,
      name: "Full Day Safari",
      duration: "8 hours",
      price: "$90",
    },

    // Mirissa Activities
    {
      id: 801,
      locationId: 8,
      name: "Whale Watching",
      duration: "4 hours",
      price: "$45",
    },
    {
      id: 802,
      locationId: 8,
      name: "Beach Activities",
      duration: "3 hours",
      price: "Free",
    },
    {
      id: 803,
      locationId: 8,
      name: "Snorkeling Tour",
      duration: "2 hours",
      price: "$25",
    },

    // Galle Activities
    {
      id: 901,
      locationId: 9,
      name: "Fort Walk & Lighthouse",
      duration: "2 hours",
      price: "Free",
    },
    {
      id: 902,
      locationId: 9,
      name: "Maritime Museum",
      duration: "1 hour",
      price: "$5",
    },
    {
      id: 903,
      locationId: 9,
      name: "Dutch Reformed Church",
      duration: "1 hour",
      price: "$3",
    },

    // Anuradhapura Activities
    {
      id: 1001,
      locationId: 10,
      name: "Ancient City Tour",
      duration: "5 hours",
      price: "$25",
    },
    {
      id: 1002,
      locationId: 10,
      name: "Sacred Bodhi Tree Visit",
      duration: "1 hour",
      price: "Free",
    },
    {
      id: 1003,
      locationId: 10,
      name: "Cycling Temple Tour",
      duration: "4 hours",
      price: "$30",
    },
  ];

  // NEARBY LOCATIONS MAP - Defines which locations are nearby each location
  const nearbyLocationsMap = {
    1: [2, 9, 3, 4, 5], // Colombo -> Negombo, Galle
    2: [1, 3], // Negombo -> Colombo, Sigiriya
    3: [2, 4, 10], // Sigiriya -> Negombo, Kandy, Anuradhapura
    4: [3, 5], // Kandy -> Sigiriya, Nuwara Eliya
    5: [4, 6], // Nuwara Eliya -> Kandy, Ella
    6: [5, 7], // Ella -> Nuwara Eliya, Yala
    7: [6, 8], // Yala -> Ella, Mirissa
    8: [7, 9], // Mirissa -> Yala, Galle
    9: [8, 1], // Galle -> Mirissa, Colombo
    10: [3], // Anuradhapura -> Sigiriya
  };

  // STATE MANAGEMENT
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [availableLocations, setAvailableLocations] = useState(locations);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const currentLocation = selectedLocations[selectedLocations.length - 1];
  const currentLocationActivities = currentLocation
    ? activities.filter((a) => a.locationId === currentLocation.id)
    : [];

  // Update available locations based on last selected location
  useEffect(() => {
    if (selectedLocations.length === 0) {
      setAvailableLocations(locations);
    } else {
      const lastLocationId = selectedLocations[selectedLocations.length - 1].id;
      const nearbyIds = nearbyLocationsMap[lastLocationId] || [];
      const selectedIds = selectedLocations.map((loc) => loc.id);
      const nearby = locations.filter(
        (loc) => nearbyIds.includes(loc.id) && !selectedIds.includes(loc.id)
      );
      setAvailableLocations(nearby);
    }
  }, [selectedLocations]);

  const selectLocation = (location) => {
    setSelectedLocations([...selectedLocations, location]);
  };

  const removeLocation = (locationId) => {
    const index = selectedLocations.findIndex((loc) => loc.id === locationId);
    if (index === -1) return;

    const newSelectedLocations = selectedLocations.slice(0, index);
    setSelectedLocations(newSelectedLocations);

    const remainingLocationIds = newSelectedLocations.map((loc) => loc.id);
    const newActivities = selectedActivities.filter((act) =>
      remainingLocationIds.includes(
        activities.find((a) => a.id === act.id)?.locationId
      )
    );
    setSelectedActivities(newActivities);
  };

  const toggleActivity = (activity) => {
    const exists = selectedActivities.find((a) => a.id === activity.id);
    if (exists) {
      setSelectedActivities(
        selectedActivities.filter((a) => a.id !== activity.id)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const isActivitySelected = (activityId) => {
    return selectedActivities.some((a) => a.id === activityId);
  };

  // Load Leaflet CSS and JS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => {
      setTimeout(initMap, 100);
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.L) return;

    const newMap = window.L.map(mapRef.current).setView([7.8731, 80.7718], 8);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(newMap);

    setMap(newMap);
    mapInstanceRef.current = newMap;
  };

  // Update markers when available locations change
  useEffect(() => {
    if (!map) return;

    markers.forEach((marker) => {
      map.removeLayer(marker);
    });

    const createCustomIcon = (isSelected) => {
      return window.L.divIcon({
        html: `
          <div style="
            background-color: ${isSelected ? "#ef4444" : "#3b82f6"};
            width: ${isSelected ? "30px" : "24px"};
            height: ${isSelected ? "30px" : "24px"};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          "></div>
        `,
        className: "custom-marker",
        iconSize: [isSelected ? 30 : 24, isSelected ? 30 : 24],
        iconAnchor: [isSelected ? 15 : 12, isSelected ? 15 : 12],
      });
    };

    const selectedMarkers = selectedLocations.map((place, index) => {
      const marker = window.L.marker([place.lat, place.lng], {
        icon: createCustomIcon(true),
      }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 8px; max-width: 200px;">
          <div style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; margin-bottom: 6px;">
            Stop ${index + 1}
          </div>
          <h3 style="margin: 0 0 6px 0; font-weight: bold; color: #ef4444;">
            ${place.name}
          </h3>
          <p style="margin: 0; font-size: 13px; color: #666;">
            ${place.description}
          </p>
        </div>
      `);

      return marker;
    });

    if (selectedLocations.length > 1) {
      const routeCoordinates = selectedLocations.map((loc) => [
        loc.lat,
        loc.lng,
      ]);
      const polyline = window.L.polyline(routeCoordinates, {
        color: "#ef4444",
        weight: 3,
        opacity: 0.7,
        dashArray: "10, 10",
      }).addTo(map);
      selectedMarkers.push(polyline);
    }

    const availableMarkers = availableLocations.map((place) => {
      const marker = window.L.marker([place.lat, place.lng], {
        icon: createCustomIcon(false),
      }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="margin: 0 0 6px 0; font-weight: bold; color: #3b82f6;">
            ${place.name}
          </h3>
          <p style="margin: 0; font-size: 13px; color: #666;">
            ${place.description}
          </p>
          <button 
            onclick="window.selectLocationFromMap(${place.id})"
            style="
              margin-top: 8px;
              background: #3b82f6;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 4px;
              cursor: pointer;
              width: 100%;
            "
          >
            Select Location
          </button>
        </div>
      `);

      marker.on("mouseover", function () {
        this.openPopup();
      });

      return marker;
    });

    const allMarkers = [...selectedMarkers, ...availableMarkers];
    setMarkers(allMarkers);

    if (allMarkers.length > 0) {
      const locationMarkers = allMarkers.filter(
        (m) => m instanceof window.L.Marker
      );
      if (locationMarkers.length > 0) {
        const group = new window.L.featureGroup(locationMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [map, availableLocations, selectedLocations]);

  // Expose select function to window for popup button
  useEffect(() => {
    window.selectLocationFromMap = (locationId) => {
      const location = locations.find((loc) => loc.id === locationId);
      if (location) {
        selectLocation(location);
      }
    };
    return () => {
      delete window.selectLocationFromMap;
    };
  }, [selectedLocations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Build Your Sri Lanka Tour
          </h1>
          <p className="text-gray-600">
            Select locations and activities to create your perfect itinerary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedLocations.length === 0
                    ? "Step 1: Choose Your Starting Location"
                    : `Step ${
                        selectedLocations.length + 1
                      }: Choose Next Location`}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedLocations.length === 0
                    ? "Click on any blue marker to begin your journey"
                    : availableLocations.length > 0
                    ? "Select from nearby locations (blue markers)"
                    : "No more nearby locations available"}
                </p>
              </div>

              <div
                ref={mapRef}
                className="w-full h-[500px] rounded-lg overflow-hidden"
                style={{ minHeight: "500px" }}
              />

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                  <span className="text-sm text-gray-600">
                    Available Locations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-red-500 rounded-full border-2 border-white"></div>
                  <span className="text-sm text-gray-600">Selected Route</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Tour Summary */}
          <div className="space-y-6">
            {/* Current Location Activities */}
            {currentLocation && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Activities in {currentLocation.name}
                </h2>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {currentLocationActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        isActivitySelected(activity.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => toggleActivity(activity)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {activity.name}
                          </h3>
                          <div className="flex gap-3 mt-1">
                            <span className="text-xs text-gray-500">
                              ⏱️ {activity.duration}
                            </span>
                            <span className="text-xs text-gray-500">
                              💰 {activity.price}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isActivitySelected(activity.id)
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {isActivitySelected(activity.id) && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Location Selected Message */}
            {!currentLocation && selectedLocations.length === 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🗺️</div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Start Planning Your Tour
                </h3>
                <p className="text-sm text-gray-600">
                  Select your first location from the map to see available
                  activities
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Tour Summary */}
        {selectedLocations.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Tour Itinerary
            </h2>

            <div className="space-y-4">
              {selectedLocations.map((location, index) => {
                const locationActivities = selectedActivities.filter(
                  (act) =>
                    activities.find((a) => a.id === act.id)?.locationId ===
                    location.id
                );

                return (
                  <div
                    key={location.id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded">
                            Day {index + 1}
                          </span>
                          <h3 className="text-lg font-bold text-gray-800">
                            {location.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {location.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeLocation(location.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    </div>

                    {locationActivities.length > 0 ? (
                      <div className="mt-3 ml-4 space-y-2">
                        <p className="text-sm font-semibold text-gray-700">
                          Selected Activities:
                        </p>
                        {locationActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <span className="text-green-500">✓</span>
                            <span>{activity.name}</span>
                            <span className="text-gray-400">
                              ({activity.duration}, {activity.price})
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic mt-2 ml-4">
                        No activities selected yet
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tour Statistics */}
            <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedLocations.length}
                </div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedActivities.length}
                </div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedLocations.length}
                </div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourMap;
