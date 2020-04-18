export class CoronaModel {
  constructor(
    public name: string,
    public infected: number,
    public death: number,
    public recovered: number,
    public newInfected: number,
    public newDeath: number,
    public newRecovered: number,
    public date: string
  ) { }
}

export class CoronaData {
  constructor(public total: CoronaModel, public countries: CoronaModel[]) {
  }
}
