import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
        //   const response = await login(values);
        //   if (response.data?.login.errors) {
        //     setErrors(toErrorMap(response.data.login.errors));
        //   } else if (response.data?.login.user) {
        //     // do something after register
        //     router.push("/");
        //   }
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
            <Button
              mt={4}
              type="submit"
              colorScheme="orange"
              isLoading={isSubmitting}
            >
              Change password
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

export default ChangePassword;
