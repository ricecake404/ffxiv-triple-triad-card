import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { CardBaseInfo, getCardBaseInfos } from "../../data/xivapiService";
import { GarlandItemCard, getCardDetails } from "../../data/garlandService";

import { Box } from "@material-ui/core";
import { urlOfIcon } from "../../data/ImgUrl";

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

interface Card extends CardBaseInfo, GarlandItemCard {
  plateSmallUrl: string;
  plateUrl: string;
}

const Page: React.FC<ListPageProps> = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const f = async () => {
      const baseInfos: CardBaseInfo[] = await getCardBaseInfos();
      // console.log("baseInfos", baseInfos);
      const itemIds = baseInfos.map((it) => it.itemId);
      let detailInfos: GarlandItemCard[] = await getCardDetails(itemIds);
      // console.log("detailInfos", detailInfos);
      const cardInfos: Card[] = [];
      for (let i = 0; i < baseInfos.length; i++) {
        const baseInfo = baseInfos[i];
        const detailInfo = detailInfos[i];
        const plateIconId = detailInfo.item.tripletriad.plate;
        cardInfos.push({
          ...baseInfo,
          ...detailInfo,
          plateSmallUrl: urlOfIcon(plateIconId + 400),
          plateUrl: urlOfIcon(plateIconId),
        });
      }
      console.log("cardInfos", cardInfos);
      setCards(cardInfos);
    };
    f();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            List Page
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {/*<div>{JSON.stringify(cards)}</div>*/}
        <List className={classes.root}>
          {cards.map((card) => {
            return (
              <ListItem key={card.cardId}>
                <Box>
                  <img src={card.plateSmallUrl} alt={card.item.name} />
                  <div>{card.item.name}</div>
                </Box>
              </ListItem>

              //   <ListItemAvatar>
              //     <Avatar>
              //       <ImageIcon />
              //     </Avatar>
              //   </ListItemAvatar>
              //   <ListItemText
              //     primary={card.item.name}
              //     secondary={card.orderNumber}
              //   />
            );
          })}
        </List>
      </Container>
    </>
  );
};

export const ListPage = React.memo(Page);
