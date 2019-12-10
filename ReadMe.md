<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   -   [Awake][1]
-   [Introduction][2]
    -   [User stories][3]
    -   [Design][4]
        -   [Wireframe of views:][5]
        -   [Color schema][6]
-   [Usage][7]
    -   [Installation for android][8]
    -   [Installation for web][9]
    -   [Tests][10]
    -   [Generate documentation:][11]
    -   [assignTargetLocation][12]
        -   [Parameters][13]
    -   [retrieveCurrentLocation][14]
        -   [Parameters][15]
    -   [createJourney][16]
        -   [Parameters][17]
    -   [createLocationListener][18]
        -   [Parameters][19]
    -   [sendNotification][20]
        -   [Parameters][21]
    -   [journeyRemoval][22]
        -   [Parameters][23]
    -   [getFavorites][24]
        -   [Parameters][25]
    -   [setFavorites][26]
        -   [Parameters][27]
    -   [addToFavorites][28]
        -   [Parameters][29]
    -   [removeFavorite][30]
        -   [Parameters][31]
    -   [Coordinate][32]
        -   [Parameters][33]
        -   [setCoordinates][34]
            -   [Parameters][35]
        -   [calculateDistance][36]
            -   [Parameters][37]
        -   [toRadians][38]
            -   [Parameters][39]
        -   [toMarker][40]
        -   [fromJSON][41]
            -   [Parameters][42]
    -   [Journey][43]
        -   [Parameters][44]
        -   [setCurrentLocation][45]
            -   [Parameters][46]
        -   [setThreshold][47]
            -   [Parameters][48]
        -   [setTargetLocation][49]
            -   [Parameters][50]
        -   [getProgress][51]
    -   [Notification][52]
        -   [Parameters][53]
        -   [getRandomTitle][54]
        -   [generateScheduleObj][55]
            -   [Parameters][56]
        -   [getNotificationTypes][57]

## Awake

# Introduction

This is my cool introduction

## User stories

It wakes people up so they don't wake up in Flen.

## Design

Material design via vuetify

### Wireframe of views:

![wireframe][58]

### Color schema

Not all are being used but all selected are shown below.

In order top left to bottom right:

-   Primary
-   Secondary
-   Background
-   Accent
-   Info
-   Warning
-   Success
-   Error

![primary][59] ![secondary][60] ![Background][61]

 ![Accent][62] ![info][63]  ![Warning][64]

![Success][65]  ![Error][66]

# Usage

## Installation for android

```bash
npm install # Install dependencies
npm run and # Run vue build and copy it to capacitor
npm run capacitor-open # Open the capacitor project in Android studio
```

## Installation for web

```bash
npm install # Install dependencies
npm run serve # Run development server
```

## Tests

Only have unit tests in this project because the native modules was pretty much impossible to do integration testing on.

```bash
npm run test:unit
```

## Generate documentation:

```bash
npm run docs:md # for Readme.md
npm run docs:html # for docs/index.html
npm run docs:full # for both of the above.
```

## assignTargetLocation

Saves the target location to the store and if there is a
journey active it will be updated as well.

### Parameters

-   `context` **[Object][67]** 
    -   `context.commit`  
    -   `context.state`  
-   `coordinate` **[Coordinate][68]** The target location

## retrieveCurrentLocation

Retrieves the initial position when the application is started
and assigns the `currentLocation` prop.

### Parameters

-   `context` **[Object][67]** 
    -   `context.commit`  

## createJourney

Creates instance of `Journey` and saves it to the store if there
is no active journey. If there is a `currentJourney` assigned it is updated.
The `threshold` variable is converted back to meters and subtracted
from the `max` value to get the distance to notify at.

### Parameters

-   `context` **[Object][67]** The store
    -   `context.commit`  
    -   `context.dispatch`  
    -   `context.state`  
-   `journey` **[Object][67]** The Journey settings deconstructed
    -   `journey.currentLocation` **[Coordinate][68]** 
    -   `journey.targetLocation` **[Coordinate][68]** 
    -   `journey.threshold` **[number][69]** 
    -   `journey.max` **[number][69]** 

Returns **[Journey][70]** the Journey instance.

## createLocationListener

Creates a location listener that checks the position every ~5 seconds.

