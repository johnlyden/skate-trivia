const contentful = require('contentful');

export default function initializeClient() {
  return contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
  });
}
