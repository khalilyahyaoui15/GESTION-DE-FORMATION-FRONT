import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useRouter } from "next/router";

export const ParticipantListToolbar = (props) => {
  const router = useRouter();
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
        Participants
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button 
            color="primary" 
            variant="contained" 
            onClick={() => router.push("/participants/add")}>
            Add Participant
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                onChange={(e) => props.setCriteria(e.target.value)}                
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Participant"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};