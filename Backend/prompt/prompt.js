const PROMPTS = {
  clientList: [
    "client list","give me client list","show clients","list of clients","get client list"
  ],
  currentAum: [
    "current aum","total aum","get current aum","my aum","show current aum",
    "give my current aum","show my aum","mera aum","show aum"
  ],
  latestTransaction: [
    "latest transaction","latest transactions","last transaction","show latest transactions",
    "show latest transaction","recent transactions","recent transaction","my last transactions",
    "my last transaction","last 10 transactions","last 10 transaction","recent 10 transactions",
    "recent 10 transaction"
  ],
  sip: [
    "start sip","my sip","sip details","sip plan","show sip","sip investment"
  ],
  nav: [
    "fund nav","today nav","show nav","current nav","scheme nav"
  ]
};

export const getPromptType = (text) => {
  const lowerText = text.toLowerCase();
  if (PROMPTS.clientList.some(kw => lowerText.includes(kw))) return "clientList";
  if (PROMPTS.currentAum.some(kw => lowerText.includes(kw))) return "currentAum";
  if (PROMPTS.latestTransaction.some(kw => lowerText.includes(kw))) return "latestTransaction";
  if (PROMPTS.sip.some(kw => lowerText.includes(kw))) return "sip";
  if (PROMPTS.nav.some(kw => lowerText.includes(kw))) return "nav";
  return "default";
};
