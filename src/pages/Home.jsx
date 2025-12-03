function Home() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <h2>Welcome to my Movies Application.</h2>
      <h2>I hope you will enjoy!!</h2>
      <div className="image-gallery">
        <img
          src="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="movie-pic"
          className="home-page-image"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHytkVcm-E4Kx_PzKl1o0u8GUxUlHHDWHrAQ&s"
          alt="movie-pic"
          className="home-page-image"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/35mm_movie_negative.jpg/1200px-35mm_movie_negative.jpg"
          alt="movie-pic"
          className="home-page-image"
        />
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8fDA%3D"
          alt="movie-pic"
          className="home-page-image"
        />
      </div>
    </div>
  );
}
export default Home;
