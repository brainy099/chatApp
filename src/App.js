import React, { Component } from "react";
import "./App.css";
import fire from "./fire";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
  }

  componentDidMount() {
    this.readFromFire();
  }

  readFromFire = () => {
    fire
    .database()
    .ref("/messages")
    .on("value", snapshot => {
        let message = [];
        let obj = snapshot.val();
        if (obj) {
          let keys = Object.keys(obj);
          for (let val of keys) {
            message.push(obj[val].message);
          }
          this.setState({ messages: message });
        }
      });
  };

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  handleClick = () => {
    fire
      .database()
      .ref("messages")
      .push({
        message: this.state.message,
        user: "099"
      });
    
    this.readFromFire();
    this.setState({ message: "" });
  };

  bckStatus = () => this.state.messages.length <= 0;

  render() {
    return this.state.messages.length > 0 ? (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Messages</Typography>
              </Toolbar>
            </AppBar>
            <List component="nav" aria-label="Messages">
              {this.state.messages.map((val, key) => (
                <>
                  <ListItem key ={key} divider>
                    <ListItemText key = {key} primary={val} />
                  </ListItem>
                </>
              ))}
            </List>

            <div>
              <TextField
                fullWidth
                margin="dense"
                shrink="true"
                onChange={this.handleChange}
                label="Enter message"
                variant="outlined"
                value={this.state.message}
              />
              <Button
                fullWidth
                onClick={this.handleClick}
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                style={{ height: "relative" }}
              >
                Send
              </Button>
            </div>
          </>
        </Container>
      </React.Fragment>
    ) : (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
}

export default App;
