import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useAuth } from "src/contexts/auth";
import { useEffect,useState } from "react";
import { useRouter, withRouter } from "next/router";
import ParticipantEdit from "src/components/participant/participant-edit";

const editParticipant = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const query = router.query;
  const participantId = query.participantId;
  useEffect(() => {
    console.log(participantId)
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
            <title>Participant | IGA Tunisie</title>
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
                Edit Participant
              </Typography>
              <ParticipantEdit participantId={participantId} />
            </Container>
          </Box>
        </>
      )}
    </> 
    
  );
};
editParticipant.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default editParticipant;
