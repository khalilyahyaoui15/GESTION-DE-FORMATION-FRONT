import Head from "next/head";
import { Box, Container } from "@mui/material";
import { UserListResults } from "src/components/user/user-list-results";
import { UserListToolbar } from "src/components/user/user-list-toolbar";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/contexts/auth";
import { getUsers } from "src/api/user";

const Users = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    getUsers(criteria).then((res) => setUsers(res.data));
  }, [criteria]);

  const getCriteria = (criteria) => {
    setCriteria(criteria);
  };

  return (
    isAuthenticated && (
      <>
        <Head>
          <title>Users | IGA Tunisie</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <UserListToolbar setCriteria={getCriteria} />
            <Box sx={{ mt: 3 }}>
              <UserListResults users={users} setUsers={setUsers}/>
            </Box>
          </Container>
        </Box>
      </>
    )
  );
};

Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;
