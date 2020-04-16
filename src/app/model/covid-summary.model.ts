export class CovidSummaryModel {
  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    public Global: Global,
    public Date: string,
    public Countries: Country[]
  ) {}
}

export class Global {
  constructor(
    public NewConfirmed: number,
    public TotalConfirmed: number,
    public NewDeaths: number,
    public TotalDeaths: number,
    public NewRecovered: number,
    public TotalRecovered: number,
    public Date: string
  ) {}
}

export class Country {
  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    public Country: string,
    public CountryCode: string,
    public Slug: string,
    public NewConfirmed: number,
    public TotalConfirmed: number,
    public NewDeaths: number,
    public TotalDeaths: number,
    public NewRecovered: number,
    public TotalRecovered: number,
    public Date: string
  ) {}
}
