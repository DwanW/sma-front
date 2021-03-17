import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery, usePostQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, fetching]);
};

export const useGetPostIdFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query._id === "string" ? parseInt(router.query._id) : -1;
  return intId;
};

export const useGetPostFromUrl = () => {
  //get post id hook
  const intId = useGetPostIdFromUrl();
  return usePostQuery({
    pause: intId === -1,
    variables: {
      _id: intId,
    },
  });
};
