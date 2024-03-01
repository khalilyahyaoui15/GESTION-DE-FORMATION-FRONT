import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
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
import { Delete, Edit } from "@mui/icons-material";
import { deleteParticipant } from "src/api/participant";
import { useRouter } from "next/router";
export const ParticipantListResults = ({ participants, setParticipants, ...rest }) => {
  const [selectedParticipantIds, setSelectedParticipantIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter();

  const handleSelectAll = (event) => {
    let newSelectedParticipantIds;

    if (event.target.checked) {
      newSelectedParticipantIds = participants.map((participant) => participant.id);
    } else {
      newSelectedParticipantIds = [];
    }

    setSelectedParticipantIds(newSelectedParticipantIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedParticipantIds.indexOf(id);
    let newSelectedParticipantIds = [];

    if (selectedIndex === -1) {
      newSelectedParticipantIds = newSelectedParticipantIds.concat(selectedParticipantIds, id);
    } else if (selectedIndex === 0) {
      newSelectedParticipantIds = newSelectedParticipantIds.concat(selectedParticipantIds.slice(1));
    } else if (selectedIndex === selectedParticipantIds.length - 1) {
      newSelectedParticipantIds = newSelectedParticipantIds.concat(selectedParticipantIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedParticipantIds = newSelectedParticipantIds.concat(
        selectedParticipantIds.slice(0, selectedIndex),
        selectedParticipantIds.slice(selectedIndex + 1)
      );
    }

    setSelectedParticipantIds(newSelectedParticipantIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleDelete = async (id) => {
    try {
      await deleteParticipant(id);
      setParticipants(participants.filter((participant) => participant._id !== id));
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
                    checked={selectedParticipantIds.length === participants.length}
                    color="primary"
                    indeterminate={
                      selectedParticipantIds.length > 0 && selectedParticipantIds.length < participants.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Session</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.slice(0, limit).map((participant) => (
                <TableRow hover key={participant._id} selected={selectedParticipantIds.indexOf(participant.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedParticipantIds.indexOf(participant.id) !== -1}
                      onChange={(event) => handleSelectOne(event, participant.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>{participant.firstName}</TableCell>
                  <TableCell>{participant.lastName}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.phone}</TableCell>
                  <TableCell>{participant.session.titre}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" size="medium"
                     onClick={ () => {
                      router.push({
                       pathname: '/participants/edit',
                       query: { participantId: participant._id },
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
                        await handleDelete(participant._id);
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
        count={participants.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ParticipantListResults.propTypes = {
  participants: PropTypes.array.isRequired,
};