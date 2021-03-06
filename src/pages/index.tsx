import { withUrqlClient } from "next-urql";
import NavBar from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>hi</div>
      {!data ? (
        <div>loading... </div>
      ) : (
        data.posts.map((post) => <div key={post._id}>{post.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
