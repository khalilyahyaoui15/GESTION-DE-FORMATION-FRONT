import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { FormationListToolbar } from "../../components/formation/formation-list-toolbar";
import { FormationCard } from "../../components/formation/formation-card";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/contexts/auth";
import { getFormations } from "src/api/formation";

const Formations = () => {
  const router = useRouter();
  const {user, isAuthenticated, loading } = useAuth();
  const [formations, setFormations] = useState([]);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    getFormations(criteria).then((res) => setFormations(res.data));
  }, [criteria]);

  const getCriteria = (criteria) => {
    setCriteria(criteria);
  };
  return (
    <>
      <Head>
        <title>Formations | IGA Tunisie</title>
      </Head>
      <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <FormationListToolbar setCriteria={getCriteria} />
            <Box sx={{ mt: 3 }}>
              <FormationCard formations={formations} setFormations={setFormations} />
            </Box>
          </Container>
        </Box>
        
    </>
  );
};
Formations.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Formations;
