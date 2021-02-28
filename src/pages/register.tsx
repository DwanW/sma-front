import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!){
  register(options: { username: $username, password: $password}){
    errors{
      field
      message
    }
    user {
      id
      username
    }
  }
}`



const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useMutation(REGISTER_MUT)
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => { return register(values) }}>
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <InputField name="username" placeholder="username" label="Username" />
                            <Box mt={4}>
                                <InputField name="password" label="Password" type="password" />
                            </Box>
                            <Button mt={4} type="submit" colorScheme="orange" isLoading={isSubmitting}>REGISTER</Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
}

export default Register