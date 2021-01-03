export interface IPromotionList {
  promotions: IPromotion[];
  page: number;
}

export interface IPromotion {
  date_from: number;
  date_to: number;
  promotion_description: string;
  promotion_id: string;
  users: number;
  venue_id: string;
}
