import './App.css';

function App() {
  return (
    <>
      <header>
        <nav>
          <h1>Little Lemon</h1>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/reserve">Reserve</a></li>
            <li><a href="/menu">Menu</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="section">About Little Lemon</section>
        <section className="section">Highlights & Specials</section>
        <section className="section">Dishes & Photos</section>
        <section className="section">Testimonials</section>
      </main>

      <footer>
        <p>© 2025 Little Lemon Restaurant</p>
      </footer>
    </>
  );
}

export default App;
