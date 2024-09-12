# Infinite Scrolling Reddit Posts with React

This project demonstrates how to implement infinite scrolling in a React application, fetching posts from the Reddit API. The application loads new posts automatically as the user scrolls down the page, enhancing the user experience with dynamic content loading. The app fetches data from Reddit and displays the posts with titles, thumbnails (if available), and links to the original Reddit post. As the user scrolls, more posts are fetched automatically.

## Features

- Fetches posts from the Reddit API (e.g., `r/pics` subreddit).
- Loads more posts as the user scrolls down (infinite scrolling).
- Displays loading spinner while fetching new posts.
- Uses Tailwind CSS for modern and responsive design.

## Technologies Used

- **React**: Frontend JavaScript framework.
- **Reddit JSON API**: To fetch posts from a subreddit.
- **Tailwind CSS**: For styling the components in a responsive manner.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hardy07/social-media-feed.git
   cd social-media-feed
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the App

1. Start the development server:

   ```bash
   npm start
   ```

2. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

   The app will load posts from the `r/technology` subreddit by default. You can customize the subreddit in the code.

## How it Works

- **Fetching Data**: The app fetches Reddit posts using the public Reddit JSON API. Posts are fetched from a specific subreddit in batches of 10.
- **Infinite Scrolling**: The app listens for scroll events and checks if the user has reached the bottom of the page. When the bottom is reached, it automatically loads the next batch of posts using the `after` parameter from the Reddit API for pagination.
- **Loading Indicator**: While fetching new posts, a loading spinner is displayed to indicate that new content is being loaded.

## API Used

- **Reddit JSON API**: We are fetching posts from a specific subreddit. No authentication is required for public subreddits.
  - API endpoint: `https://www.reddit.com/r/[subreddit].json?limit=10&after=[after]`
  - Example: `https://www.reddit.com/r/technology.json`

## Customizing the Subreddit

To change the subreddit, modify the following line in `src/App.js`:

```js
const subreddit = "technology"; // Change 'pics' to any subreddit you like
```

# Questions

## 1. How would you implement infinite scrolling in a React component?

To implement infinite scrolling, you can monitor the user's scroll position and trigger data fetching when they reach the bottom of the page. You typically do this by attaching a scroll event listener to the window, calculating the scroll position, and comparing it with the total document height.

## 2. Describe how to fetch and display additional posts as the user scrolls.

- Fetching additional posts happens when the user scrolls near the bottom of the page.
- Attach a scroll event listener in the `useEffect` that checks whether the user has reached the bottom.
- Trigger the `fetchMorePosts` function to fetch new posts and append them to the state.

## 3. How can you optimize the loading of posts to improve performance and user experience?

- **Debouncing**: Debounce the scroll event to prevent excessive API calls.
- **Lazy Loading**: Lazy load images to improve performance.
- **Pagination**: Use the `after` parameter in the Reddit API to paginate results.
- **Reduce Payload Size**: Limit data fetched by requesting only necessary fields.

## 4. Explain how you would handle loading states and display a spinner while new posts are being fetched.

Use the loading state to track data fetching and display a spinner while loading.

```js
{loading && <div className="spinner">Loading...</div>}
```

Set loading to true before the API call and false after posts are loaded.

## 5. What are the potential challenges with infinite scrolling, and how would you address them?

- **Performance**: Pagination and chunked loading help mitigate performance issues.
- **Accessibility**: Consider a "Load More" button for users who need better navigation.
- **Memory Management**: Use windowing (e.g., react-window) to render only visible items.
- **Error Handling**: Show appropriate messages and retries for failed API calls.
- **SEO**: Offer an alternative paginated view for better SEO indexing.
