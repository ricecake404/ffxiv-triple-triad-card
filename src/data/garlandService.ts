export {getCard}

const BASE_URL = 'https://ffxiv.cyanclay.xyz/db/doc'

const getCard = async (itemId: number) => {
    const resp = await fetch(`${BASE_URL}/item/chs/3/${itemId}.json`, {
        method: 'GET',
    })
    return resp.ok ? resp.json() : Promise.reject(new Error('get card data failed'))
}