import React, { useState, useEffect } from "react";

const InfiniteScrollingRedditPosts = () => {
  const [posts, setPosts] = useState([]); // Store Reddit posts
  const [loading, setLoading] = useState(false); // Loading state
  const [after, setAfter] = useState(null); // Track the "after" parameter for pagination

  // Fetch Reddit posts from a specific subreddit (e.g., r/pics)
  const fetchPosts = async (afterParam = null) => {
    setLoading(true); // Start loading state
    const subreddit = "pics"; // Change to any subreddit you prefer
    const url = `https://www.reddit.com/r/${subreddit}.json?limit=10${
      afterParam ? `&after=${afterParam}` : ""
    }`;

    const response = await fetch(url);
    const data = await response.json();

    setPosts((prevPosts) => [...prevPosts, ...data.data.children]); // Append new posts to the list
    setAfter(data.data.after); // Store the 'after' token for pagination
    setLoading(false); // End loading state
  };

  // Fetch posts on component mount and when 'after' changes
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle scroll event to load more posts when reaching the bottom of the page
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      !after
    ) {
      return;
    }
    fetchPosts(after); // Load more posts using the 'after' token
  };

  // Attach and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [after, loading]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Reddit Posts Feed</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold">{post.data.title}</h2>
            {post.data.thumbnail && post.data.thumbnail !== "self" && (
              <img
                src={post.data.thumbnail}
                alt={post.data.title}
                className="w-full h-auto mt-2 rounded"
              />
            )}
            <p className="text-sm text-gray-700 mt-2">
              {post.data.subreddit_name_prefixed}
            </p>
            <a
              href={`https://www.reddit.com${post.data.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-2 inline-block"
            >
              View Post
            </a>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-900 rounded-full"></div>
          <span className="ml-2">Loading more posts...</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollingRedditPosts;
