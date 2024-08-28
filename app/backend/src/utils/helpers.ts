const helpers = {
  stripeZeroOut: (string: string): string => {
    return string.replace(/^0+/, "");
  },
}
export default helpers;