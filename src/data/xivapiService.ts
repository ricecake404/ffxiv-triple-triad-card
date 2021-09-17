const BASE_URL = "https://cafemaker.wakingsands.com";
// const PRIVATE_KEY = process.env.REACT_APP_CAFEMAKER_PRIVATE_KEY
// https://github.com/xivapi/xivapi-js/wiki
type XIVResponse<R> = {
  Pagination: {
    Page?: number;
    PageNext?: number;
    PagePrev?: number;
    PageTotal?: number;
    Results?: number;
    ResultsPerPage?: number;
    ResultsTotal?: number;
  };
  Results: R[];
};

type CardItemResult = {
  ID: number; // item id
  AdditionalDataTargetID: number; // card id
};
type TripleTriadCardResidentResult = {
  ID: number; // item id
  Order: number; // card id
  UIPriority: number; // card type
};

const getData = async (url: string, page: number = 0) => {
  const originalUrl = `${BASE_URL}/${url}`;
  const separator = originalUrl.includes("?") ? "&" : "?";
  const pagePart = page ? `&page=${page}` : "";
  let resp = await fetch(`${originalUrl}${separator}limit=3000${pagePart}`);
  return resp.ok ? resp.json() : Promise.reject(new Error());
};

const getDataList = async (url: string) => {
  let data: any[] = [];
  let page = 1;
  let resp: XIVResponse<any>;
  let total = 0;
  do {
    resp = await getData(url, page);
    data = data.concat(resp.Results);
    page = resp.Pagination.PageNext ?? 0;
    total = resp.Pagination.ResultsTotal ?? 0;
  } while (page);
  if (data.length !== total) {
    console.error("expected: " + total + " actual: " + data.length);
  }
  return data;
};

export type CardBaseInfo = {
  cardId: number;
  itemId: number;
  orderNumber: number;
  orderType: "normal" | "extra";
};

export const getCardBaseInfos = async (): Promise<CardBaseInfo[]> => {
  const cardItems: CardItemResult[] = await getDataList(
    "search?filters=ItemUICategoryTargetID=86&columns=ID,AdditionalDataTargetID"
  );
  const cardList: XIVResponse<any> = await getData("TripleTriadCardResident");
  const totalCardNumber = cardList.Pagination.ResultsTotal ?? 0;
  const cardIds = [];
  for (let i = 0; i < totalCardNumber; i++) {
    cardIds.push(i + 1);
  }
  const tripleTriadCardResidents: TripleTriadCardResidentResult[] =
    await getDataList(
      `TripleTriadCardResident?ids=${cardIds.join(
        ","
      )}&columns=ID,Order,UIPriority`
    );

  return cardItems.map((cardItem) => {
    const cardResident = tripleTriadCardResidents.find(
      (resident) => resident.ID === cardItem.AdditionalDataTargetID
    );

    return {
      cardId: cardItem.AdditionalDataTargetID,
      itemId: cardItem.ID,
      orderNumber: cardResident?.Order ?? -1,
      orderType: cardResident?.UIPriority === 0 ? "normal" : "extra",
    };
  });
};
