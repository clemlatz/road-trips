# Road Trips

This repository contains the source code and content of our [travel blog](https://roadtrips.iwazaru.fr/).

All the source code is available under the
[MIT License](https://opensource.org/licenses/MIT).

The blog content is available under the 
[Creative Commons BY-NC-ND 4.0 License](https://creativecommons.org/licenses/by-nc-nd/4.0/), 
including:
- texts in the `src/components/trips.json` files
- photos in the `dist/images/` folder  

## Build for production

```console
yarn
yarn build
```

## Run in development mode

```console
yarn
yarn start
```

## Create your own travel blog using road-trips

**Road Trips** has not been built with reusability in mind, as it contain both
the source code and the data (text and photos) of my travel blog. You can still
use it to build your own travel blog. Here's a few suggestions on how to get 
you started.

### Fork and clone

1. Fork this repository and clone your fork
2. Install dependencies using `yarn`
3. [Get a Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) 
   and replace mine in `src/components/Map/Map.js`

Now you should be able to run *my* travel blog locally using `yarn start`.

Optionnaly, you can 
[configure an upstream remote](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork)
pointing to this respository in order to
[keep your fork in sync](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) 
with the original source code.

### Add your trips

Trips can be added to the `src/trips/trips.json` file. It contains an array of
objects, each of those object representing a trip.

```jsonc
[
  {
    // Trip 1
  },
  {
    // Trip 2
  }
]
```

#### Trip object specs:

```jsonc
{
  // Trip id, used as trip's url. Must be unique.
  "id": "scotland",

  // Trip title and subtitle used in blog's header
  "title": "Scotland Road-Trip",
  "subtitle": "Mathilde & Clément's adventures in Scotland",

  // How the link to this trip appears on the global map
  "linkTitle": "Scotland, july 2018",

  // Coordinates on which the map is centered when opening this trip
  "mapCenter": {
    "lat": 56.98220,
    "lng": -4.89193
  },

  // Zoom level used when opening this trip
  "mapZoomLevels": {
    "desktop": 7,
    "mobile": 7
  },

  // An array of blog entries for this trip (see specs below)
  "entries": [
    {
      // Entry 1
    },
    {
      // Entry 2
    }
  ]
}
```

#### Entry object specs

```jsonc
{
  // Entry id. Used in entry's url and link (as a pin on the map)
  // Must be unique in the trip
  "id": "1",

  // Blog entry title, displayed in header and browser page title
  "title": "Surprise hiking at Holyrood Park",

  // Entry date, as a string
  "date": "July, 13",

  // Coordinates of where the entry's pin should appear on the map
  "coords": [
    "55.94529675574091",
    "-3.1670421592712046"
  ],

  // Blog entry content (as a single parapgraph)
  "content": "Nos valises à peine posées au Salisbury Green Hotel, nous décidons de terminer cettte première journée par une petite promenade de le parc voisin de Holyrood. Naïf que nous sommes : dans les parcs de la capitale — en tout cas à Holyrood Park —, il y a des montagnes et on peut randonner pendant des heures. Bien entendu, nous avions laissé les chaussures et l'équipement de randonnée dans les valises. Malgré cela, une belle balade, avec à la clé une vue panoramique sur Edimbourg, l'occasion idéale de faire connaissance avec la capitaine écossaise.",
  
  // Blog entry photos, as an array of object (see specs below)
  "photos": [
    {
      // Photo 1
    },
    {
      // Photo 2
    }
  ]
},
```

#### Photo object specs

Each high-res photo must be added in the `dist/images/` directory with a path 
matching the following pattern:
`dist/images/{trip.id}/photos/{photo.id}.jpg`

Each photo must have a thumbnail counterpart. Thumbs can be generated if sips
is installed locally with `yarn photos`. Otherwise, they should be added to the
`dist/images/` directory with a patch matching the following pattern :
`dist/images/{trip.id}/thumbs/{photo.id}.jpg`

```jsonc
{
  // Photo id. Must match image file name and be unique in trip.
  "id": "1-2",

  // Photo caption, displayed under the thumbnail in blog entry
  // Must be present but can be empty for photo without caption
  "caption": "Notre hôtel, le Salisbury Green, en bordure de Holyrood Park."
},
```