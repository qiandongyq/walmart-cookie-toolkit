export const dateShortForm = (date) =>
  date.toJSON().slice(0, 10).replace(/-/g, '-');

export const formatSlotTime = (slot) => {
  return `from ${slot.startTime} to ${slot.endTime} on ${dateShortForm(
    new Date(slot.startDateTime)
  )}`;
};
