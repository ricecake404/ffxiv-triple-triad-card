const BASE_URL = "https://ffxiv.cyanclay.xyz/api/get.php?lang=chs";

type DataType = "item" | "quest";

interface Api {
  type: DataType;
  version: number;
}

const ItemApi: Api = {
  type: "item",
  version: 3,
};

export interface GarlandItemCard {
  item: CardItem;
  partials: Partial[];
}

export interface CardItem {
  category: number; // 86
  description: string; // "九宫幻卡对局时所用的卡片。<br>稀有度：★"
  icon: number; // 27662
  id: number; // 9772
  ilvl: number; // 1
  name: string; // "九宫幻卡：渡渡鸟"
  patch: number; // 2.51
  patchCategory: number; // 14
  price: number; // 19
  quests: number[]; // [65973]
  rarity: number; // 1
  stackSize: number; // 999
  tripletriad: TripleTriad;
  unlistable: number; // 1
}

interface TripleTriad {
  plate: number; // 82101
  rarity: number; // 1
  bottom: number; // 3
  left: number; // 4
  right: number; // 2
  top: number; // 4
  chs: {
    description: string; // "原产自马兹拉雅岛的大型鸟类，因为过于肥胖而失去了飞行的能力。当初一部分卢恩人将渡渡鸟的蛋带到了大陆上，后来一部分没有被吃掉的蛋孵化成功，从此不会飞的渡渡鸟成功跨越了大洋走进大陆。渡渡鸟的胸肉特别美味，现在在艾欧泽亚的各大城邦都有饲养。不过家养并不意味着没有危险，渡渡鸟口中的催眠分泌物特别强劲，在遭到攻击时会吐向对方以求自保。"
  };
}

interface Partial extends GarlandResp {
  id: string;
  type: DataType;
  obj: {
    f: number; // 1
    g: number; // 0
    i: string; // "金碟游乐场"
    n: string; // "决斗！九宫幻卡"
    s: number; // 0
  };
}

interface GarlandResp {
  id: string;
  obj: any;
}

export const getCardDetails = async (
  itemIds: number[]
): Promise<GarlandItemCard[]> => {
  return getBatchData(ItemApi, itemIds);
};

export const getBatchData = async (
  api: Api,
  ids: number[] | number
): Promise<GarlandItemCard[]> => {
  if (typeof ids === "number") {
    return (await getData(api, [ids]))[0];
  } else {
    let list: GarlandResp[] = [];
    const batchSize = 50;
    for (let i = 0; i < ids.length; i += batchSize) {
      list = list.concat(await getData(api, ids.slice(i, i + 50)));
    }
    return list.map((it) => {
      return it.obj;
    });
  }
};

export const getData = async (api: Api, ids: number[]): Promise<any[]> => {
  const resp = await fetch(
    `${BASE_URL}&version=${api.version}&type=${api.type}&id=${ids.join(",")}`
  );
  return resp.ok
    ? await resp.json()
    : Promise.reject(new Error("get card data failed"));
};
