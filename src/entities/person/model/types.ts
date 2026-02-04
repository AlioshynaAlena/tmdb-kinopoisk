export type CastItem = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

export type Props = {
  cast: CastItem[];
  loading?: boolean;
};