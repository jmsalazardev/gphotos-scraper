# gphotos-scraper

A tool to extract photos metadata from an google photos shared album.


- public url
- filename
- description
- file size
- image size
- creation date

## Cli
Install:

`npm install -G gphotos-scraper`

Usage:

`gphotos-scraper extract https://photos.app.goo.gl/hTBHnwByt4MDwxo66 ./data/file.json`

## Module
Install:

`npm install gphotos-scraper`

Usage:

```
import {extractAlbum} from "gphotos-scraper";

const test = async () => {
    const album = await extractAlbum('https://photos.app.goo.gl/hTBHnwByt4MDwxo66');
    console.log(album);
};

test();
```

Result:
```
{
  id: 'hTBHnwByt4MDwxo66',
  title: 'Animals',
  url: 'https://photos.app.goo.gl/hTBHnwByt4MDwxo66',
  photos: [
    {
      id: 'AF1QipOCXLC8ydrmDxjVJYnR9S77qmaRrL-TzqeUY2Mh',
      description: '',
      filename: 'caballo.jpeg',
      createdAt: 1654258374000,
      size: 93425,
      width: 800,
      height: 500,
      mimeType: 'image/jpeg',
      url: 'https://lh3.googleusercontent.com/F0r6Xvw9oHC0NkIFbHBIFrsNFAFRTgeu2DW_r_uTySEVTBdXj53xQ48oQ1HI9_FxR7tESFdBjlrSQEU6NfwwUMOFZsH0MdAmni7swa_JAmmRXjdIlbzljVYW8pK37x9TalcuOXfzPNE'
    },
    {
      id: 'AF1QipPaDHzTHlNXcm34r_Rb93CTDc6iAz_uj1n_me6Y',
      description: '',
      filename: 'tortuga.webp',
      createdAt: 1654258371000,
      size: 107128,
      width: 768,
      height: 512,
      mimeType: 'image/webp',
      url: 'https://lh3.googleusercontent.com/gTwJC2BNN5T2r9wAUsi0uFj0K4NGlyaDyZjGcYTHW3tcva2a6LHbPcbx_ZESLBJQ7YVFmQXT_JnImXoIQcox9MzAJJi_DvkmLhG52S6VAYxYxo_bgCmxlAPtDIz-62MTmmyhObO3CDM'
    },
    {
      id: 'AF1QipM6EvIcb6RTYsAeYaEIsVWlRsT7DenEwleGBUdE',
      description: '',
      filename: 'panda-rojo.jpg',
      createdAt: 1654258367000,
      size: 54726,
      width: 700,
      height: 466,
      mimeType: 'image/jpeg',
      url: 'https://lh3.googleusercontent.com/wXqw3Uf1pfx2gNW-4kcngd-2dazzqJmL8gnYAfMls9b6GzbYpeHVSVURmuHMMlLfXsejgLR7i9OopSishiIpEkkhorqWue3lac9sIc-Gylenqs6PlQWSz8JDYNDgnPihpujWr0FVw6E'
    },
    {
      id: 'AF1QipPf3alIH6bi2HncS-B2e-LDVJXe7MFpTi9srQ_c',
      description: 'suricatas bebes junto a su madre',
      filename: 'familia-suricatas.jpg',
      createdAt: 1583407169000,
      size: 104451,
      width: 750,
      height: 450,
      mimeType: 'image/jpeg',
      url: 'https://lh3.googleusercontent.com/zwz5nT3LKu9y5iScRIw2S1AF-xGDz3Eq_d-w8XY2FfkEEZN66N1gqn0L8wLucbF2eFFeNmKLT4rEwYtlUOa_TmmRErvRbeJWv28yQAYZsgKmtaaA2iahDj9-WKOlPifjsvWAR_vrEKI'
    }
  ]
}
```


