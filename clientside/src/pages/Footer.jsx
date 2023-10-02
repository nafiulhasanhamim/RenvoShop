import React from "react";
import up_arrow from "../images/up-arrow.png";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div id="footer" style={{ marginTop: "50px" }}>
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-content">
                <h3>Fashion</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, hic?
                </p>
                <p>
                  Karcahi <br />
                  Sindh <br />
                  Pakistan <br />
                </p>
                <strong>
                  <i className="fas fa-phone"></i> Phone:{" "}
                  <strong>+000000000000000</strong>
                </strong>
                <br />
                <strong>
                  <i className="fa-solid fa-envelope"></i> Email:{" "}
                  <strong>example@gmail.com</strong>
                </strong>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Usefull Links</h4>
                <ul>
                  <li>
                    <a href="">Home</a>
                  </li>
                  <li>
                    <a href="">About</a>
                  </li>
                  <li>
                    <a href="">Contact</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Privacy policay</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Modi, rem!
                </p>
                <ul>
                  <li>
                    <a href="#">Smart phone</a>
                  </li>
                  <li>
                    <a href="#">Smart watch</a>
                  </li>
                  <li>
                    <a href="#">Airpods</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Social Network</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem, ad?
                </p>
                <div className="socail-links mt-3">
                  <a href="#" className="twiiter">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#" className="twiiter">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#" className="twiiter">
                    <i className="fa-brands fa-google-plus"></i>
                  </a>
                  <a href="#" className="twiiter">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" className="twiiter">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container py-4">
          <div className="copyright">
            &copy; Copyright <strong>Fashion</strong>.All Rights Reserved
          </div>
          <div className="credits">
            Designed By <a href="#">SA coding</a>
          </div>
        </div>
      </div>
      <a href="#" className="arrow">
        <i>
          <img src={up_arrow} alt="" width="50px" />
        </i>
      </a>
    </>
  );
};

export default Footer;
