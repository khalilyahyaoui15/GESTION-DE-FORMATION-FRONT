import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useAuth } from "src/contexts/auth";
import { useEffect,useState } from "react";
import { useRouter, withRouter } from "next/router";
import FormationEdit from "src/components/formation/formation-edit";

const editFormation = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const query = router.query;
  const formationId = query.formationId;
  useEffect(() => {
    console.log(formationId)
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
            <title>Formation | IGA Tunisie</title>
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
                Edit Formation
              </Typography>
              <FormationEdit formationId={formationId} />
            </Container>
          </Box>
        </>
      )}
    </> 
    
  );
};
editFormation.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default editFormation;
