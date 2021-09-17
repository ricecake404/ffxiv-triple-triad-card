const BASE_URL = "https://ffxiv.cyanclay.xyz/api/get.php?lang=chs";

const garlandService = {
  async getCardDetails(itemIds: number[]) {
    const resp = await fetch(
      `${BASE_URL}&version=3&type=item&id=${itemIds.join(",")}`
    );
    return resp.ok
      ? await resp.json()
      : Promise.reject(new Error("get card data failed"));
  },
};

export default garlandService;