It then updates the state props `currentLocation`, `currentJourney` and `progress`

### Parameters

-   `context` **[Object][67]** 
    -   `context.commit`  
    -   `context.state`  
    -   `context.dispatch`  

Returns **void** 

## sendNotification

Creates and schedules a notification

### Parameters

-   `context` **[Object][67]** 
    -   `context.state`  
    -   `context.commit`  

Returns **void** 

## journeyRemoval

Resets the state when the journey is complete or cancelled.

### Parameters

-   `context` **[Object][67]** 
    -   `context.state`  
    -   `context.commit`  

Returns **void** 

## getFavorites

Fetches the favorites from the native storage and saves them to state.

### Parameters

-   `context` **[Object][67]** 
    -   `context.commit`  

Returns **void** 

## setFavorites

Saves the favorites to native storage and to state.

### Parameters

-   `context` **[Object][67]** 
    -   `context.commit`  
-   `favorites` **[Array][71]&lt;[Object][67]>** The favorites to save to Storage.

Returns **void** 

## addToFavorites

Adds a new favorite to the list and dispatches a `setFavorites` action.

### Parameters

-   `context` **[Object][67]** 
    -   `context.dispatch`  
    -   `context.state`  
-   `newFavorite` **[Object][67]** Favorite to add.

Returns **void** 

## removeFavorite

Removes a single favorite from the list of favorites and dispatches the `setFavorites` action.

### Parameters

-   `context` **[Object][67]** 
    -   `context.dispatch`  
    -   `context.state`  
-   `favoriteToRemove` **[Object][67]** 

Returns **void** 

## Coordinate

Class for coordinate points with some helper methods to do some calculations such as distance.

### Parameters

-   `locationResponse` **[Object][67]** The response from the native GPS. If coordinates originates from different source they need to be converted to fit the input

### setCoordinates

Sets the instance's location properties. Used both for creating a new instance and updating data on an existing instance

#### Parameters

-   `location` **[Object][67]** 
    -   `location.coords` **[Object][67]** The coordinate object , mainly with the `latitude` and `longitude` props.

Returns **[Coordinate][68]** this

### calculateDistance

Calculates the distance between two coordinate points.
Calculation and code found at [this link][72]

#### Parameters

-   `coordinate1` **[Coordinate][68]** The target coordinates
-   `coordinate2` **[Coordinate][68]** The current coordinates, defaults to this. (optional, default `this`)

Returns **[number][69]** Distance in meters?

### toRadians

Helper method to convert degrees to radians, which is a different kind of degrees.
formula found at [this link][73]

#### Parameters

-   `degrees` **[number][69]** Degrees that should be converted to radians

Returns **[number][69]** degrees converted to radians

### toMarker

Helper method to create object to add markers to the Google map component

Returns **[Object][67]** In the correct form for Google maps

### fromJSON

When storing Coordinates they will be converted to JSON.
This method helps to build new Coordinate instances like:

```javascript
const jsonObject = { latitude: 58, longitude: 12, timestamp: 1234567 }
const coordinate = new Coordinate(Coordinate.fromJSON(jsonObject))
```

#### Parameters

-   `coordinate` **[Object][67]** A Coordinate instance that has been serialized to JSON.
    -   `coordinate.timestamp`  
    -   `coordinate.coords` **...any** 

Returns **[Coordinate][68]** 

## Journey

The class that contains all the information for a particular trip

### Parameters

-   `$0` **[Object][67]**  (optional, default `{}`)
    -   `$0.startLocation`  
    -   `$0.targetLocation`  
    -   `$0.threshold`  
-   `params` **[Object][67]** 

### setCurrentLocation

Updates the current location and also updates the distance to the destination.

#### Parameters

-   `currentLocation` **[Coordinate][68]** The current location

Returns **[Journey][70]** this

### setThreshold

Sets the instances threshold

#### Parameters

-   `threshold` **[number][69]** The distance from the destination where the notification should be sent

Returns **[Journey][70]** this

### setTargetLocation

Sets the instance's target location and calculates `initialDistance` and `currentDistance`.

#### Parameters

-   `target` **[Coordinate][68]** The target location

Returns **[Journey][70]** this

### getProgress

Get how much of the journey that is complete.

