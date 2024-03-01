import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { deleteSession } from "src/api/session";
import { Delete, Edit } from "@mui/icons-material";
import {useRouter} from "next/router";
export const SessionListResults = ({ sessions, setSessions, ...rest }) => {
  const [selectedSessionIds, setSelectedSessionIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const handleSelectAll = (event) => {
    let newSelectedSessionIds;

    if (event.target.checked) {
      newSelectedSessionIds = sessions.map((session) => session.id);
    } else {
      newSelectedSessionIds = [];
    }

    setSelectedSessionIds(newSelectedSessionIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSessionIds.indexOf(id);
    let newSelectedSessionIds = [];

    if (selectedIndex === -1) {
      newSelectedSessionIds = newSelectedSessionIds.concat(selectedSessionIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSessionIds = newSelectedSessionIds.concat(selectedSessionIds.slice(1));
    } else if (selectedIndex === selectedSessionIds.length - 1) {
      newSelectedSessionIds = newSelectedSessionIds.concat(selectedSessionIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSessionIds = newSelectedSessionIds.concat(
        selectedSessionIds.slice(0, selectedIndex),
        selectedSessionIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSessionIds(newSelectedSessionIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleDelete = async (id) => {
    try {
      await deleteSession(id);
      setSessions(sessions.filter((session) => session._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedSessionIds.length === sessions.length}
                    color="primary"
                    indeterminate={
                      selectedSessionIds.length > 0 && selectedSessionIds.length < sessions.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Formation</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Date Debut</TableCell>
                <TableCell>Date Fin</TableCell>
                <TableCell>Formateur</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.slice(0, limit).map((session) => (
                <TableRow hover key={session._id} selected={selectedSessionIds.indexOf(session._id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSessionIds.indexOf(session.id) !== -1}
                      onChange={(event) => handleSelectOne(event, session._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>{session.formation.titre}</TableCell>
                  <TableCell>{session.titre}</TableCell>
                  <TableCell>{format(new Date(session.dateDebut), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{format(new Date(session.dateFin), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{session.formateur.nom}  {session.formateur.prenom}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" size="medium"
                    onClick={ () => {
                      router.push({
                       pathname: '/sessions/edit',
                       query: { sessionId: session._id },
                   })
                   }
                   }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="medium"
                      onClick={async () => {
                        await handleDelete(session._id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={sessions.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SessionListResults.propTypes = {
    sessions: PropTypes.array.isRequired,
};