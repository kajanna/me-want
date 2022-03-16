import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Card, Box, Button } from "@material-ui/core";

import UserItem from "../components/UserItem";
import ErrorModal from "../../shared/UIcustom/ErrorModal";
import LoadingSpinner from "../../shared/UIcustom/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-req-hook";

const useStyles = makeStyles({
  conteiner: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState();
  const { sendRequest, error, isLoading, clearErrorHandler } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`,
          "GET",
          { "Content-Type": "application/json" }
        );
        if (response) {
          setUsers(response.data.users);
        }
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest, setUsers]);

  return (
    <>
      { isLoading && <LoadingSpinner/> }
      <ErrorModal open={!!error} close={clearErrorHandler} error={error} />
      <Container className={classes.conteiner}>
        {users &&
          users.lenght !== 0 &&
          !error &&
          users.map((user) => (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.name}
              image={user.image}
            />
          ))}
        {users && users.lenght === 0 && !error && (
          <Card className={classes.root}>
            <Box margin={1}>
              <Typography align="center" variant="body1" color="primary">
                Nie ma zarejestrowanych uzytkowników serwisu
              </Typography>
            </Box>
            <Box margin={1}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                href="/auth"
              >
                Zarejestruj się
              </Button>
            </Box>
          </Card>
        )}
      </Container>
    </>
  );
};
export default Users;
