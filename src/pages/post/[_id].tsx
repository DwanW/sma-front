import { Box, Heading } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import EditDeleteButtonGroup from "../../components/EditDeleteButtonGroup";
import Layout from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/hooks";

const Post = () => {
  const [{ data, fetching, error }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>getting post data</div>
      </Layout>
    );
  }

  if (error) {
    console.log("error: ", error);
    return null;
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data?.post?.text}</Box>
      <EditDeleteButtonGroup
        _id={data.post._id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
