import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnitBlog from "./UnitBlog";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      await axios
        .get("http://localhost:3000/klinchem/klinchemBlog")
        .then((response) => {
          setBlog(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchBlogs();
  }, []);

  const handleClick = () => {
    navigate("/klinchem/products_blog/new");
  };

  const message = (
    <p className="text-blue-950 flex justify-center items-center text-[1em] h-80 w-[90%] self-center">
      No Blog. Click on Blog to create post or{" "}
      <button
        onClick={handleClick}
        className="bg-blue-700 text-gray-50 p-1 rounded ml-2"
      >
        Click here
      </button>
    </p>
  );
  return (
    <div className="animate-flyin delay-500 flex justify-center items-center">
      {blog.length === 0
        ? message
        : blog.length > 0 &&
          blog.map((e) => {
            return (
              <section key={e.blogMessage}>
                <h3 className="text-black">
                  <UnitBlog
                    key={e.blogTitle}
                    id={e._id}
                    blogImage={e.blogImage}
                    blogTitle={e.blogTitle}
                    blogMessage={e.blogMessage}
                  />
                </h3>
              </section>
            );
          })}
    </div>
  );
}
