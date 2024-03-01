import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useAuth } from "src/contexts/auth";
import { useEffect} from "react";
import { useRouter } from "next/router";
import UserForm from "src/components/user/user-form";

const Account = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {isAuthenticated && (
        <>
          <Head>
            <title>User | IGA Tunisie</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="lg">
              <Typography sx={{ mb: 3 }} variant="h4">
                Add User
              </Typography>
              <UserForm />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};
Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
