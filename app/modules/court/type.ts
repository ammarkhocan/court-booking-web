export type Court = {
  id: string;
  name: string;
  slug: string;
  description: string;
  sportType: string;
  location: string;
  pricePerHour: number;
  imageUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Courts = Court[];
