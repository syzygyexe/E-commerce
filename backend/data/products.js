// Initial product data
const products = [
  {
    name: "Alexa",
    image: "/images/alexa.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 89.99,
    countInStock: 12,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Beats",
    image: "/images/beats.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 59.99,
    countInStock: 3,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: "Phone",
    image: "/images/cellar-phone.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 39.99,
    countInStock: 9,
    rating: 4,
    numReviews: 1,
  },
  {
    name: "Ergotron",
    image: "/images/ergotron.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 24.99,
    countInStock: 4,
    rating: 3,
    numReviews: 2,
  },
  {
    name: "GamePad",
    image: "/images/gamepad.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 19.99,
    countInStock: 3,
    rating: 5,
    numReviews: 4,
  },
  {
    name: "Mouse",
    image: "/images/gaming-mouse.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 79.99,
    countInStock: 12,
    rating: 3.5,
    numReviews: 2,
  },
  {
    name: "Keyboard",
    image: "/images/keyboard.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 189.99,
    countInStock: 11,
    rating: 5,
    numReviews: 7,
  },
  {
    name: "Lightning-HDMI",
    image: "/images/lightning-to-hdmi.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 19.99,
    countInStock: 0,
    rating: 1,
    numReviews: 1,
  },
  {
    name: "Monitor",
    image: "/images/monitor.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 289.99,
    countInStock: 7,
    rating: 4,
    numReviews: 8,
  },
  {
    name: "Nvidia 3090",
    image: "/images/nvidia3090.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 399.99,
    countInStock: 0,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Oculus",
    image: "/images/oculus.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 159.99,
    countInStock: 3,
    rating: 2.5,
    numReviews: 3,
  },
  {
    name: "PlayStation 5",
    image: "/images/ps5.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 249.99,
    countInStock: 0,
    rating: 5,
    numReviews: 2,
  },
  {
    name: "E-Scooter",
    image: "/images/scooter.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 99.99,
    countInStock: 14,
    rating: 2.5,
    numReviews: 5,
  },
  {
    name: "Tablet",
    image: "/images/tablet.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 169.99,
    countInStock: 12,
    rating: 1.5,
    numReviews: 42,
  },
  {
    name: "Wireless-charger",
    image: "/images/wireless-charger.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    brand: "Lorem",
    category: "ipsum",
    price: 49.99,
    countInStock: 4,
    rating: 3,
    numReviews: 3,
  },
];

export default products;
