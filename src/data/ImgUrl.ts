const toRealIconId = (iconId: number, hr = true) => {
  const iconIdStr = iconId.toString();
  return iconIdStr.padStart(6, "0") + (hr ? "_hr1" : "");
};

export const urlOfIcon = (iconId: number, hr = true) => {
  return `https://cdn.jsdelivr.net/gh/ricecake404/images@triple-triad-card/icon/${toRealIconId(
    iconId,
    hr
  )}.png`;
};
