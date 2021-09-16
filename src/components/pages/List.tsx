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

interface ListPageProps {
}

type Card = {
    base: CardBaseInfo;
    detail: any;
}

type CardDetailInfo = {
    id: string,
    obj: {
        item: {
            achievements: number[]
            category: number
            description: string
            icon: number
            id: number
            ilvl: number
            name: string
            patch: number
            patchCategory: number
            price: number
            rarity: number
            stackSize: number
            tripletriad: {
                chs: { description: string },
                bottom: number
                left: number
                right: number
                top: number,
                plate: number,
                type: string,
                rarity: number,
            }
            unique: number
            unlistable: number
        },
        partials: any[]
    }
}

const Page: React.FC<ListPageProps> = () => {
    const classes = useStyles();
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const f = async () => {
            const baseInfos: CardBaseInfo[] = await xivService.getCardBaseInfos()
            console.log(baseInfos)
            const itemIds = baseInfos.map(it => it.itemId)
            let detailInfos: CardDetailInfo[] = []
            const batchSize = 50
            for (let i = 0; i < itemIds.length; i += batchSize) {
                const detailParts = await garlandService.getCardDetails(itemIds.slice(i, i + batchSize))
                detailInfos = detailInfos.concat(detailParts)
            }
            console.log(detailInfos)
            const cardInfos = []
            for (let i = 0; i < baseInfos.length; i++) {
                cardInfos.push({
                    base: baseInfos[i],
                    detail: detailInfos[i],
                })
            }
            setCards(cardInfos)
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
                {/*<div>{JSON.stringify(cards)}</div>*/}
                <List className={classes.root}>
                    {cards.map((card) => {
                        return (
                            <ListItem key={card.base.cardId}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={card.detail.obj.item.name} secondary={card.base.orderNumber}/>
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </>
  );
};

export const ListPage = React.memo(Page);
