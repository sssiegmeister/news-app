import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/main">Home</Link>

    <nav>
      <Link to="/saved">Saved Articles</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
