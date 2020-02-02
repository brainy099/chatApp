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
import Divider from "@material-ui/core/Divider";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialState = {
  messages: [],
  message: ""
};

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
    let message = [];
    fire
      .database()
      .ref("/messages")
      .on("value", snapshot => {
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
    this.setState(initialState);
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
            <h1>Messages</h1>
            <List component="nav" aria-label="Messages">
              {this.state.messages.map(val => (
                <>
                  <ListItem button>
                    <ListItemText primary={val} />
                  </ListItem>
                  <Divider />
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
