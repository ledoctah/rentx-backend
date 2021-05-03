export default interface IFindCarFiltersDTO {
  name?: string;
  min_price?: number;
  max_price?: number;
  company_id?: string;
  fuel_id?: string;
  transmission_id?: string;
  page: number;
  cars_per_page: number;
}
