import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useAuth } from "src/contexts/auth";
import { useEffect,useState } from "react";
import { useRouter, withRouter } from "next/router";
import FormateurEdit from "src/components/formateur/formateur-edit";

const editFormateur = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const query = router.query;
  const formateurId = query.formateurId;
  useEffect(() => {
    console.log(formateurId)
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
            <title>Formateur | IGA Tunisie</title>
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
                Edit Formateur
              </Typography>
              <FormateurEdit formateurId={formateurId} />
            </Container>
          </Box>
        </>
      )}
    </> 
    
  );
};
editFormateur.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default editFormateur;
