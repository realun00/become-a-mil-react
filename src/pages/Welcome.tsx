import React from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setName } from "../redux/slices/playerReducer";

const Welcome = () => {
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!username) {
      setError(true);
      return;
    } else {
      dispatch(setName(username));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!e.target.value) {
      setError(true);
    } else {
      setError(false);
    }
    setUsername(e.target.value);
  };

  return (
    <div className="welcome-container">
      <div className="welcome">
        <TextField
          label="Please enter a username"
          variant="standard"
          value={username}
          onChange={onChange}
          className="my-3"
          error={error}
          helperText={error ? "This field is required" : ""}
        />
        <Button type="submit" variant="outlined" onClick={handleSubmit}>
          Start the game
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
