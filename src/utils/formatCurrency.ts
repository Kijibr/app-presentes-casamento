export const formatCurrencyValue = (value: number) => value.toLocaleString(
  'pt-BR',
  { style: 'currency', currency: 'BRL' }
); 