
import fs from "fs";
import path from "path";
import { Command } from "commander";
import { extractAlbum } from "../services";
import { WrongFileExtException } from "../exceptions";

export const AlbumExtractor = new Command();

AlbumExtractor.name("extract")
  .description("Extract google photos data")
  .argument("<url>", "album shared url")
  .argument("<filename>", "output json filename")
  .action(async (url: string, filename: string) => {
    const dir = path.dirname(filename);
    const extname = path.extname(filename);

    if (extname !== ".json") {
      throw new WrongFileExtException("file extension should be .json")
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const album = await extractAlbum(url);

    const jsonString = JSON.stringify(album);
    fs.writeFileSync(filename, jsonString);
    console.log(`album exported in ${filename}`);
  });