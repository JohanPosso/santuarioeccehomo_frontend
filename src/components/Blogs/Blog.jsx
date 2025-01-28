import React from "react";

const Blog = () => {
  return (
    <section className="blog py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">
          Historias y articulos
        </h2>
        <p className="light-gray heading mb-48">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
          <br />
          incididunt ut labore et dolore magna. adipiscing enim ad minim veniam.
        </p>
        <div className="row row-gap-4 justify-content-center">
          {[
            {
              id: 1,
              imgSrc: "/src/assets/media/blog/blog-1.png",
              title: "Nurturing Your Spirit: Lessons from Scripture",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna adipiscing enim ad minim.",
            },
            {
              id: 2,
              imgSrc: "/src/assets/media/blog/blog-2.png",
              title: "Faith and Family: Building Stronger Connections",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna adipiscing enim ad minim.",
            },
            {
              id: 3,
              imgSrc: "/src/assets/media/blog/blog-3.png",
              title: "Living with Purpose: Finding God in Everyday Life",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna adipiscing enim ad minim.",
            },
          ].map((blog) => (
            <div key={blog.id} className="col-xl-4 col-lg-6 col-md-6">
              <a href="blog-detail.html">
                <div className="blog-image">
                  <img src={blog.imgSrc} alt="blog" />
                </div>
              </a>
              <div className="text-block">
                <div className="d-flex gap-12 align-items-center mb-8">
                  <p className="light-gray fw-400">Lana Steiner</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                  >
                    <circle cx="3" cy="3" r="3" fill="#92949F" />
                  </svg>
                  <p className="light-gray fw-400">Lana Steiner</p>
                </div>
                <a href="blog-detail.html">
                  <h6 className="medium-black fw-700 mb-16">{blog.title}</h6>
                  <p className="light-gray mb-24">{blog.description}</p>
                  <div className="d-flex gap-8 align-items-center">
                    <p className="text">read more</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_31558_219)">
                        <path
                          d="M19.6222 18.1941C18.2348 15.7911 18.6278 11.2924 21.1909 9.8126M21.1909 9.8126C19.7225 10.6604 15.9226 11.7863 13.148 6.98045M21.1909 9.8126L5.97244 18.599"
                          stroke="#BF835E"
                          strokeWidth="1.84977"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_31558_219">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0 10.5) rotate(-30)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
