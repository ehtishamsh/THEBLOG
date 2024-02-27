import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { UTApi } from "uploadthing/server";

export const Uploadbutton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();

export const utapi = new UTApi();
