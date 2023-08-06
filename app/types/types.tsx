export type DevicesType = {
  type: string;
};

export type DeviceType = {
  id: number;
  name: string;
  brand_id: number;
  type: string;
  stars: number;
};

export type ImageType = {
  id: number;
  image_url: string;
  device_color_id: number;
  presentation: boolean;
};

export type PropType = {
  id: number;
  memory_id: number;
  device_color_id: number;
  size: string;
  processor_id: number;
  quantity: number;
  price: number;
  details: string;
};

export type DeviceColorType = {
  id: number;
  device_id: number;
  color_id: number;
};

export type ColorType = {
  id: number;
  color_name: string;
};

export type BrandType = {
  id: number;
  brand_name: string;
};

export type MemoryType = {
  id: number;
  memory_size: number;
};

export type ProcessorType = {
  id: number;
  processor: string;
};
