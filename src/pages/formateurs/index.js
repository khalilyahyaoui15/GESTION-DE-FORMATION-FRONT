import Head from "next/head";
import { Box, Container } from "@mui/material";
import { FormateurListResults } from "src/components/formateur/formateur-list-results";
import { FormateurListToolbar } from "src/components/formateur/formateur-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/contexts/auth";
import { getFormateurs } from "src/api/formateur";

const Formateurs = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [formateurs, setFormateurs] = useState([]);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    getFormateurs(criteria).then((res) => setFormateurs(res.data));
  }, [criteria]);

  const getCriteria = (criteria) => {
    setCriteria(criteria);
  };

  return (
    isAuthenticated && (
      <>
        <Head>
          <title>Formateurs | IGA Tunisie</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <FormateurListToolbar setCriteria={getCriteria} />
            <Box sx={{ mt: 3 }}>
              <FormateurListResults formateurs={formateurs} setFormateurs={setFormateurs}/>
            </Box>
          </Container>
        </Box>
      </>
    )
  );
};

Formateurs.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Formateurs;
