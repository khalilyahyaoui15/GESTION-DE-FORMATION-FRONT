import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useAuth } from "src/contexts/auth";
import { useEffect,useState } from "react";
import { useRouter, withRouter } from "next/router";
import SessionEdit from "src/components/session/session-edit";

const editSession = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const query = router.query;
  const sessionId = query.sessionId;
  useEffect(() => {
    console.log(sessionId)
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
            <title>Session | IGA Tunisie</title>
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
                Edit Session
              </Typography>
              <SessionEdit sessionId={sessionId} />
            </Container>
          </Box>
        </>
      )}
    </> 
    
  );
};
editSession.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default editSession;
