export const setsOptions = [
  {
    "name": "basic",
    "points": 5,
    "price": 275,
    "recommended": false,
  },
  {
    "name": "standard",
    "points": 6,
    "price": 295,
    "recommended": false,
  },
  {
    "name": "enhanced",
    "points": 8,
    "price": 335,
    "recommended": true,
  },
  {
    "name": "elite",
    "points": 10,
    "price": 460,
    "recommended": false,
  },
]

export const colorsOptions = [
  "blue",
  "white",
  "grey",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "black",
]

export const screens = [
  "Login to buy",
  "Select a Set",
  "Customize your Set",
  "Extras and promo code",
  "Shipping address",
  "Done",
]

export function getHasNextBackScreen(currentScreen, doneScreens) {

  // Get indexes
  const currentScreenIndex = screens.indexOf(currentScreen)
  const nextScreenIndex = currentScreenIndex + 1
  const backScreenIndex = currentScreenIndex - 1

  // Default in last screen
  if (nextScreenIndex == screens.length) {
    return { hasNext: false, hasBack: true }
  }

  // Default in first screen
  if (backScreenIndex < 0) {
    return { hasNext: true, hasBack: false }
  }

  // Validate if there is already a done screen
  const nextScreen = screens[nextScreenIndex + 1]
  const hasNext = doneScreens.includes(nextScreen)
  return { hasNext, hasBack: true }
}

export const setsColorNumPrices = [
  {
    colorsNum: 1,
    amount: -5,
    details: "Single color (-5 USD)"
  },
  {
    colorsNum: 2,
    amount: 0,
    details: "2 colors (Trackers and logo) Included"
  },
  {
    colorsNum: 3,
    amount: 10,
    details: "3 Colors (Trackers and 2 logo colors) +10USD"
  },
  {
    colorsNum: 4,
    amount: 20,
    details: "4 Colors (Trackers and 3 logo colors) +20USD"
  },
]