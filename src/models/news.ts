import type File from "@/models/file";

export default interface News {
    id?: number;
    title: string;
    content: string;
    file?: File;
    imageId?: number;
}
