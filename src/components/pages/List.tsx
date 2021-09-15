import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import React from "react";
import data from "../../data/cards";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface ListPageProps {}

const Page: React.FC<ListPageProps> = () => {
  const classes = useStyles();
  const cardList = data;
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            List Page
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <List className={classes.root}>
          {cardList.map((card) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={card.name_chs} secondary="Jan 9, 2014" />
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export const ListPage = React.memo(Page);
