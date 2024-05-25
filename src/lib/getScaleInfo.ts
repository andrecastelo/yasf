import Scale from '@tonaljs/scale';

export const getScaleInfo = (scale: string) => {
  if (!scale) return [];

  const scaleInfo = Scale.get(scale);

  if (!scaleInfo) return [];

  return Scale.scaleNotes(scaleInfo.notes);
};
