import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./admin.module.css";
const AdminHome = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <header className={style.header}>
        <div className={style.logosec}>
          <div className={style.logo}>Admin Panel</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className={style.icn + " " + style.menuicn}
            id={style.menuicn}
            alt="menu-icon"
            onClick={handleToggle}
          />
        </div>

        <div className={style.searchbar}>
          <input type="text" placeholder="Search" />
          <div className={style.searchbtn}>
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className={style.icn + " " + style.srchicn}
              alt="search-icon"
            />
          </div>
        </div>

        {/* <div className="message">
          <div className="circle"></div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            className="icn"
            alt=""
          />
          <div className="dp" />
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
            className="dpicn"
            alt="dp"
          />
        </div> */}
      </header>

      <div className={style.main_container}>
        <div
          className={`${style.navcontainer} ${isNavOpen ? style.navclose : ""}`}
        >
          <nav className={style.nav}>
            <div className={style.nav_upper_options}>
              <div className={style.nav_option + " " + style.option1}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className={style.nav_img}
                  alt="dashboard"
                />
                <h3>
                  {" "}
                  <Link to="/admin/home">Dashboard </Link>
                </h3>
              </div>
              <div className={style.option2 + " " + style.nav_option}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className={style.nav_img}
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/all-products"
                    style={{ textDecoration: "none" }}
                  >
                    All Products
                  </Link>{" "}
                </h5>
              </div>
              <div className={style.option2 + " " + style.nav_option}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className={style.nav_img}
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/all-users"
                    style={{ textDecoration: "none" }}
                  >
                    All Users
                  </Link>{" "}
                </h5>
              </div>
              <div className={style.option2 + " " + style.nav_option}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className={style.nav_img}
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/add-product"
                    style={{ textDecoration: "none" }}
                  >
                    Add Product
                  </Link>{" "}
                </h5>
              </div>

              <div className={style.nav_option + " " + style.option3}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                  className={style.nav_img}
                  alt="report"
                />
                <h5>
                  {" "}
                  <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                    View Orders
                  </Link>{" "}
                </h5>
              </div>

              {/* <div className={style.nav_option + " " + style.option4}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                  className={style.nav_img}
                  alt="institution"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/create-classroom"
                    style={{ textDecoration: "none" }}
                  >
                    Create Classroom
                  </Link>{" "}
                </h5>
              </div> */}

              <div className={style.nav_option + " " + style.logout}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className={style.nav_img}
                  alt="logout"
                />
                <h5>
                  {" "}
                  <Link to="/logout" style={{ textDecoration: "none" }}>
                    Logout
                  </Link>{" "}
                </h5>
              </div>
            </div>
          </nav>
        </div>

        <div className={style.main}>
          <div className={style.searchbar2}>
            <input type="text" name="" id="" placeholder="Search" />
            <div className={style.searchbtn}>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                className={style.icn + " " + style.srchicn}
                alt="searchbutton"
              />
            </div>
          </div>

          <div className={style.box_container}>
            <div className={style.box + " " + style.box1}>
              <div className={style.text}>
                <h2 className={style.topic_heading}>60.5k</h2>
                <h2 className={style.topic}>Article Views</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                alt="Views"
              />
            </div>

            <div className={style.box + " " + style.box2}>
              <div className={style.text}>
                <h2 className={style.topic_heading}>150</h2>
                <h2 className={style.topic}>Likes</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
                alt="likes"
              />
            </div>

            <div className={style.box + " " + style.box3}>
              <div className={style.text}>
                <h2 className={style.topic_heading}>320</h2>
                <h2 className={style.topic}>Comments</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                alt="comments"
              />
            </div>

            <div className={style.box + " " + style.box4}>
              <div className={style.text}>
                <h2 className={style.topic_heading}>70</h2>
                <h2 className={style.topic}>Published</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                alt="published"
              />
            </div>
          </div>

          <div className={style.report_container}>
            <div className={style.report_header}>
              <h1 className={style.recent_Articles}>Recent Articles</h1>
              <button className={style.view}>View All</button>
            </div>

            <div className={style.report_body}>
              <div className={style.report_topic_heading}>
                <h3 className={style.t_op}>Article</h3>
                <h3 className={style.t_op}>Views</h3>
                <h3 className={style.t_op}>Comments</h3>
                <h3 className={style.t_op}>Status</h3>
              </div>

              <div className={style.items}>
                <div className={style.item1}>
                  <h3 className={style.t_op_nextlvl}>Article 73</h3>
                  <h3 className={style.t_op_nextlvl}>2.9k</h3>
                  <h3 className={style.t_op_nextlvl}>210</h3>
                  <h3 className={style.t_op_nextlvl + " " + style.label_tag}>
                    Published
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
