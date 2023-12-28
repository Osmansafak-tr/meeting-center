const participants = [
  {
    agoraId: 123,
    name: "Osman",
  },
  {
    agoraId: 12,
    name: "Osman",
  },
  {
    agoraId: 1,
    name: "Osman",
  },
];

const findByAgoraId = (agoraId) => {
  let index = -1;
  for (i in participants) {
    const participant = participants[i];
    if (participant.agoraId === agoraId) {
      index = i;
      break;
    }
  }
  return index;
};

const result = findByAgoraId(12);
console.log(result);

for (i in participants) {
  const participant = participants[i];
  if (participant.agoraId === 12) {
    participants.splice(i, 1);
    break;
  }
}
console.log(participants);
