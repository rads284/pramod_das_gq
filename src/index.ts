/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

// This example creates a 2-pixel-wide red polyline showing the path of
// the first trans-Pacific flight between Oakland, CA, and Brisbane,
// Australia which was made by Charles Kingsford Smith.



function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 5.3,
      // 20.5937° N, 78.9629° E
      center: { lat: 20, lng: 78 },
      mapTypeId: "terrain",
    }
  );

  // const flightPlanCoordinates = [
  //   { lat: 37.772, lng: -122.214 },
  //   { lat: 21.291, lng: -157.821 },
  //   { lat: -18.142, lng: 178.431 },
  //   { lat: -27.467, lng: 153.027 },
  // ];
  const flightPlanCoordinates = [{'lat': 22.54127, 'lng': 88.34211}, {'lat': 22.6528, 'lng': 88.438}, {'lat': 22.65781, 'lng': 88.30637}, {'lat': 23.19067, 'lng': 88.02115}, {'lat': 23.76925, 'lng': 86.85579}, {'lat': 23.92511, 'lng': 86.1246}, {'lat': 25.22515, 'lng': 83.48341}, {'lat': 25.45238, 'lng': 81.7194}, {'lat': 25.97745, 'lng': 80.76259}, {'lat': 26.52288, 'lng': 80.35583}, {'lat': 26.40111, 'lng': 80.37259}, {'lat': 26.36285, 'lng': 79.66647}, {'lat': 27.07102, 'lng': 78.69112}, {'lat': 27.2404, 'lng': 77.83355}, {'lat': 27.92229, 'lng': 77.35665}, {'lat': 28.50612, 'lng': 77.30046}, {'lat': 28.63739, 'lng': 77.12957}, {'lat': 27.86647, 'lng': 76.26916}, {'lat': 26.88835, 'lng': 75.73626}, {'lat': 26.50654, 'lng': 74.83477}, {'lat': 25.98185, 'lng': 74.63499}, {'lat': 24.83818, 'lng': 74.57852}, {'lat': 24.61055, 'lng': 74.28703}, {'lat': 24.57701, 'lng': 73.69952}, {'lat': 24.11028, 'lng': 73.69809}, {'lat': 23.77872, 'lng': 73.51693}, {'lat': 23.58006, 'lng': 72.95845}, {'lat': 23.09733, 'lng': 72.66658}, {'lat': 22.73122, 'lng': 72.66513}, {'lat': 22.32318, 'lng': 73.2555}, {'lat': 21.38208, 'lng': 72.9577}, {'lat': 20.80449, 'lng': 73.0715}, {'lat': 20.26058, 'lng': 72.88447}, {'lat': 19.42986, 'lng': 72.87227}, {'lat': 18.76238, 'lng': 73.35156}, {'lat': 18.66622, 'lng': 73.73308}, {'lat': 18.02128, 'lng': 74.02772}, {'lat': 17.83696, 'lng': 73.95522}, {'lat': 15.85605, 'lng': 74.5331}, {'lat': 15.34434, 'lng': 75.13669}, {'lat': 15.01937, 'lng': 75.18426}, {'lat': 14.48812, 'lng': 75.7842}, {'lat': 14.23329, 'lng': 76.41116}, {'lat': 12.80365, 'lng': 77.70156}, {'lat': 12.53642, 'lng': 78.40099}, {'lat': 12.89159, 'lng': 78.8903}, {'lat': 12.87521, 'lng': 79.76507}, {'lat': 13.03603, 'lng': 80.23043}, {'lat': 14.16902, 'lng': 79.85847}, {'lat': 14.46792, 'lng': 80.01324}, {'lat': 15.72979, 'lng': 80.00896}, {'lat': 16.16724, 'lng': 80.22082}, {'lat': 17.04952, 'lng': 81.53959}, {'lat': 16.98991, 'lng': 81.7756}, {'lat': 17.74057, 'lng': 83.3271}, {'lat': 19.27734, 'lng': 84.78258}, {'lat': 19.38888, 'lng': 85.06296}, {'lat': 19.75752, 'lng': 85.19049}, {'lat': 20.31534, 'lng': 85.87813}, {'lat': 20.91289, 'lng': 86.2272}, {'lat': 21.79609, 'lng': 87.24128}, {'lat': 22.38276, 'lng': 87.36844}, {'lat': 22.47835, 'lng': 88.0989}, {'lat': 22.65919, 'lng': 88.30706}, {'lat': 22.57786, 'lng': 88.47136}];
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);
  setMarkers(map);
}
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
const beaches: [string, number, number, number][] = [
  ["Victoria - Kolkata", 22.548, 88.342, 4],
  ["Delhi", 28.63739, 77.12957, 5],
  ["Mumbai", 19.42, 72.78258, 3],
  ["Chennai", 13.080128657071, 80.28747820854187, 2],
  ["Biswa Bangla Gate - Kolkata", 22.5789, 88.443866, 1],
];

function setMarkers(map: google.maps.Map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };

  for (let i = 0; i < beaches.length; i++) {
    const beach = beaches[i];

    new google.maps.Marker({
      position: { lat: beach[1], lng: beach[2] },
      map,
      icon: image,
      shape: shape,
      title: beach[0],
      zIndex: beach[3],
    });
  }
}
export { initMap };
