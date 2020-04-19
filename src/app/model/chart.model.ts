export class ChartModel {
  constructor(public name: string, public value: number) { }
}

export let chartDataHolder = new Array<ChartModel>();

export const CORONAVIRUS_CASES = 'Coronavirus Cases';
