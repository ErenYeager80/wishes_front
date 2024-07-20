import type File from "@/models/file";

export default interface Wish {
  id?: number;
  title: string;
  content: string;
  imageId?: number;
  file?: File;
  done_at?: Date
}
