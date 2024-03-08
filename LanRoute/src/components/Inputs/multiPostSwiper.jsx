import React, { useEffect } from 'react';
import Swiper from 'swiper';
import '../Styles/swiper.css'

function MultiPostSwiper({ posts }) {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 3, // Number of slides to show at once
      spaceBetween: 20, // Space between slides
      // Add other configurations as needed
      pagination: {
        el: '.swiper-pagination', // Pagination container
        clickable: true, // Enable pagination clickable
      },
    });
    
    return () => {
      swiper.destroy(true, true);
    };
  }, [posts]);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {posts.map(post => (
          <div className="swiper-slide" key={post.id}>
            {/* Render your post content here */}
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
}

export default MultiPostSwiper;
