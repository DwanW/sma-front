import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";

import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage<{
  token: string;
}> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            // do something after register
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            {tokenError ? <Box color="red">{tokenError}</Box> : null}
            <Button
              mt={4}
              type="submit"
              colorScheme="orange"
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
