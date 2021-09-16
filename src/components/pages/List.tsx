import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ImageIcon from "@material-ui/icons/Image";
import React, {useEffect, useState} from "react";
import data from "../../data/cards";
import xivService, {CardBaseInfo} from "../../data/xivapiService";
import garlandService from "../../data/garlandService";

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

interface ListPageProps { }

const Page: React.FC<ListPageProps> = () => {
  const classes = useStyles();
  const cardList = data;
const [card, setCard] = useState()
  // xivService.search()
  useEffect(()=> {
    const f = async () => {
        const baseInfos: CardBaseInfo[] = await xivService.getCardBaseInfos()
        console.log(baseInfos)
        const itemIds = baseInfos.map(it => it.itemId)
        let detailInfos: any = []
        const batchSize = 50
        for (let i = 0; i < itemIds.length; i += batchSize) {
            const detailParts = await garlandService.getCardDetails(itemIds.slice(i, i + batchSize))
            detailInfos = detailInfos.concat(detailParts)
        }
        console.log(detailInfos)
        // setCard(detailInfos)

    }
    f()
  }, [])

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
        <div>{JSON.stringify(card)}</div>
        <List className={classes.root}>
          {cardList.map((card) => {
            return (
              <ListItem key={card.id}>
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