Returns **[Object][67]** `threshold` is the fraction of the trip where the notification should be sent. `current` is the current percentage of the trip that's completed. `shouldNotify` is a bool that notifies if the current distance is less than the threhsold distance

## Notification

Class to be used for local notifications natively.

### Parameters

-   `$0` **[Object][67]**  (optional, default `{}`)
    -   `$0.title`  
    -   `$0.body`   (optional, default `'You are about to arrive at your destination'`)
    -   `$0.schedule`   (optional, default `'now'`)
    -   `$0.id`   (optional, default `Math.floor(Math.random()*100)`)
    -   `$0.sound`   (optional, default `null`)
    -   `$0.journey`   (optional, default `null`)
    -   `$0.actionTypeId`   (optional, default `'DEFAULT'`)
    -   `$0.smallIcon`   (optional, default `null`)
    -   `$0.extra`   (optional, default `null`)
-   `params` **[Object][67]** 

### getRandomTitle

Returns random title if none is provided to the constructor

Returns **[String][74]** Random title

### generateScheduleObj

Generates the object that triggers the notification.

#### Parameters

-   `schedule` **([String][74] \| [number][69] \| [Object][67])** When to send the notification. If it is a string with `now` it starts in 5 seconds, if it is a number it starts in the number of seconds. If it is an object it is considered to know what is required and is return as it is. (optional, default `'now'`)

Returns **[Object][67]** Schedule object for the notification

### getNotificationTypes

Get all the types of notifications that will be used in the application.

Returns **[Array][71]&lt;[Object][67]>** Array of notification types

[1]: #awake

[2]: #introduction

[3]: #user-stories

[4]: #design

[5]: #wireframe-of-views

[6]: #color-schema

[7]: #usage

[8]: #installation-for-android

[9]: #installation-for-web

[10]: #tests

[11]: #generate-documentation

[12]: #assigntargetlocation

[13]: #parameters

[14]: #retrievecurrentlocation

[15]: #parameters-1

[16]: #createjourney

[17]: #parameters-2

[18]: #createlocationlistener

[19]: #parameters-3

[20]: #sendnotification

[21]: #parameters-4

[22]: #journeyremoval

[23]: #parameters-5

[24]: #getfavorites

[25]: #parameters-6

[26]: #setfavorites

[27]: #parameters-7

[28]: #addtofavorites

[29]: #parameters-8

[30]: #removefavorite

[31]: #parameters-9

[32]: #coordinate

[33]: #parameters-10

[34]: #setcoordinates

[35]: #parameters-11

[36]: #calculatedistance

[37]: #parameters-12

[38]: #toradians

[39]: #parameters-13

[40]: #tomarker

[41]: #fromjson

[42]: #parameters-14

[43]: #journey

[44]: #parameters-15

[45]: #setcurrentlocation

[46]: #parameters-16

[47]: #setthreshold

[48]: #parameters-17

[49]: #settargetlocation

[50]: #parameters-18

[51]: #getprogress

[52]: #notification

[53]: #parameters-19

[54]: #getrandomtitle

[55]: #generatescheduleobj

[56]: #parameters-20

[57]: #getnotificationtypes

[58]: https://github.com/karatekaneen/ionicVue/blob/master/docs/AwakerViews.jpg "Wireframe views"

[59]: https://github.com/karatekaneen/ionicVue/blob/master/docs/primary.png "primary color"

[60]: https://github.com/karatekaneen/ionicVue/blob/master/docs/secondary.png "secondary color"

[61]: https://github.com/karatekaneen/ionicVue/blob/master/docs/background.png "Background color"

[62]: https://github.com/karatekaneen/ionicVue/blob/master/docs/accent.png "Accent color"

[63]: https://github.com/karatekaneen/ionicVue/blob/master/docs/info.png "info color"

[64]: https://github.com/karatekaneen/ionicVue/blob/master/docs/warning.png "Warning color"

[65]: https://github.com/karatekaneen/ionicVue/blob/master/docs/success.png "Success color"

[66]: https://github.com/karatekaneen/ionicVue/blob/master/docs/error.png "Error color"

[67]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[68]: #coordinate

[69]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[70]: #journey

[71]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[72]: https://www.movable-type.co.uk/scripts/latlong.html

[73]: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php

[74]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
