// Evaluates the customer's pricing formula, e.g. "seats * 12"
export function evaluate(formula: string, seats: number) {
  return eval(formula.replace('seats', String(seats)));
}
