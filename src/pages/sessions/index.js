import Head from "next/head";
import { Box, Container } from "@mui/material";
import { SessionListResults } from "src/components/session/session-list-results";
import { SessionListToolbar } from "src/components/session/session-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/contexts/auth";
import { getSessions } from "src/api/session";

const Sessions = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    getSessions(criteria).then((res) => setSessions(res.data));
  }, [criteria]);

  const getCriteria = (criteria) => {
    setCriteria(criteria);
  };

  return (
    isAuthenticated && (
      <>
        <Head>
          <title> Sessions | IGA Tunisie</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <SessionListToolbar setCriteria={getCriteria} />
            <Box sx={{ mt: 3 }}>
              <SessionListResults sessions={sessions} setSessions={setSessions} />
            </Box>
          </Container>
        </Box>
      </>
    )
  );
};

Sessions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Sessions;
