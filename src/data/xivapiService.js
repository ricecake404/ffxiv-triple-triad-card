import XIVAPI from '@xivapi/js';

const xiv = new XIVAPI()

export const xivService = {
  search() {
    xiv.search("Shroud Cherry Sapling").then((response) => {
      // do something with the response
      console.log(response)
    }).catch((error) => {
      // do something with the error
    })
  }
}

