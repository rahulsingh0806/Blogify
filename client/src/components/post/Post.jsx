// import "./post.css";
// import { Link } from "react-router-dom";

// export default function Post({ post }) {
//   const PF = "http://localhost:5000/images/";
//   return (
//     <div className="post">
//       {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
//       <div className="postInfo">
//         <div className="postCats">
//           {post.categories.map((c) => (
//             <span className="postCat">{c.name}</span>
//           ))}
//         </div>
//         <Link to={`/post/${post._id}`} className="link">
//           <span className="postTitle">{post.title}</span>
//         </Link>
//         <hr />
//         <span className="Author">
//             Author:
//             <Link to={`/?user=${post.username}`} className="link">
//               <b> {post.username}</b>
//             </Link>
//           </span>
//         <span className="postDate">
//           {new Date(post.createdAt).toDateString()}
//         </span>
//       </div>
//       <p className="postDesc">{post.desc}</p>
//     </div>
//   );
// }


import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  // Dynamic public folder path based on environment
  const baseURL = process.env.REACT_APP_API_URL;
  const PF =`${baseURL}/images/`;

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, i) => (
            <span className="postCat" key={i}>{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="Author">
          Author:
          <Link to={`/?user=${post.username}`} className="link">
            <b> {post.username}</b>
          </Link>
        </span>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
