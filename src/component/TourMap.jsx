'use client';

import React, { useState, useEffect, useRef } from 'react';

// open street map

// Simple icon components
const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PalmtreeIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L8 8h3v12h2V8h3l-4-6z"/>
    <path d="M7 7c-1 1-2 3-2 5h3c0-1 .5-2 1-3l-2-2z"/>
    <path d="M17 7l-2 2c.5 1 1 2 1 3h3c0-2-1-4-2-5z"/>
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3L2 9v12h20V9l-10-6zM8 19H6v-2h2v2zm0-4H6v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
  </svg>
);

const MountainIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2L9 12.5l-3 4L2 12l5-6.7L10 10l4-4z"/>
    <path d="M14 6l8 10h-6l-2-2.67z"/>
  </svg>
);

const CameraIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
  </svg>
);

const UtensilsIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
  </svg>
);

const AllPlacesIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const TourMap = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  
  // Sample database structure - Admin can add/modify these
  const places = [
    // Popular Beaches
    { id: 1, name: 'Mirissa Beach', category: 'beaches', lat: 5.9469, lng: 80.4563, description: 'Beautiful beach for whale watching' },
    { id: 2, name: 'Unawatuna', category: 'beaches', lat: 6.0104, lng: 80.2508, description: 'Perfect for snorkeling' },
    { id: 3, name: 'Arugam Bay', category: 'beaches', lat: 6.8411, lng: 81.8364, description: 'Surfer\'s paradise' },
    { id: 4, name: 'Negombo Beach', category: 'beaches', lat: 7.2088, lng: 79.8358, description: 'Close to airport' },
    
    // Historical Sites
    { id: 5, name: 'Sigiriya', category: 'history', lat: 7.9570, lng: 80.7603, description: 'Ancient rock fortress' },
    { id: 6, name: 'Temple of Tooth', category: 'history', lat: 7.2936, lng: 80.6411, description: 'Sacred Buddhist temple' },
    { id: 7, name: 'Anuradhapura', category: 'history', lat: 8.3114, lng: 80.4037, description: 'Ancient capital city' },
    { id: 8, name: 'Polonnaruwa', category: 'history', lat: 7.9403, lng: 81.0188, description: 'Medieval capital' },
    { id: 9, name: 'Galle Fort', category: 'history', lat: 6.0269, lng: 80.2168, description: 'Colonial fort' },
    
    // Wildlife & Nature
    { id: 10, name: 'Yala National Park', category: 'wildlife', lat: 6.3725, lng: 81.5185, description: 'Leopard spotting' },
    { id: 11, name: 'Udawalawe', category: 'wildlife', lat: 6.4373, lng: 80.8897, description: 'Elephant sanctuary' },
    { id: 12, name: 'Sinharaja Forest', category: 'wildlife', lat: 6.4005, lng: 80.4005, description: 'UNESCO rainforest' },
    { id: 13, name: 'Horton Plains', category: 'wildlife', lat: 6.8097, lng: 80.8060, description: 'World\'s End viewpoint' },
    
    // Hill Country
    { id: 14, name: 'Nuwara Eliya', category: 'adventure', lat: 6.9497, lng: 80.7891, description: 'Tea plantations' },
    { id: 15, name: 'Ella', category: 'adventure', lat: 6.8667, lng: 81.0467, description: 'Nine Arch Bridge' },
    { id: 16, name: 'Adams Peak', category: 'adventure', lat: 6.8095, lng: 80.4989, description: 'Sacred mountain' },
    
    // Food & Culture
    { id: 17, name: 'Colombo', category: 'gastronomy', lat: 6.9271, lng: 79.8612, description: 'Capital city food scene' },
    { id: 18, name: 'Jaffna', category: 'gastronomy', lat: 9.6615, lng: 80.0255, description: 'Northern cuisine' },
    { id: 19, name: 'Kandy', category: 'gastronomy', lat: 7.2906, lng: 80.6337, description: 'Central highland flavors' },
  ];

  const categories = [
    { id: 'all', name: 'All Places', Icon: AllPlacesIcon, color: '#3b82f6' },
    { id: 'beaches', name: 'Popular Beaches', Icon: PalmtreeIcon, color: '#06b6d4' },
    { id: 'history', name: 'History & Culture', Icon: BuildingIcon, color: '#8b5cf6' },
    { id: 'wildlife', name: 'Wildlife & Nature', Icon: MountainIcon, color: '#10b981' },
    { id: 'adventure', name: 'Adventure', Icon: CameraIcon, color: '#f59e0b' },
    { id: 'gastronomy', name: 'Gastronomy', Icon: UtensilsIcon, color: '#ef4444' },
  ];

  const filteredPlaces = selectedCategory === 'all' 
    ? places 
    : places.filter(p => p.category === selectedCategory);

  const currentCategory = categories.find(c => c.id === selectedCategory);

  // Load Google Maps Script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzZmJfdw2iWpooECmJYFgdg-nhMTwqgIc`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 7.8731, lng: 80.7718 }, // Center of Sri Lanka
      zoom: 8,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#a2daf2" }]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#e5f5e0" }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    setMap(newMap);
    infoWindowRef.current = new window.google.maps.InfoWindow();
  };

  // Update markers when category changes
  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers
    const newMarkers = filteredPlaces.map(place => {
      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: map,
        title: place.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: currentCategory.color,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 10,
        },
        animation: window.google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        const content = `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: ${currentCategory.color};">
              ${place.name}
            </h3>
            <p style="margin: 0; font-size: 14px; color: #666;">
              ${place.description}
            </p>
          </div>
        `;
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open(map, marker);
      });

      marker.addListener('mouseover', () => {
        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: currentCategory.color,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 14,
        });
      });

      marker.addListener('mouseout', () => {
        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: currentCategory.color,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 10,
        });
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Adjust map bounds to fit all markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
      
      // Don't zoom in too much for single marker
      const listener = window.google.maps.event.addListener(map, "idle", function() {
        if (map.getZoom() > 10) map.setZoom(10);
        window.google.maps.event.removeListener(listener);
      });
    }

  }, [map, selectedCategory, filteredPlaces.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Discover Sri Lanka</h1>
          <p className="text-gray-600 text-lg">Explore the pearl of the Indian Ocean</p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((cat) => {
            const IconComponent = cat.Icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-white shadow-lg scale-105 ring-2'
                    : 'bg-white/70 hover:bg-white hover:shadow-md'
                }`}
                style={{
                  ringColor: selectedCategory === cat.id ? cat.color : 'transparent'
                }}
              >
                <div className="flex justify-center mb-2" style={{ color: cat.color }}>
                  <IconComponent />
                </div>
                <p className="text-sm font-medium text-gray-700">{cat.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {cat.id === 'all' ? places.length : places.filter(p => p.category === cat.id).length} places
                </p>
              </button>
            );
          })}
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div 
            ref={mapRef}
            className="w-full h-[600px] rounded-xl overflow-hidden"
            style={{ minHeight: '600px' }}
          />

          {/* Legend */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: currentCategory.color }}
              ></div>
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold">{filteredPlaces.length}</span> {currentCategory.name}
              </p>
            </div>
            <p className="text-xs text-gray-500">Click markers for details</p>
          </div>
        </div>

        {/* Admin Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">🔑 Setup Instructions</h3>
          <p className="text-sm text-blue-800 mb-3">
            To use this component, you need a Google Maps API key:
          </p>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>Go to <a href="https://console.cloud.google.com/" target="_blank" className="underline font-semibold">Google Cloud Console</a></li>
            <li>Create a project and enable "Maps JavaScript API"</li>
            <li>Get your API key from Credentials section</li>
            <li>Replace <code className="bg-white px-2 py-1 rounded">YOUR_API_KEY_HERE</code> in the code with your actual API key</li>
          </ol>
          
          <h3 className="font-bold text-blue-900 mb-2 mt-4">📍 Admin Panel - Database Structure</h3>
          <div className="bg-white rounded p-3 font-mono text-xs overflow-x-auto">
            <pre>{`{
  "name": "Place Name",
  "category": "beaches|history|wildlife|adventure|gastronomy",
  "latitude": 7.8731,
  "longitude": 80.7718,
  "description": "Short description"
}`}</pre>
          </div>
          <p className="text-sm text-blue-800 mt-3">
            💡 Get coordinates: Right-click any location on Google Maps → Click the coordinates to copy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourMap;