import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ParticipantListResults } from "../../components/participant/participant-list-results";
import { ParticipantListToolbar } from "../../components/participant/participant-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/contexts/auth";
import { getParticipants } from "src/api/participant";

const Participants = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    getParticipants(criteria).then((res) => setParticipants(res.data));
  }, [criteria]);

  const getCriteria = (criteria) => {
    setCriteria(criteria);
  };

  return (
    isAuthenticated && (
      <>
        <Head>
          <title>Participants | IGA Tunisie</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <ParticipantListToolbar setCriteria={getCriteria} />
            <Box sx={{ mt: 3 }}>
              <ParticipantListResults participants={participants} setParticipants={setParticipants} />
            </Box>
          </Container>
        </Box>
      </>
    )
  );
};

Participants.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Participants;
