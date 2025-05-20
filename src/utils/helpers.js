export function formatGhanaCedis(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}
