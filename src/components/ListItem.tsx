import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { MenuItem, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Select from "@mui/material/Select";
import moment from "moment";
import Celebrity from "../type/interface";

const ListItem = ({
  _id,
  first,
  last,
  dob,
  gender,
  email,
  picture,
  country,
  description,
  handleDeleteModalOpen,
  onAccordianSelect,
  idSelected,
}: Celebrity) => {
  
  const [firstName, setFirstName] = useState(first);
  const [birthYear, setBirthYear] = useState(dob);
  const [genderData, setGenderData] = useState(gender);
  const [countryData, setCountryData] = useState(country);
  const [descriptionData, setDescriptionData] = useState(description);
  const [validatingError, setValidatingError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (
      (first.length > 0 && firstName.length === 0) ||
      (country.length > 0 && countryData.length === 0) ||
      (description.length > 0 && descriptionData.length === 0)
    ) {
      setValidatingError("Values cannot be empty");
    } else {
      setValidatingError("");
    }
  }, [firstName, countryData, descriptionData]);

  return (
    <Accordion style={{ fontSize: "30px", padding: "20px", marginTop: "30px" }} onClick={() => onAccordianSelect(_id)} expanded={_id === idSelected  }>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Avatar src={picture} />
        <Typography variant="h5" style={{ paddingLeft: "10px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!editing}
            error={firstName.length === 0}
            required
          />
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Typography>
              <span style={{ color: "grey" }}>Age</span>
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={moment().diff(birthYear, "years")}
                onChange={(e) => setBirthYear(e.target.value)}
                disabled
                type="number"
                required
              />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span style={{ color: "grey" }}>Gender</span>
              <br />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genderData}
                label="Age"
                disabled={!editing}
                onChange={(e) => setGenderData(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="transgender">Transgender</MenuItem>
                <MenuItem value="rather not to say">Rather not to say</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <span style={{ color: "grey" }}>Country</span>
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={countryData}
                onChange={(e) => setCountryData(e.target.value)}
                disabled={!editing}
                error={countryData.length === 0}
                required
                type="text"
               />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              <span style={{ color: "grey" }}>Description</span>
              <br />
              <TextField
                id="outlined-basic"
                style={{ border: "none" }}
                variant="outlined"
                value={descriptionData}
                onChange={(e) => setDescriptionData(e.target.value)}
                fullWidth
                multiline
                maxRows={4}
                disabled={!editing}
                error={descriptionData.length === 0}
                required
              />
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} style={{ float: "right" }}>
              {editing && moment().diff(birthYear, "years") > 18 ? (
                <>
                  <IconButton aria-label="delete" size="large">
                    <CancelIcon
                      fontSize="inherit"
                      style={{ color: "red" }}
                      onClick={() => setEditing(false)}
                    />
                  </IconButton>
                  <span>{validatingError}</span>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    disabled={validatingError.length > 0}
                  >
                    <CheckCircleOutlineIcon
                      fontSize="inherit"
                      style={{ color: "green" }}
                      onClick={() => setEditing(false)}
                    />
                  </IconButton>
                </>
              ) : (
                <>
                  {moment().diff(birthYear, "years") < 18 && (
                    <span>Non adult</span>
                  )}
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleDeleteModalOpen(_id)}
                  >
                    <DeleteIcon fontSize="inherit" style={{ color: "red" }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => setEditing(true)}
                    disabled={moment().diff(birthYear, "years") < 18}
                  >
                    <EditIcon fontSize="inherit" style={{ color: "blue" }} />
                  </IconButton>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default ListItem;
