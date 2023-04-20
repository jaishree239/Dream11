import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ListItem from "./ListItem";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  getCelebrities,
  searchCelebrities,
  deleteCelebrity,
} from "../redux/celebrity/celebritySlice";
import { AppDispatch } from "../redux/store";
import useDebounce from "../hooks/useDebounceInput";
import DeleteModal from "./DeleteModal";
import { Typography } from "@mui/material";
import Celebrity from "../type/interface";

const List = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setModal] = useState<boolean>(false);
  const { status, celebrities } = useSelector(
    (state: RootState) => state.celebrity
  );

  const [searchinput, setSearchInput] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchinput, 500);
  const [modalSelected, setModalSelected] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<number | boolean>(false);

  function handleDeleteModalOpen(id: number) {
    setModalSelected(id);
    setModal(true);
  }

  function handleAccordianSelected(id: number) {
    setModalSelected(id);
  }

  function onDelete() {
    dispatch(deleteCelebrity({ id: modalSelected }));
    setModal(false);
  }

  function handleDeleteModalClose() {
    setModal(false);
  }

  useEffect(() => {
    dispatch(getCelebrities());
  }, []);

  useEffect(() => {
    if (searchinput.length > 2) {
      dispatch(searchCelebrities(searchinput));
    }

    return () => {
      dispatch(getCelebrities());
    };
  }, [debouncedValue]);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1450);
  }, [window.innerWidth]);

  return (
    <>
      <Grid item xs={0} md={3} sm={3}></Grid>
      <Grid item xs={12} md={6} sm={6}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          margin="normal"
          style={{
            marginTop: "50px",
            marginBottom: '-100px',
          }}
          value={searchinput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Grid>
      <Grid item xs={0} md={3} sm={3}></Grid>
      <Grid item xs={0} md={3} sm={3}></Grid>
      <Grid item xs={12} md={6} sm={6}>
        <div style={{ marginTop: "150px" }}>
          {celebrities.map((celebrity: Celebrity) => (
            <ListItem
              key={celebrity._id.toString()}
              _id={celebrity._id}
              first={celebrity.first}
              last={celebrity.last}
              dob={celebrity.dob}
              gender={celebrity.gender}
              email={celebrity.email}
              picture={celebrity.picture}
              country={celebrity.country}
              description={celebrity.description}
              handleDeleteModalOpen={handleDeleteModalOpen}
              idSelected={modalSelected}
              onAccordianSelect={handleAccordianSelected}
            expanded={expanded}           
              setExpanded={setExpanded}
            />
          ))}
          { isDesktop && (
            <DeleteModal
              openModal={openModal}
              handleDeleteModalClose={handleDeleteModalClose}
              onDelete={onDelete}
            />
       ) }
        </div>
        {celebrities.length == 0 && (
          <div>
            <Typography>No data found</Typography>
          </div>
        )}
      </Grid>
      <Grid item xs={0} md={3} sm={3}></Grid>
    </>
  );
};

export default List;
