const estimated = (Ra: number, Rb: number) => {
  return 1 / (1 + 10 ** ((Rb - Ra) / 400));
};
