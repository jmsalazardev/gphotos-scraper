import axios from "axios";
import {lookup} from "mime-types";
import { GooglePhoto } from "../interfaces";
const RPCID = "fDcn4b";

export const getPhotos = async (
  key: string,
  photoIds: string[],
): Promise<GooglePhoto[]> => {
    
  const queryData = photoIds.map(
    (photoId) => [RPCID, JSON.stringify([photoId, null, key])]
  );

  const bodyData = `f.req=${JSON.stringify([queryData])}`;
  const res = await axios.post(
    "https://photos.google.com/_/PhotosUi/data/batchexecute",
    bodyData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );

  const data = res.data.replace(")]}'", "");
  const list = JSON.parse(data);
  return list.filter((item: string[]) => item[1] === RPCID)
    .map((item: string[]) => {
      const [, , responseText] = item;
      const jsonObj = JSON.parse(responseText);
      const [id, description, filename, createdAt, , size, width, height] = jsonObj[0];
      const mimeType = `${lookup(filename)}`;
      return {
        id,
        description,
        filename,
        createdAt,
        size,
        width,
        height,
        mimeType,
      };
    });
  };
