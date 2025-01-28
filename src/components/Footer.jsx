import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid">
        <div className="mb-48">
          <div className="row row-gap-4">
            <div className="col-xl-4">
              <a href="">
                <img
                  src="/public/logo_santo.png"
                  alt="logo"
                  className="header-logo"
                />

                <p className="lightest-gray">
                  Lorem ipsum dolor sit amet consectetur. Lectus ac sed purus
                  ultrices diam eu scelerisque. Eu ipsum curabitur ultricies id
                  vel lacus pellentesque tristique. Nunc amet semper turpis
                  auctor rhoncus amet aliquet commodo.
                </p>
              </a>
            </div>
            <div className="col-xl-4 col-md-8 col-lg-8 offset-xl-2">
              <h5 className="white fw-700 mb-24">Explore</h5>
              <ul className="footer-list list-unstyled">
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="blog-grid.html">Articles</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">FAQ’s</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="contact.html">Contacts</a>
                </li>
                <li className="white mb-8">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">Partnerships</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">FAQ’s</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="contact.html">Contacts</a>
                </li>
                <li className="white mb-8">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">Partnerships</a>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4">
              <h5 className="white fw-700 mb-24">Enlaces utiles</h5>
              <ul className="footer-lists list-unstyled">
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="blog-grid.html">Articles</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">FAQ’s</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="contact.html">Contacts</a>
                </li>
                <li className="white mb-8">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">Partnerships</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center lightest-gray fw-400">
          @2024 All Rights Copyright Desarrollado por{" "}
          <span className="brown fw-700">
            {" "}
            <a href="https://johanposso.com/">Johan Posso</a>
          </span>{" "}
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
